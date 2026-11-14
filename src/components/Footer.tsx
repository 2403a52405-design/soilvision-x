import React from 'react';
import { Sprout } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <div className="w-7 h-7 rounded-lg bg-emerald-700 flex items-center justify-center">
                <Sprout className="w-4 h-4 text-emerald-100" />
              </div>
              <span>SoilVision-X</span>
            </div>
            <p className="text-xs text-stone-400 mt-2 max-w-md">
              Fine-Grained Soil Type Classification from Field Images Using a Hierarchical Vision Transformer (Swin Transformer).
            </p>
          </div>

          <div className="text-xs text-stone-400 space-y-1 md:text-right">
            <div>Lead Researcher: <strong className="text-stone-200">N. Nikitha Reddy</strong></div>
            <div>Department: <span className="text-stone-200">Computer Science & Engineering (AI & ML)</span></div>
            <div>Institution: <span className="text-emerald-400 font-semibold">SR University</span>, Warangal</div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} SoilVision-X · All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[11px] text-stone-400">PyTorch · Swin-T · timm</span>
            <span>·</span>
            <span className="font-mono text-[11px] text-stone-400">7 Soil Classes</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
