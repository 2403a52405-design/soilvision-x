# SoilVision-X: Fine-Grained Soil Type Classification from Field Images Using a Hierarchical Vision Transformer

**Project Title:** SoilVision-X  
**Developed by:** N. Nikitha Reddy  
**Department:** Computer Science and Engineering (Artificial Intelligence & Machine Learning)  
**Institution:** SR University  
**Academic Target:** B.Tech Final-Year Project Demonstration & Viva Presentation  

---

## 🌾 Project Overview

**SoilVision-X** is an AI/ML research web platform designed to automate fine-grained soil type classification from field photographs using a **Hierarchical Vision Transformer (Swin Transformer)** architecture. 

Unlike conventional Convolutional Neural Networks (CNNs) with fixed receptive fields, the Swin Transformer extracts features at multiple hierarchical scales using **Shifted Window Multi-Head Self-Attention (SW-MSA)**. This achieves linear computational complexity relative to image size while capturing intricate aggregate granulometry, micro-fissuring, hydration color gradients, and organic matter distribution.

### Recognized Soil Categories (7 Classes):
1. **Alluvial Soil** (`Entisols / Inceptisols`)
2. **Arid Soil** (`Aridisols`)
3. **Black Soil / Regur** (`Vertisols`)
4. **Laterite Soil** (`Oxisols / Ultisols`)
5. **Mountain / Forest Soil** (`Inceptisols / Spodosols`)
6. **Red Soil** (`Alfisols`)
7. **Yellow Soil** (`Ultisols / Inceptisols`)

---

## 📁 Project Folder Structure

```
SoilVision-X/
│
├── app.py                      # Flask backend API server (Python)
├── model.py                    # PyTorch Swin-T architecture definition (timm)
├── predict.py                  # Image preprocessing & inference pipeline
├── server.ts                   # Express full-stack API server (Node.js / React)
├── requirements.txt            # Python dependencies (torch, torchvision, timm, flask)
├── package.json                # Web app dependencies & build scripts
├── vite.config.ts              # Vite bundler configuration
├── tsconfig.json               # TypeScript compiler config
│
├── soilvision_swin_best.pth    # PyTorch trained model weights checkpoint
│
├── src/
│   ├── assets/
│   │   └── images/             # Photographic soil samples & hero landscapes
│   ├── components/             # Reusable React UI & visualization modules
│   │   ├── Navigation.tsx      # Top bar navigation & active anchors
│   │   ├── HeroSection.tsx     # Hero banner with laser scanning visualization
│   │   ├── ClassificationConsole.tsx # Drag-and-drop inference console
│   │   ├── SwinVisualizer.tsx  # Shifted-window attention interactive diagram
│   │   ├── SoilCatalog.tsx     # 7 Soil categories encyclopedia & agronomy
│   │   ├── ModelSpecs.tsx      # Technical Swin-T model specifications
│   │   ├── AnalyticsDashboard.tsx # Real-time prediction analytics & charts
│   │   └── ContactSection.tsx  # Academic project contact & feedback form
│   ├── types.ts                # TypeScript interfaces
│   ├── App.tsx                 # Root application container
│   ├── main.tsx                # Client entry point
│   └── index.css               # Tailwind CSS & animations
│
├── templates/
│   └── index.html              # Flask Jinja2 web interface template
├── static/
│   ├── css/style.css           # Flask fallback stylesheet
│   ├── js/script.js            # Flask frontend async upload script
│   └── uploads/                # Directory for uploaded field images
│
└── README.md                   # Setup guide and documentation
```

---

## 🚀 Running the Project in Visual Studio Code on Windows

### Option A: Running the Modern Interactive Web Application (Node.js & React)
This powers the full-stack interactive application with real-time Swin Transformer feature extraction, Chart.js analytics, laser scanning visualizer, and instant sample test suite:

1. **Open the project in VS Code**:
   - Open VS Code.
   - Click `File` > `Open Folder...` and select the `SoilVision-X` directory.

2. **Open the Integrated Terminal**:
   - Press `Ctrl + ` `~` (or `Terminal` > `New Terminal`).

3. **Install Dependencies**:
   ```powershell
   npm install
   ```

4. **Launch the Development Server**:
   ```powershell
   npm run dev
   ```

5. **Open in Browser**:
   - Open your browser at `http://localhost:3000`

---

### Option B: Running the Python Flask & PyTorch Backend

1. **Set Up a Python Virtual Environment**:
   ```powershell
   # In VS Code terminal:
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```
   *(If execution policies block scripts in PowerShell, run: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`)*

2. **Install Python Requirements**:
   ```powershell
   pip install -r requirements.txt
   ```
   *(For CUDA GPU acceleration, install the CUDA-enabled PyTorch build from [pytorch.org](https://pytorch.org))*

3. **Place the Trained Model Checkpoint**:
   - Copy your trained `soilvision_swin_best.pth` file into the root project directory.
   - If the checkpoint file is not yet present, the model architecture will run in diagnostic evaluation mode.

4. **Start the Flask Server**:
   ```powershell
   python app.py
   ```

5. **Access the Flask API & Dashboard**:
   - Open `http://127.0.0.1:5000` in your web browser.

---

## 🧠 Model Architecture Details: Swin Transformer Tiny

- **Backbone Model:** `swin_tiny_patch4_window7_224.ms_in1k`
- **Input Dimension:** $224 \times 224 \times 3$
- **Patch Size:** $4 \times 4$ pixels per patch token
- **Window Size:** $7 \times 7$ patches per local self-attention window
- **Hierarchical Stages:** 4 stages with patch merging (channel expansion $96 \to 192 \to 384 \to 768$)
- **Parameters:** ~27.52 Million
- **Attention Mechanism:** Shifted Window Multi-Head Self-Attention (**SW-MSA**):
  $$\text{Attention}(Q, K, V) = \text{Softmax}\left(\frac{QK^T}{\sqrt{d}} + B\right)V$$
  where $B$ is the relative position bias matrix.

---

## 🎓 Academic Presentation Information

- **Candidate Name:** N. Nikitha Reddy
- **Department:** Computer Science and Engineering (AI & ML)
- **Institution:** SR University, Warangal, Telangana, India
- **Supervisor / Evaluators:** Department of CSE, School of Computer Science & Artificial Intelligence
