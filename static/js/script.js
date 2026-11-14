// SoilVision-X: Client-side upload & prediction handler for Flask server
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const browseBtn = document.getElementById('browseBtn');
    const dropzone = document.getElementById('dropzone');
    const dropText = document.getElementById('dropText');
    const imagePreview = document.getElementById('imagePreview');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resetBtn = document.getElementById('resetBtn');
    const uploadForm = document.getElementById('uploadForm');
    const loader = document.getElementById('loader');
    const resultCard = document.getElementById('resultCard');

    const predictedSoilName = document.getElementById('predictedSoilName');
    const confidenceBadge = document.getElementById('confidenceBadge');
    const probBars = document.getElementById('probBars');
    const soilCharacteristics = document.getElementById('soilCharacteristics');
    const soilOrder = document.getElementById('soilOrder');
    const soilPh = document.getElementById('soilPh');
    const soilMaterials = document.getElementById('soilMaterials');
    const soilBestPlants = document.getElementById('soilBestPlants');
    const soilCrops = document.getElementById('soilCrops');

    let currentFile = null;

    browseBtn.addEventListener('click', () => fileInput.click());
    dropzone.addEventListener('click', () => {
        if (!currentFile) fileInput.click();
    });

    // Drag & Drop
    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropzone.classList.add('dragover');
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropzone.classList.remove('dragover');
        });
    });

    dropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        if (dt.files && dt.files.length > 0) {
            handleSelectedFile(dt.files[0]);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleSelectedFile(e.target.files[0]);
        }
    });

    function handleSelectedFile(file) {
        if (!file.type.match('image.*')) {
            alert('Please select an image file (JPG, PNG).');
            return;
        }
        currentFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            dropText.style.display = 'none';
            analyzeBtn.disabled = false;
            resetBtn.style.display = 'inline-block';
        };
        reader.readAsDataURL(file);
    }

    resetBtn.addEventListener('click', () => {
        currentFile = null;
        fileInput.value = '';
        imagePreview.style.display = 'none';
        dropText.style.display = 'block';
        analyzeBtn.disabled = true;
        resetBtn.style.display = 'none';
        resultCard.style.display = 'none';
    });

    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!currentFile) return;

        loader.style.display = 'block';
        analyzeBtn.disabled = true;
        resultCard.style.display = 'none';

        const formData = new FormData();
        formData.append('file', currentFile);

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                body: formData
            });

            const res = await response.json();
            loader.style.display = 'none';
            analyzeBtn.disabled = false;

            if (res.success && res.data) {
                renderResults(res.data);
            } else {
                alert('Prediction error: ' + (res.error || 'Unknown failure'));
            }
        } catch (err) {
            loader.style.display = 'none';
            analyzeBtn.disabled = false;
            alert('Network or server error while connecting to Flask API.');
        }
    });

    function renderResults(data) {
        resultCard.style.display = 'block';
        predictedSoilName.textContent = data.predicted_class;
        confidenceBadge.textContent = `Confidence: ${data.confidence}% (Inference: ${data.inference_time_ms}ms)`;

        // Render probability bars
        probBars.innerHTML = '';
        if (data.all_probabilities) {
            data.all_probabilities.forEach(item => {
                const row = document.createElement('div');
                row.className = 'prob-row';
                row.innerHTML = `
                    <div class="prob-meta">
                        <span>${item.class_name}</span>
                        <strong>${item.probability}%</strong>
                    </div>
                    <div class="prob-bar-track">
                        <div class="prob-bar-fill" style="width: ${item.probability}%;"></div>
                    </div>
                `;
                probBars.appendChild(row);
            });
        }

        // Render agronomic metadata
        const meta = data.soil_metadata || {};
        soilCharacteristics.textContent = meta.characteristics || '';
        soilOrder.textContent = meta.order || 'N/A';
        soilPh.textContent = meta.ph_range || 'N/A';

        if (meta.materials_present && Array.isArray(meta.materials_present) && soilMaterials) {
            soilMaterials.innerHTML = `<strong>Materials Present:</strong> ${meta.materials_present.join(', ')}`;
        }

        if (meta.best_plants && Array.isArray(meta.best_plants) && soilBestPlants) {
            soilBestPlants.innerHTML = `<strong>Best Plants for This Soil:</strong> ${meta.best_plants.map(p => `${p.name} (${p.reason})`).join('; ')}`;
        }

        if (meta.crops && Array.isArray(meta.crops)) {
            soilCrops.innerHTML = `<strong>Suitable Crops:</strong> ${meta.crops.join(', ')}`;
        }
    }
});
