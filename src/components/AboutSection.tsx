import React from 'react';
import { Target, CheckCircle2, Award, Network, BookOpen } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const objectives = [
    {
      title: 'Automate Soil Classification',
      desc: 'Replace slow laboratory sedimentation and sieve texture analysis with instant computer vision inference directly in the field.'
    },
    {
      title: 'Reduce Manual Identification Effort',
      desc: 'Eliminate subjective human visual bias and agricultural surveyor fatigue through standardized deep neural feature extraction.'
    },
    {
      title: 'Identify Fine-Grained Soil Characteristics',
      desc: 'Capture subtle inter-class boundaries between visually proximate soils such as Red vs Laterite or Black vs Mountain organic loam.'
    },
    {
      title: 'Apply Vision Transformer Technology to Agriculture',
      desc: 'Advance agricultural machine learning beyond standard CNNs by evaluating Hierarchical Vision Transformers with shifted window attention.'
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-2">
            Research Context & Vision
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            About SoilVision-X
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            SoilVision-X is an artificial intelligence research platform engineered to solve the challenging problem 
            of fine-grained soil type recognition under variable field illumination, moisture content, and crop residue.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-7 space-y-5 text-slate-700 leading-relaxed">
            <p>
              Traditional pedological soil identification requires physical soil sampling, laboratory oven drying, 
              pipette hydrometer analysis, and chemical digestion—procedures that often require several days and 
              specialized laboratory equipment. 
            </p>
            <p>
              <strong>SoilVision-X</strong> harnesses deep learning through a <strong>Hierarchical Vision Transformer (Swin Transformer)</strong>. 
              By segmenting 224×224 field photographs into local non-overlapping 4×4 pixel patches and computing multi-head self-attention 
              within shifted local windows, the network learns both fine-grained surface granulometry (cracking patterns, sand fractions) 
              and global chromatic reflectance signatures.
            </p>
            <p>
              The system predicts the most likely soil category across seven major pedological classes prevalent across 
              the Indian subcontinent and global agricultural basins, providing immediate agronomic prescriptions for sustainable crop cultivation.
            </p>

            {/* Academic Credential Card */}
            <div className="p-5 bg-stone-50 border border-stone-200 rounded-xl mt-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-900 mt-0.5">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Academic Project Demonstration</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Developed by <strong>N. Nikitha Reddy</strong> · Department of Computer Science & Engineering (AI & ML), <strong>SR University</strong>.
                    Designed as a capstone B.Tech demonstration combining state-of-the-art vision transformers with practical precision agronomy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Objectives Column */}
          <div className="lg:col-span-5 bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-6">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-800" />
              <h3 className="text-lg font-bold text-slate-900">Core Project Objectives</h3>
            </div>

            <div className="space-y-4">
              {objectives.map((obj, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{obj.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-normal">{obj.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Swin Transformer vs Traditional Methods Comparison */}
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 sm:p-8">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Network className="w-5 h-5 text-emerald-800" />
            <span>Why Swin Transformer for Soil Analysis?</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-white border border-stone-200 rounded-xl">
              <div className="text-xs font-semibold text-rose-800 uppercase tracking-wider mb-1">Traditional CNNs</div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">Fixed Local Receptive Fields</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standard CNN filters (3×3 or 5×5) struggle to establish long-range spatial correlations between distant soil drying fissures, 
                soil clods, and uneven field lighting.
              </p>
            </div>

            <div className="p-4 bg-white border border-stone-200 rounded-xl">
              <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">Standard ViT (Vanilla)</div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">Quadratic Complexity O(N²)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full-image global self-attention incurs quadratic computational cost with respect to token count, 
                making high-resolution fine-grained patch processing slow for real-time edge devices.
              </p>
            </div>

            <div className="p-4 bg-emerald-50/60 border border-emerald-300 rounded-xl">
              <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">Swin Transformer (SoilVision-X)</div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">Linear Complexity O(N) + Shifted Windows</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Computes self-attention within non-overlapping 7×7 windows and shifts windows between consecutive layers (W-MSA / SW-MSA), 
                yielding cross-window connections and hierarchical multi-scale feature maps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
