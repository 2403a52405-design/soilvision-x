"""
SoilVision-X: Hierarchical Vision Transformer (Swin Transformer) Model Definition
Developed by: N. Nikitha Reddy, CSE (AI & ML), SR University

Architecture: Swin Transformer Tiny (Patch 4, Window 7, 224x224 input)
Backbone: swin_tiny_patch4_window7_224.ms_in1k
Number of Classes: 7 Soil Categories
"""

import os
import torch
import torch.nn as nn
try:
    import timm
except ImportError:
    timm = None

# Seven canonical soil classes
SOIL_CLASSES = [
    'Alluvial Soil',
    'Arid Soil',
    'Black Soil',
    'Laterite Soil',
    'Mountain Soil',
    'Red Soil',
    'Yellow Soil'
]

CHECKPOINT_PATH = os.path.join(os.path.dirname(__file__), 'soilvision_swin_best.pth')


class SwinSoilClassifier(nn.Module):
    """
    Swin Transformer classifier adapted for 7-class fine-grained soil classification.
    Implements Hierarchical shifted-window self-attention.
    """
    def __init__(self, num_classes=7, pretrained=False, drop_rate=0.2):
        super(SwinSoilClassifier, self).__init__()
        self.num_classes = num_classes
        
        if timm is not None:
            # Load swin_tiny_patch4_window7_224 architecture
            self.backbone = timm.create_model(
                'swin_tiny_patch4_window7_224',
                pretrained=pretrained,
                num_classes=num_classes,
                drop_rate=drop_rate
            )
        else:
            # Fallback lightweight hierarchical vision structure if timm is not installed
            self.backbone = nn.Sequential(
                nn.Conv2d(3, 96, kernel_size=4, stride=4),
                nn.BatchNorm2d(96),
                nn.ReLU(),
                nn.AdaptiveAvgPool2d((1, 1)),
                nn.Flatten(),
                nn.Dropout(drop_rate),
                nn.Linear(96, num_classes)
            )

    def forward(self, x):
        return self.backbone(x)


def load_model(checkpoint_path=CHECKPOINT_PATH, device='cpu'):
    """
    Loads the trained Swin Transformer model.
    If the trained checkpoint 'soilvision_swin_best.pth' is unavailable,
    returns the model instance along with a clear configuration message.
    """
    model = SwinSoilClassifier(num_classes=len(SOIL_CLASSES), pretrained=False)
    model.to(device)
    model.eval()

    checkpoint_loaded = False
    message = ""

    if os.path.exists(checkpoint_path):
        try:
            checkpoint = torch.load(checkpoint_path, map_location=device)
            # Support both raw state_dict or training dict containing 'model_state_dict'
            if isinstance(checkpoint, dict) and 'model_state_dict' in checkpoint:
                model.load_state_dict(checkpoint['model_state_dict'])
            elif isinstance(checkpoint, dict) and 'state_dict' in checkpoint:
                model.load_state_dict(checkpoint['state_dict'])
            else:
                model.load_state_dict(checkpoint)
            checkpoint_loaded = True
            message = f"Successfully loaded trained weights from '{checkpoint_path}'."
        except Exception as e:
            checkpoint_loaded = False
            message = f"Error reading checkpoint '{checkpoint_path}': {str(e)}"
    else:
        checkpoint_loaded = False
        message = (
            f"Model checkpoint '{checkpoint_path}' was not found. "
            "Please place your trained 'soilvision_swin_best.pth' file into the root directory. "
            "The model architecture is loaded and ready to accept the checkpoint."
        )

    return model, checkpoint_loaded, message
