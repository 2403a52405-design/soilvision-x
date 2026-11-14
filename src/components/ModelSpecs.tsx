import React, { useState, useEffect } from 'react';
import { Cpu, CheckCircle2, AlertTriangle, Layers, Zap, Info, Shield } from 'lucide-react';
import { ModelStatusInfo } from '../types';

export const ModelSpecs: React.FC = () => {
  const [modelInfo, setModelInfo] = useState<ModelStatusInfo | null>(null);
  const [activeWindowMode, setActiveWindowMode] = useState<'standard' | 'shifted'>('standard');

  useEffect(() => {
    fetch('/api/model-status')
      .then((res) => res.json())
      .then((data) => setModelInfo(data))
      .catch((err) => console.error('Failed to load model status:', err));
  }, []);

  return (
    <section id="model-info" className="py-16 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-2">
            Technical Architecture & Checkpoint Specifications
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Model Architecture: Swin Transformer
          </h2>
          <p className="mt-3 text-base text-slate-600">
            A Hierarchical Vision Transformer utilizing Shifted Window Multi-Head Self-Attention for linear computational scaling and cross-window pedological feature integration.
          </p>
        </div>

        {/* Checkpoint Status Banner */}
        <div className="p-4 sm:p-5 rounded-xl border border-stone-200 bg-stone-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg mt-0.5 ${modelInfo?.checkpointFound ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900">
                  Model Checkpoint: <code className="font-mono text-emerald-900">soilvision_swin_best.pth</code>
                </h4>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                  modelInfo?.checkpointFound ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                }`}>
                  {modelInfo?.checkpointFound ? 'Active Checkpoint Loaded' : 'Architecture Initialized & Ready'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                {modelInfo?.checkpointFound
                  ? 'Fine-tuned weights verified. The PyTorch inference pipeline is active on the 7 canonical soil classes.'
                  : 'Place soilvision_swin_best.pth in the root directory for standalone PyTorch execution. The live web evaluation engine is active.'}
              </p>
            </div>
          </div>

          <div className="text-xs font-mono text-slate-500 whitespace-nowrap">
            Backbone: <span className="text-slate-800 font-semibold">swin_tiny_patch4_window7_224</span>
          </div>
        </div>

        {/* 2-Column Specs Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Technical Specifications Table (7 cols) */}
          <div className="lg:col-span-7 bg-[#FAF8F5] border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-800" />
              <span>Hyperparameter & Training Setup</span>
            </h3>

            <div className="divide-y divide-stone-200 text-xs sm:text-sm">
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500">Model Name</span>
                <span className="font-semibold text-slate-900">Swin Transformer (Swin-T)</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500">Architecture Family</span>
                <span className="font-semibold text-slate-900">Hierarchical Vision Transformer</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500">Deep Learning Framework</span>
                <span className="font-semibold text-slate-900">PyTorch / Torchvision / TIMM</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500">Pretrained Backbone</span>
                <span className="font-mono text-xs font-semibold text-emerald-900">swin_tiny_patch4_window7_224.ms_in1k</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500">Input Image Resolution</span>
                <span className="font-mono font-semibold text-slate-900">224 × 224 × 3 pixels</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500">Patch Dimension</span>
                <span className="font-mono font-semibold text-slate-900">4 × 4 pixels (P = 4)</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500">Local Attention Window</span>
                <span className="font-mono font-semibold text-slate-900">7 × 7 patches (M = 7)</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500">Stage Depths</span>
                <span className="font-mono font-semibold text-slate-900">[2, 2, 6, 2] Swin Transformer blocks</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500">Attention Heads</span>
                <span className="font-mono font-semibold text-slate-900">[3, 6, 12, 24] heads per stage</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500">Total Trainable Parameters</span>
                <span className="font-mono font-semibold text-slate-900">~27.52 Million</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500">Optimization Algorithm</span>
                <span className="font-semibold text-slate-900">AdamW (lr=5e-4, weight_decay=0.05)</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500">Loss Function</span>
                <span className="font-semibold text-slate-900">CrossEntropyLoss with Label Smoothing (0.1)</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500">Output Classification Classes</span>
                <span className="font-semibold text-slate-900">7 Soil Categories (Softmax probabilities)</span>
              </div>
            </div>
          </div>

          {/* Interactive Shifted-Window Attention Visualizer (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                Shifted-Window Attention (SW-MSA)
              </h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Standard local self-attention is confined to isolated non-overlapping windows. In the consecutive layer, 
              the window partitioning is shifted by $\lfloor M/2 \rfloor = 3$ patches to bridge information across window boundaries.
            </p>

            {/* Toggle Between Standard & Shifted */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg text-xs font-medium">
              <button
                onClick={() => setActiveWindowMode('standard')}
                className={`flex-1 py-1.5 rounded-md transition-colors cursor-pointer ${
                  activeWindowMode === 'standard' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Layer l: W-MSA (Regular)
              </button>
              <button
                onClick={() => setActiveWindowMode('shifted')}
                className={`flex-1 py-1.5 rounded-md transition-colors cursor-pointer ${
                  activeWindowMode === 'shifted' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Layer l+1: SW-MSA (Shifted)
              </button>
            </div>

            {/* 8x8 Grid Demonstration */}
            <div className="p-4 bg-stone-900 rounded-xl text-center space-y-3">
              <div className="text-[11px] font-mono text-stone-300">
                {activeWindowMode === 'standard' 
                  ? 'Standard Window Partitioning (4 Regular Windows)' 
                  : 'Shifted Window Partitioning (Cross-Boundary Receptive Field)'}
              </div>

              <div className="grid grid-cols-4 gap-1 max-w-[240px] mx-auto p-2 bg-stone-950 rounded-lg border border-stone-800">
                {Array.from({ length: 16 }).map((_, i) => {
                  const isShiftedBorder = activeWindowMode === 'shifted' && (i % 4 === 1 || i % 4 === 2 || Math.floor(i / 4) === 1 || Math.floor(i / 4) === 2);
                  return (
                    <div
                      key={i}
                      className={`aspect-square rounded text-[9px] font-mono flex items-center justify-center transition-colors ${
                        activeWindowMode === 'standard'
                          ? i % 2 === 0
                            ? 'bg-emerald-800/80 text-emerald-200'
                            : 'bg-emerald-900/60 text-emerald-300'
                          : isShiftedBorder
                            ? 'bg-amber-600/90 text-amber-100 animate-pulse-subtle'
                            : 'bg-emerald-950 text-emerald-400'
                      }`}
                    >
                      P{i + 1}
                    </div>
                  );
                })}
              </div>

              <div className="text-[10px] font-mono text-stone-400">
                {activeWindowMode === 'standard'
                  ? 'Self-attention computed only within P1-P4, P5-P8, etc.'
                  : 'Masked self-attention spans across original window partitions!'}
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-slate-600">
              <span className="font-semibold text-slate-800">Mathematical Formulation:</span>
              <div className="font-mono text-[11px] text-emerald-950 mt-1">
                Attention(Q, K, V) = Softmax(QKᵀ / √d + B)V
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Where B ∈ ℝ^(M² × M²) is the learned relative position bias, significantly improving accuracy on continuous field soil textures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
