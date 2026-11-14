"""
SoilVision-X: Flask Backend Server
Developed by: N. Nikitha Reddy, CSE (AI & ML), SR University

Provides REST API endpoints for image upload, Swin Transformer model inference,
prediction history tracking, and agronomic diagnostic information.
"""

import os
import time
import json
from datetime import datetime
from flask import Flask, request, jsonify, render_template, send_from_directory
from werkzeug.utils import secure_filename

from model import load_model, SOIL_CLASSES, CHECKPOINT_PATH
from predict import predict_soil, allowed_file

app = Flask(__name__)

# Configure upload directory
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'static', 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB max limit

# Global device and model initialization
DEVICE = 'cuda' if False else 'cpu'  # PyTorch will auto-detect when run locally
MODEL, CHECKPOINT_LOADED, MODEL_STATUS_MSG = load_model(checkpoint_path=CHECKPOINT_PATH, device=DEVICE)

# Session Prediction History
PREDICTION_HISTORY = []

# Agronomic information for the 7 soil types
SOIL_METADATA = {
    'Alluvial Soil': {
        'order': 'Entisols / Inceptisols',
        'texture': 'Sandy loam to silty clay loam',
        'ph_range': '6.5 - 8.2',
        'materials_present': ['Quartz Silt & Fine Sand (55-70%)', 'Potash & Feldspar', 'Calcium Carbonate (Lime)', 'Illite Clay & Phosphoric Acid', 'Riverine Humus (0.5-0.9%)'],
        'best_plants': [
            {'name': 'Rice (Paddy)', 'reason': 'Thrives in silty clay retention and high potash/lime'},
            {'name': 'Wheat', 'reason': 'Deep friable alluvial loam supports dense root systems'},
            {'name': 'Sugarcane', 'reason': 'Rich potassium and phosphoric acid reserves boost sucrose yield'}
        ],
        'crops': ['Rice', 'Wheat', 'Sugarcane', 'Cotton', 'Jute', 'Oilseeds', 'Pulses'],
        'regions': 'Indo-Gangetic plains, Punjab, Haryana, UP, Bihar, WB, coastal deltas',
        'characteristics': 'Formed by river silt deposition, rich in potash and lime, highly productive.'
    },
    'Arid Soil': {
        'order': 'Aridisols',
        'texture': 'Coarse sand to sandy loam',
        'ph_range': '7.8 - 9.2',
        'materials_present': ['Coarse Silica Sand (78-90%)', 'Calcium Carbonate (Kankar Nodules)', 'Soluble Salts & Gypsum', 'Available Phosphate & Potash', 'Very Low Humus (<0.25%)'],
        'best_plants': [
            {'name': 'Pearl Millet (Bajra)', 'reason': 'Heat-tolerant deep scavenging roots thrive in coarse dry sands'},
            {'name': 'Date Palm', 'reason': 'Tolerates alkaline pH and moderate salinity'},
            {'name': 'Cluster Bean (Guar)', 'reason': 'Fixes nitrogen in N-deficient sandy soil'}
        ],
        'crops': ['Pearl Millet (Bajra)', 'Sorghum', 'Guar', 'Barley', 'Mustard', 'Date Palm'],
        'regions': 'Western Rajasthan, Rann of Kutch (Gujarat), southern Punjab/Haryana',
        'characteristics': 'Low organic matter, high salinity risk, poor water retention, requires drip irrigation.'
    },
    'Black Soil': {
        'order': 'Vertisols',
        'texture': 'Heavy montmorillonite clay (40-60%)',
        'ph_range': '7.4 - 8.6',
        'materials_present': ['Montmorillonite / Smectite Clay (40-60%)', 'Titaniferous Magnetite & Iron', 'Calcium & Magnesium Carbonates', 'Abundant Potash & Lime', 'Basalt-Derived Humus (0.4-0.7%)'],
        'best_plants': [
            {'name': 'Cotton', 'reason': 'Deep clay moisture retention sustains long boll formation'},
            {'name': 'Soybean', 'reason': 'High Ca, Mg, and K levels support vigorous nodulation'},
            {'name': 'Pigeon Pea (Tur)', 'reason': 'Deep taproot penetrates cracking clay and fixes nitrogen'}
        ],
        'crops': ['Cotton (Regur soil)', 'Soybean', 'Pigeon Pea', 'Wheat', 'Sorghum', 'Citrus'],
        'regions': 'Deccan Lava Plateau, Maharashtra, MP, Gujarat, Telangana, Karnataka',
        'characteristics': 'High swelling/shrinkage, deep self-ploughing fissures, supreme moisture retention.'
    },
    'Laterite Soil': {
        'order': 'Oxisols / Ultisols',
        'texture': 'Porous vesicular gravelly clay',
        'ph_range': '4.5 - 5.8 (Acidic)',
        'materials_present': ['Iron Sesquioxide (Fe2O3, 25-45%)', 'Aluminum Oxide (Gibbsite, 20-35%)', 'Kaolinite Clay & Quartz Gravel', 'Manganese & Titanium Traces', 'Low Tropical Humus (0.3-0.4%)'],
        'best_plants': [
            {'name': 'Cashew Nut', 'reason': 'Acid-tolerant hardy tree suited to porous gravelly laterite slopes'},
            {'name': 'Tea', 'reason': 'Prefers strongly acidic soil (pH 4.5-5.5) with rapid monsoon drainage'},
            {'name': 'Coffee & Rubber', 'reason': 'Deep root anchorage in well-drained iron-rich hills'}
        ],
        'crops': ['Cashew Nut', 'Tea', 'Coffee', 'Rubber', 'Coconut', 'Areca Nut', 'Tapioca'],
        'regions': 'Western Ghats, Kerala, Karnataka, Goa, Odisha, hills of Assam & Meghalaya',
        'characteristics': 'Formed by intense tropical leaching (desilication), rich in iron & aluminum, requires liming.'
    },
    'Mountain Soil': {
        'order': 'Inceptisols / Spodosols',
        'texture': 'Coarse loamy to peaty humus',
        'ph_range': '5.2 - 6.6',
        'materials_present': ['Forest Humus & Leaf-Litter (1.8-3.5%)', 'Skeletal Rock & Mica/Quartz Fragments', 'Organic Nitrogen Complexes', 'Fulvic & Humic Acids', 'Silty Loam & Weathering Feldspar'],
        'best_plants': [
            {'name': 'Apple', 'reason': 'Excels in cool, humus-rich, well-drained acidic mountain slopes'},
            {'name': 'Saffron & Cardamom', 'reason': 'Requires friable organic forest loam with zero waterlogging'},
            {'name': 'Walnut & Almond', 'reason': 'Deep skeletal mineral fragments give strong root aeration'}
        ],
        'crops': ['Apples', 'Walnuts', 'Almonds', 'Peaches', 'Temperate Spices', 'Potato', 'Tea'],
        'regions': 'Himalayan belts across J&K, Himachal Pradesh, Uttarakhand, Sikkim',
        'characteristics': 'High organic humus content, thin topsoil, prone to soil erosion on steep slopes.'
    },
    'Red Soil': {
        'order': 'Alfisols',
        'texture': 'Porous sandy loam to clay loam',
        'ph_range': '6.0 - 7.1',
        'materials_present': ['Unhydrated Ferric Oxide (Fe2O3, 8-16%)', 'Crystalline Quartz & Granite Sand', 'Kaolinite & Illite Clay', 'Potash & Trace Manganese', 'Low Humus Fraction (0.3-0.5%)'],
        'best_plants': [
            {'name': 'Groundnut (Peanut)', 'reason': 'Friable non-crusting sandy red loam allows easy underground pod pegging'},
            {'name': 'Finger Millet (Ragi)', 'reason': 'Adapted to low-nitrogen porous granitic red soils'},
            {'name': 'Red Gram & Black Gram', 'reason': 'Symbiotic nitrogen fixation thrives in well-aerated loam'}
        ],
        'crops': ['Groundnut', 'Finger Millet (Ragi)', 'Pulses', 'Tobacco', 'Castor', 'Potatoes'],
        'regions': 'Tamil Nadu, Karnataka, Telangana, Andhra Pradesh, Odisha, Jharkhand',
        'characteristics': 'Derived from ancient granites and gneisses, red due to ferric oxides diffusion.'
    },
    'Yellow Soil': {
        'order': 'Ultisols / Inceptisols',
        'texture': 'Fine silty clay to loamy',
        'ph_range': '5.5 - 6.8',
        'materials_present': ['Hydrated Iron Oxides (Goethite & Limonite)', 'Fine Silt & Weathering Mica', 'Kaolinitic Silty Clay', 'Exchangeable Potassium & Sulfur', 'Sub-Humid Organic Matter (0.4-0.6%)'],
        'best_plants': [
            {'name': 'Lowland Rice (Paddy)', 'reason': 'Fine silty clay retains sub-humid valley moisture ideal for paddy'},
            {'name': 'Maize', 'reason': 'Moderately acidic silty loam supports rapid root expansion'},
            {'name': 'Mustard & Sesamum', 'reason': 'Sulfur availability and moderate moisture boost oilseed yield'}
        ],
        'crops': ['Lowland Rice (Paddy)', 'Maize', 'Soybean', 'Mustard', 'Sesamum', 'Lentils'],
        'regions': 'Parts of Odisha, Chhattisgarh, Middle Ganga Valley, Eastern Ghats foothills',
        'characteristics': 'Hydrated ferric oxide form of red soil with prolonged moisture retention.'
    }
}


