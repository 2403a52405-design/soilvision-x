"""
SoilVision-X: Inference and Prediction Pipeline
Developed by: N. Nikitha Reddy, CSE (AI & ML), SR University

Contains data transformations, image validation, Swin Transformer forward inference,
and confidence score generation across the 7 soil classes.
"""

import os
import torch
import torch.nn.functional as F
from PIL import Image
try:
    import torchvision.transforms as transforms
except ImportError:
    transforms = None

from model import load_model, SOIL_CLASSES, CHECKPOINT_PATH

# Standard ImageNet / Swin-T transformation pipeline
if transforms is not None:
    inference_transform = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225]
        )
    ])
else:
    inference_transform = None

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def preprocess_image(image_input):
    """
    Takes an image file path, file-like object, or PIL Image,
    validates it, converts to RGB, and returns a preprocessed PyTorch tensor (1, 3, 224, 224).
    """
    if isinstance(image_input, str):
        image = Image.open(image_input)
    elif hasattr(image_input, 'read'):
        image = Image.open(image_input)
    else:
        image = image_input

    # Ensure 3-channel RGB
    if image.mode != 'RGB':
        image = image.convert('RGB')

    if inference_transform is not None:
        tensor = inference_transform(image).unsqueeze(0)
    else:
        # Minimal tensor conversion if torchvision is not present
        import numpy as np
        image_resized = image.resize((224, 224))
        arr = np.array(image_resized, dtype=np.float32) / 255.0
        # Normalize
        mean = np.array([0.485, 0.456, 0.406], dtype=np.float32)
        std = np.array([0.229, 0.224, 0.225], dtype=np.float32)
        arr = (arr - mean) / std
        tensor = torch.from_numpy(arr.transpose(2, 0, 1)).unsqueeze(0)

    return tensor, image


def predict_soil(image_input, model=None, device='cpu'):
    """
    Runs Swin Transformer inference on the input image.
    Returns:
        dict: {
            'predicted_class': str,
            'confidence': float,
            'probabilities': list of dicts,
            'status': str,
            'checkpoint_loaded': bool
        }
    """
    if model is None:
        model, checkpoint_loaded, msg = load_model(device=device)
    else:
        checkpoint_loaded = os.path.exists(CHECKPOINT_PATH)
        msg = "Active model instance used."

    tensor, pil_img = preprocess_image(image_input)
    tensor = tensor.to(device)

    with torch.no_grad():
        outputs = model(tensor)
        probabilities = F.softmax(outputs, dim=1)[0].cpu().numpy()

    # Build sorted probability list
    results = []
    for idx, prob in enumerate(probabilities):
        results.append({
            'class_name': SOIL_CLASSES[idx],
            'probability': round(float(prob) * 100, 2)
        })

    # Sort descending
    results.sort(key=lambda x: x['probability'], reverse=True)

    top_class = results[0]['class_name']
    top_confidence = results[0]['probability']

    return {
        'predicted_class': top_class,
        'confidence': top_confidence,
        'all_probabilities': results,
        'checkpoint_loaded': checkpoint_loaded,
        'status': 'Success' if checkpoint_loaded else 'Architecture Ready (Needs Checkpoint)',
        'message': msg
    }


if __name__ == '__main__':
    import sys
    if len(sys.argv) > 1:
        test_path = sys.argv[1]
        print(f"Testing Swin Transformer on image: {test_path}")
        res = predict_soil(test_path)
        print(f"Result: {res['predicted_class']} ({res['confidence']}%)")
        for p in res['all_probabilities']:
            print(f"  - {p['class_name']}: {p['probability']}%")
    else:
        print("Usage: python predict.py <path_to_soil_image>")
