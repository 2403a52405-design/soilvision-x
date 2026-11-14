import React, { useState } from 'react';
import { SOIL_CATEGORIES } from '../data/soilData';
import { SoilProfile } from '../types';
import { MapPin, Sprout, ArrowRight, Layers } from 'lucide-react';

interface SoilCatalogProps {
  onSelectSoilForTest?: (soilName: string) => void;
}

export const SoilCatalog: React.FC<SoilCatalogProps> = ({ onSelectSoilForTest }) => {
  const [selectedSoil, setSelectedSoil] = useState<SoilProfile>(SOIL_CATEGORIES[0]);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredCategories = SOIL_CATEGORIES.filter((soil) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'acidic') return soil.phRange.toLowerCase().includes('acidic');
    if (activeFilter === 'alkaline') return soil.phRange.toLowerCase().includes('alkaline');
    if (activeFilter === 'high-moisture') return soil.waterRetention.toLowerCase().includes('high');
    return true;
  });

  return (
    <section id="categories" className="py-16 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-2">
              Soil Taxonomy & Agronomy Encyclopedia
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
              Seven Canonical Soil Categories
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-2xl">
              Comprehensive pedological taxonomy, textural profiles, mineral compositions, and regional agronomic suitability.
            </p>
          </div>

          {/* Interactive Filters (styled button tabs adhering to zero-pill discipline) */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg text-xs font-medium shrink-0">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeFilter === 'all' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All 7 Soils
            </button>
            <button
              onClick={() => setActiveFilter('high-moisture')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeFilter === 'high-moisture' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              High Retention
            </button>
            <button
              onClick={() => setActiveFilter('acidic')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeFilter === 'acidic' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Acidic Soils
            </button>
            <button
              onClick={() => setActiveFilter('alkaline')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeFilter === 'alkaline' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Alkaline Soils
            </button>
          </div>
        </div>

        {/* 2-Column Split: Interactive Showcase + Category Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Active Soil Showcase Detail (7 cols) */}
          <div className="lg:col-span-7 bg-[#FAF8F5] border border-stone-200 rounded-2xl overflow-hidden p-6 sm:p-8 space-y-6">
            <div className="relative rounded-xl overflow-hidden border border-stone-300 aspect-16/9 bg-stone-900 shadow-xs">
              <img
                src={selectedSoil.imagePath}
                alt={selectedSoil.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase tracking-wider font-mono text-emerald-300">
                  {selectedSoil.orderName}
                </span>
                <h3 className="text-2xl font-bold tracking-tight">{selectedSoil.name}</h3>
                <p className="text-xs text-stone-200 mt-0.5 line-clamp-1">{selectedSoil.tagline}</p>
              </div>
            </div>

            {/* Description & Scientific Order */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Pedological Genesis & Profile</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedSoil.description}
              </p>
            </div>

            {/* Characteristics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-white rounded-lg border border-stone-200">
                <div className="text-slate-400 font-mono text-[10px] uppercase">Texture</div>
                <div className="font-semibold text-slate-800 mt-1">{selectedSoil.texture}</div>
              </div>
              <div className="p-3 bg-white rounded-lg border border-stone-200">
                <div className="text-slate-400 font-mono text-[10px] uppercase">pH Reaction</div>
                <div className="font-semibold text-slate-800 mt-1">{selectedSoil.phRange}</div>
              </div>
              <div className="p-3 bg-white rounded-lg border border-stone-200">
                <div className="text-slate-400 font-mono text-[10px] uppercase">Moisture Retention</div>
                <div className="font-semibold text-slate-800 mt-1">{selectedSoil.waterRetention}</div>
              </div>
            </div>

            {/* Materials Present in Soil */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-800" />
                <span>Materials & Minerals Present</span>
              </h4>
              <div className="divide-y divide-stone-200 border border-stone-200 rounded-xl overflow-hidden bg-white">
                {selectedSoil.materialsPresent.slice(0, 4).map((mat) => (
                  <div key={mat.name} className="px-3.5 py-2.5 flex items-start justify-between gap-3 text-xs">
                    <div>
                      <span className="font-semibold text-slate-900">{mat.name}</span>
                      <span className="text-slate-500"> · {mat.role}</span>
                    </div>
                    <span className="font-mono font-semibold text-slate-800 whitespace-nowrap shrink-0 tabular-nums">
                      {mat.concentration}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Plants for This Soil */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Sprout className="w-4 h-4 text-emerald-800" />
                <span>Best Plants for {selectedSoil.name}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedSoil.bestPlants.slice(0, 2).map((plant) => (
                  <div key={plant.name} className="p-3 bg-white rounded-xl border border-stone-200 text-xs">
                    <div className="font-bold text-slate-900">{plant.name}</div>
                    <div className="text-[11px] font-medium text-emerald-800 mt-0.5">
                      {plant.suitability} · {plant.season}
                    </div>
                    <p className="text-slate-600 mt-1 leading-relaxed">{plant.whyBest}</p>
                  </div>
                ))}
              </div>
              <div className="mt-2.5 text-xs text-slate-600">
                <span className="font-semibold text-slate-800">Other Suitable Crops: </span>
                {selectedSoil.suitableCrops.join(' · ')}
              </div>
            </div>

            {/* Geographical Distribution */}
            <div className="p-4 bg-white rounded-xl border border-stone-200 text-xs text-slate-600 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 font-semibold block mb-0.5">Geographical Belts in India:</strong>
                <span>{selectedSoil.geographicalDistribution}</span>
              </div>
            </div>

            {/* Direct action to test this soil in the classifier */}
            {onSelectSoilForTest && (
              <button
                onClick={() => onSelectSoilForTest(selectedSoil.name)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
              >
                <span>Load {selectedSoil.name} Specimen into Classifier</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Right Selector List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Select Soil Category to Inspect:
            </div>

            {filteredCategories.map((soil) => {
              const isSelected = selectedSoil.id === soil.id;
              return (
                <div
                  key={soil.id}
                  onClick={() => setSelectedSoil(soil)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-4 ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-700 shadow-xs'
                      : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/60'
                  }`}
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-stone-200 bg-stone-100">
                    <img
                      src={soil.imagePath}
                      alt={soil.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className={`text-sm font-bold truncate ${isSelected ? 'text-emerald-900' : 'text-slate-900'}`}>
                        {soil.name}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-500 truncate">
                        {soil.orderName.split('/')[0]}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {soil.tagline}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-600 mt-1 font-mono">
                      <span>pH {soil.phRange.split(' ')[0]}</span>
                      <span>·</span>
                      <span className="truncate">{soil.texture.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