@app.route('/')
def index():
    """Serves the main application landing and classification page."""
    return render_template('index.html', model_ready=CHECKPOINT_LOADED, classes=SOIL_CLASSES)


@app.route('/predict', methods=['POST'])
@app.route('/api/predict', methods=['POST'])
def predict():
    """
    Main prediction endpoint.
    Accepts: file upload (multipart/form-data under 'file' or 'image').
    Returns: JSON containing predicted class, confidence, probabilities, and soil metadata.
    """
    # Check if a file was uploaded
    if 'file' not in request.files and 'image' not in request.files:
        return jsonify({
            'success': False,
            'error': 'No file part in the request. Please provide an image file.'
        }), 400

    file = request.files.get('file') or request.files.get('image')

    if file.filename == '':
        return jsonify({
            'success': False,
            'error': 'No selected image file.'
        }), 400

    if not allowed_file(file.filename):
        return jsonify({
            'success': False,
            'error': f"Invalid file format. Supported formats: JPG, JPEG, PNG, WEBP."
        }), 400

    try:
        # Securely save the uploaded file
        orig_filename = secure_filename(file.filename)
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        save_name = f"{timestamp}_{orig_filename}"
        save_path = os.path.join(app.config['UPLOAD_FOLDER'], save_name)
        file.save(save_path)

        # Run model inference
        start_time = time.time()
        result = predict_soil(save_path, model=MODEL, device=DEVICE)
        elapsed_ms = round((time.time() - start_time) * 1000, 2)

        predicted_class = result['predicted_class']
        soil_info = SOIL_METADATA.get(predicted_class, {})

        # Prepare record
        record = {
            'id': f"pred_{timestamp}_{len(PREDICTION_HISTORY) + 1}",
            'filename': orig_filename,
            'saved_image_url': f"/static/uploads/{save_name}",
            'predicted_class': predicted_class,
            'confidence': result['confidence'],
            'all_probabilities': result['all_probabilities'],
            'soil_metadata': soil_info,
            'checkpoint_loaded': result['checkpoint_loaded'],
            'model_architecture': 'Swin Transformer (swin_tiny_patch4_window7_224)',
            'inference_time_ms': elapsed_ms,
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'message': result['message']
        }

        # Keep latest 100 history items
        PREDICTION_HISTORY.insert(0, record)
        if len(PREDICTION_HISTORY) > 100:
            PREDICTION_HISTORY.pop()

        return jsonify({
            'success': True,
            'data': record
        }), 200

    except Exception as e:
        return jsonify({
            'success': False,
            'error': f"Inference execution failure: {str(e)}"
        }), 500


