import React from 'react';
import { ArrowRight, Layers, Scan, Zap, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  onClassify: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onClassify }) => {
  return (
    <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 -z-10 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Headline + Visual Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16">
          {/* Left Column (7 cols): Editorial Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase">
              <span>B.Tech Research Innovation</span>
              <span aria-hidden="true">·</span>
              <span>SR University</span>
              <span aria-hidden="true">·</span>
              <span>Dept. of CSE (AI & ML)</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] text-balance">
              Smart Soil Classification Using Artificial Intelligence
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
              Discover soil types through advanced computer vision and Hierarchical Vision Transformer technology. 
              Extract fine-grained granulometry and mineral reflectance with shifted-window self-attention.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onClassify}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 active:bg-emerald-950 transition-all shadow-sm hover:shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
              >
                <span>Classify Soil</span>
                <ArrowRight className="w-5 h-5 text-emerald-200" />
              </button>

              <button
                onClick={onExplore}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-medium text-slate-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 hover:text-slate-900 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
              >
                Explore Project
              </button>
            </div>

            {/* Lead Researcher Byline */}
            <div className="pt-4 border-t border-stone-200/80 flex items-center gap-3 text-xs text-slate-500">
              <span className="font-medium text-slate-700">Project SoilVision-X</span>
              <span aria-hidden="true">·</span>
              <span>Developed by N. Nikitha Reddy</span>
              <span aria-hidden="true">·</span>
              <span>Guide: School of Computer Science & AI</span>
            </div>
          </div>

          {/* Right Column (5 cols): Agricultural Soil Image with AI Scanning Effect */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-300/80 shadow-xl bg-slate-900 group">
              {/* Field Soil Hero Image */}
              <img
                src="/src/assets/images/hero_soil_field_1794401278866.jpg"
                alt="Agricultural field soil tilled furrows"
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />

              {/* Shifting Window Grid Overlay (Visualizing Swin Transformer 7x7 patch windows) */}
              <div 
                className="absolute inset-0 grid grid-cols-7 grid-rows-7 pointer-events-none opacity-40 mix-blend-screen"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)
                  `,
                  backgroundSize: '14.28% 14.28%'
                }}
              />

              {/* Laser Scanning Line Animation */}
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10B981] animate-laser pointer-events-none" />

              {/* Floating Live Telemetry HUD Overlays */}
              <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-md px-3 py-1.5 text-xs font-mono text-emerald-300 flex items-center gap-2 shadow-lg">
                <Scan className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                <span>SWIN-T · PATCH 4×4 · W-MSA ACTIVE</span>
              </div>

              <div className="absolute bottom-4 right-4 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-md px-3 py-2 text-xs font-mono text-stone-200 shadow-lg">
                <div className="text-[10px] text-stone-400 uppercase tracking-wider">Input Resolution</div>
                <div className="text-emerald-400 font-semibold tabular-nums">224 × 224 × 3 px · 49 Windows</div>
              </div>
            </div>

            {/* Quick calibration tag below visualizer */}
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>Backbone: swin_tiny_patch4_window7_224</span>
              <span>Classes: 7 Soil Types</span>
            </div>
          </div>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="p-6 bg-white border border-stone-200 rounded-xl shadow-2xs hover:border-emerald-700 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
              <Scan className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-2">AI-Powered Soil Detection</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Employs Shifted Window Multi-Head Self-Attention (SW-MSA) to capture both micro-texture and macro-horizon features.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white border border-stone-200 rounded-xl shadow-2xs hover:border-emerald-700 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-2">Seven Soil Categories</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Differentiates Alluvial, Arid, Black, Laterite, Mountain, Red, and Yellow soils with calibrated multi-class probabilities.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white border border-stone-200 rounded-xl shadow-2xs hover:border-emerald-700 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-2">Image-Based Classification</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Non-destructive visual analysis directly from regular field camera or mobile images without laborious laboratory digestion.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 bg-white border border-stone-200 rounded-xl shadow-2xs hover:border-emerald-700 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-2">Fast and Accurate Prediction</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Sub-50ms inference latency with confidence scores, soil characteristics, and tailored agronomic crop recommendations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
