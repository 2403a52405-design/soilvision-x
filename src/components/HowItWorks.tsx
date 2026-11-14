import React, { useState } from 'react';
import { 
  Upload, 
  Crop, 
  Grid3X3, 
  Layers, 
  BarChart3, 
  ArrowRight, 
  Check, 
  Sparkles 
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(3);

  const steps = [
    {
      stepNumber: 1,
      title: 'Upload Soil Image',
      icon: Upload,
      headline: 'RGB Field Acquisition',
      description: 'The user uploads a field photograph taken with standard smartphones or agricultural sensors under ambient sunlight. Supports JPG, JPEG, and PNG formats.',
      detailPoints: [
        'Raw RGB image ingestion',
        'Integrity and dimension validation',
        'Supports field specimens with organic debris and varying soil moisture'
      ],
      technicalSpec: 'Dimensions: Variable (W × H × 3) · Format: RGB Channels'
    },
    {
      stepNumber: 2,
      title: 'Image Preprocessing & Resizing',
      icon: Crop,
      headline: 'Standardized Tensor Formatting',
      description: 'The raw image undergoes bicubic resizing to 256 pixels, followed by a 224×224 center crop and channel-wise normalization aligned with ImageNet distribution statistics.',
      detailPoints: [
        'Resize: scale shortest edge to 256 px',
        'Center Crop: 224 × 224 window extraction',
        'Normalization: μ = [0.485, 0.456, 0.406], σ = [0.229, 0.224, 0.225]'
      ],
      technicalSpec: 'Output Tensor: Shape [1, 3, 224, 224] · Float32 Normalized'
    },
    {
      stepNumber: 3,
      title: 'Feature Extraction Using Swin Transformer',
      icon: Grid3X3,
      headline: 'Patch Partitioning & Linear Embedding',
      description: 'The 224×224 image is partitioned into non-overlapping 4×4 pixel patches (56×56 = 3,136 total tokens). A linear embedding layer projects raw pixel features into 96 dimensions.',
      detailPoints: [
        'Patch Size: 4 × 4 pixels with 3 color channels (4×4×3 = 48 values)',
        'Projection Dimension: C = 96 embedding channels',
        'Generates 3,136 patch tokens preserving high spatial resolution'
      ],
      technicalSpec: 'Patch Token Matrix: 56 × 56 × 96 · Linear Complexity'
    },
    {
      stepNumber: 4,
      title: 'Hierarchical Feature Analysis',
      icon: Layers,
      headline: 'Shifted-Window Self-Attention (W-MSA & SW-MSA)',
      description: 'Self-attention is computed within local 7×7 patch windows. Alternating layers shift the window partition by (3, 3) patches, introducing cross-window connections while Patch Merging progressively expands receptive fields across 4 stages.',
      detailPoints: [
        'Stage 1: 56 × 56 tokens, dim 96 (W-MSA + SW-MSA blocks)',
        'Stage 2: 28 × 28 tokens, dim 192 (Patch Merging 2×)',
        'Stage 3: 14 × 14 tokens, dim 384 (Deep semantic texture extraction)',
        'Stage 4: 7 × 7 tokens, dim 768 (High-level pedological abstraction)'
      ],
      technicalSpec: '4 Hierarchical Stages · Window Size 7×7 · Shift Vector (3, 3)'
    },
    {
      stepNumber: 5,
      title: 'Soil Type Prediction with Confidence Score',
      icon: BarChart3,
      headline: 'Softmax Probability Mapping & Agronomy Linking',
      description: 'Global average pooling reduces the final 7×7 Stage-4 representation to a 768-dimensional feature vector, which passes through a linear classification head and Softmax function to generate calibrated probabilities for all 7 soil categories.',
      detailPoints: [
        'Global Average Pooling: [B, 7, 7, 768] → [B, 768]',
        'Linear Output Layer: 768 → 7 canonical soil classes',
        'Softmax: Generates percentage probabilities summing to 100%'
      ],
      technicalSpec: 'Output: 7 Categorical Logits · CrossEntropy with Label Smoothing'
    }
  ];

  const current = steps[activeStep - 1];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-2">
            Pedological Deep Learning Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            How SoilVision-X Works
          </h2>
          <p className="mt-3 text-base text-slate-600">
            A 5-step hierarchical vision pipeline bridging raw field image photography with transformer-driven agronomic intelligence.
          </p>
        </div>

        {/* Interactive 5-Step Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-10">
          {steps.map((s) => {
            const Icon = s.icon;
            const isActive = activeStep === s.stepNumber;
            return (
              <button
                key={s.stepNumber}
                onClick={() => setActiveStep(s.stepNumber)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm'
                    : 'bg-white text-slate-800 border-stone-200 hover:border-emerald-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-emerald-200' : 'text-emerald-800'}`}>
                    STEP 0{s.stepNumber}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                </div>
                <h4 className="text-xs font-bold leading-snug line-clamp-2">
                  {s.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Detailed Step Stage Card */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Step Explanation (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                <span>Phase 0{current.stepNumber} of 05</span>
                <span>·</span>
                <span>{current.title}</span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                {current.headline}
              </h3>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {current.description}
              </p>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                  Transformation Details:
                </div>
                {current.detailPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 font-mono text-xs text-slate-700 mt-4">
                <span className="text-slate-400">Specification:</span> {current.technicalSpec}
              </div>
            </div>

            {/* Visual Workflow Diagram Box (5 cols) */}
            <div className="lg:col-span-5 bg-stone-900 rounded-xl p-6 text-stone-100 font-mono text-xs space-y-4 border border-stone-800">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Swin-T Dataflow
                </span>
                <span className="text-[10px] text-stone-400">Step {activeStep} / 5</span>
              </div>

              {/* Graphic Flow Representation */}
              <div className="space-y-2.5 text-[11px]">
                <div className={`p-2.5 rounded border transition-colors ${activeStep === 1 ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300' : 'border-stone-800 bg-stone-950 text-stone-400'}`}>
                  [01] Raw Soil Image → [W, H, 3]
                </div>
                <div className={`p-2.5 rounded border transition-colors ${activeStep === 2 ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300' : 'border-stone-800 bg-stone-950 text-stone-400'}`}>
                  [02] Resize (256) + CenterCrop → [3, 224, 224]
                </div>
                <div className={`p-2.5 rounded border transition-colors ${activeStep === 3 ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300' : 'border-stone-800 bg-stone-950 text-stone-400'}`}>
                  [03] Patch Partition (4×4) + Linear Embed → [56, 56, 96]
                </div>
                <div className={`p-2.5 rounded border transition-colors ${activeStep === 4 ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300' : 'border-stone-800 bg-stone-950 text-stone-400'}`}>
                  [04] Swin Blocks (W-MSA / SW-MSA) → 4 Hierarchical Stages
                </div>
                <div className={`p-2.5 rounded border transition-colors ${activeStep === 5 ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300' : 'border-stone-800 bg-stone-950 text-stone-400'}`}>
                  [05] Global Avg Pool + Head → 7 Soil Probabilities
                </div>
              </div>

              <div className="pt-2 text-[10px] text-stone-400 border-t border-stone-800 flex justify-between">
                <span>Computational Complexity: O(M² × N)</span>
                <span className="text-emerald-400">Linear Scaling</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