@app.route('/api/history', methods=['GET'])
def get_history():
    """Returns stored prediction history."""
    return jsonify({
        'success': True,
        'count': len(PREDICTION_HISTORY),
        'history': PREDICTION_HISTORY
    })


@app.route('/api/model-info', methods=['GET'])
def get_model_info():
    """Returns Swin Transformer architecture specifications."""
    return jsonify({
        'model_name': 'Swin Transformer',
        'backbone': 'swin_tiny_patch4_window7_224.ms_in1k',
        'checkpoint_path': CHECKPOINT_PATH,
        'checkpoint_loaded': CHECKPOINT_LOADED,
        'device': DEVICE,
        'num_classes': len(SOIL_CLASSES),
        'classes': SOIL_CLASSES,
        'input_resolution': '224x224x3',
        'window_size': 7,
        'patch_size': 4,
        'project_lead': 'N. Nikitha Reddy',
        'institution': 'SR University'
    })


@app.route('/api/contact', methods=['POST'])
def contact():
    """Receives contact form submission."""
    data = request.get_json() or {}
    name = data.get('name', 'Anonymous')
    email = data.get('email', '')
    message = data.get('message', '')

    return jsonify({
        'success': True,
        'message': f"Thank you {name}. Your inquiry has been forwarded to N. Nikitha Reddy (SR University)."
    })


if __name__ == '__main__':
    print("=" * 65)
    print("  SoilVision-X: Hierarchical Vision Transformer Soil Classifier")
    print("  Author: N. Nikitha Reddy, CSE (AI & ML), SR University")
    print(f"  Checkpoint status: {'LOADED' if CHECKPOINT_LOADED else 'AWAITING CHECKPOINT'}")
    print("  Listening on http://127.0.0.1:5000")
    print("=" * 65)
    app.run(host='0.0.0.0', port=5000, debug=True)
