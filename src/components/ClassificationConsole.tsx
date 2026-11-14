import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Trash2, 
  RefreshCw, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Droplet, 
  Sparkles,
  ArrowRight,
  Sprout,
  Layers,
  Award
} from 'lucide-react';
import { PredictionRecord, SampleSoilImage } from '../types';
import { SAMPLE_SOIL_IMAGES } from '../data/soilData';

interface ClassificationConsoleProps {
  onPredictionComplete?: (record: PredictionRecord) => void;
}

export const ClassificationConsole: React.FC<ClassificationConsoleProps> = ({ onPredictionComplete }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [predictionResult, setPredictionResult] = useState<PredictionRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'results' | 'agronomy' | 'features'>('results');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  // Handle file selection
  const handleFileChange = (file: File) => {
    if (!file.type.match('image/(jpeg|jpg|png|webp)')) {
      setErrorMessage('Unsupported file format. Please upload a JPG, JPEG, or PNG image.');
      return;
    }
    setErrorMessage(null);
    setSelectedFile(file);
    setPredictionResult(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  // Load sample image
  const handleSelectSample = async (sample: SampleSoilImage) => {
    try {
      setErrorMessage(null);
      setPredictionResult(null);
      setImagePreviewUrl(sample.path);

      // Fetch sample to convert to File object
      const res = await fetch(sample.path);
      const blob = await res.blob();
      const file = new File([blob], `${sample.soilType.toLowerCase().replace(/\s+/g, '_')}_sample.jpg`, {
        type: 'image/jpeg'
      });
      setSelectedFile(file);
    } catch (err) {
      console.error('Failed to load sample:', err);
    }
  };

  // Trigger analysis
  const handleAnalyze = async () => {
    if (!imagePreviewUrl) return;

    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: imagePreviewUrl,
          fileName: selectedFile?.name || 'field_soil_sample.jpg'
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Soil classification failed.');
      }

      setPredictionResult(data.prediction);
      setActiveTab('results');
      if (onPredictionComplete) {
        onPredictionComplete(data.prediction);
      }
    } catch (err: any) {
      console.error('Prediction error:', err);
      setErrorMessage(err.message || 'Connection error to the Swin Transformer prediction engine.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Clear state
  const handleClear = () => {
    setSelectedFile(null);
    setImagePreviewUrl(null);
    setPredictionResult(null);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Download printable report
  const handleDownloadReport = () => {
    window.print();
  };

  return (
    <section id="classify" className="py-16 md:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-2">
            Inference Console
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Fine-Grained Soil Classification
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Upload field soil imagery or select a reference sample to execute hierarchical shifted-window vision transformer inference.
          </p>
        </div>

        {/* Sample Images Strip */}
        <div className="mb-8 p-5 bg-white border border-stone-200 rounded-xl shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              Quick Reference Samples (Click to Test)
            </span>
            <span className="text-xs text-slate-500">
              High-resolution verified field specimens across all 7 soil classes
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {SAMPLE_SOIL_IMAGES.map((sample) => (
              <button
                key={sample.id}
                onClick={() => handleSelectSample(sample)}
                className="group relative rounded-lg overflow-hidden border border-stone-200 hover:border-emerald-700 hover:shadow-sm transition-all text-left bg-stone-50 p-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
              >
                <div className="aspect-square rounded overflow-hidden mb-1.5 bg-stone-200">
                  <img
                    src={sample.path}
                    alt={sample.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-[11px] font-semibold text-slate-900 truncate">
                  {sample.soilType}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image Upload & Preview Stage (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900">1. Soil Image Input</h3>
                {imagePreviewUrl && (
                  <button
                    onClick={handleClear}
                    className="text-xs font-medium text-rose-700 hover:text-rose-900 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                )}
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileChange(e.target.files[0]);
                  }
                }}
              />

              {/* Upload Dropzone / Preview Stage */}
              {!imagePreviewUrl ? (
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-stone-300 hover:border-emerald-700 rounded-xl p-8 text-center bg-stone-50/70 hover:bg-emerald-50/20 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[320px]"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-1">
                    Drag and drop field soil image
                  </h4>
                  <p className="text-xs text-slate-500 mb-4">
                    Or click to browse from local computer
                  </p>
                  <span className="px-3 py-1.5 text-xs font-medium text-emerald-900 bg-emerald-100/70 rounded-md">
                    Supports JPG, JPEG, PNG
                  </span>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-stone-200 bg-slate-950">
                  <img
                    src={imagePreviewUrl}
                    alt="Soil specimen preview"
                    className="w-full h-[320px] object-cover"
                  />

                  {/* Shifting-window overlay & AI Scanning effect during active inference */}
                  {isAnalyzing && (
                    <>
                      {/* Grid overlay */}
                      <div 
                        className="absolute inset-0 grid grid-cols-7 grid-rows-7 pointer-events-none opacity-50 mix-blend-screen"
                        style={{
                          backgroundImage: `
                            linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)
                          `,
                          backgroundSize: '14.28% 14.28%'
                        }}
                      />
                      {/* Laser beam */}
                      <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_#10B981] animate-laser pointer-events-none" />
                      
                      {/* Scanning status banner */}
                      <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-lg p-3 text-center text-xs text-emerald-400 font-mono flex items-center justify-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                        <span>Swin Transformer: Calculating W-MSA Attention (224×224)...</span>
                      </div>
                    </>
                  )}

                  {/* Specimen Info Bar */}
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-mono text-stone-200">
                    {selectedFile?.name || 'soil_specimen.jpg'}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 py-2.5 px-4 text-xs font-semibold text-slate-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Browse Image
                </button>

                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={!imagePreviewUrl || isAnalyzing}
                  className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 disabled:bg-stone-300 disabled:cursor-not-allowed rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-200" />
                      <span>Analyze Soil</span>
                    </>
                  )}
                </button>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            {/* Quick Helper Note */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Pre-processing specification:</span> Images are resized to 256px, center-cropped to 224×224, and normalized using ImageNet channel statistics before entering the Swin Transformer stem.
            </div>
          </div>

          {/* Right Column: Prediction Results & Agronomic Profile (7 cols) */}
          <div className="lg:col-span-7">
            {!predictionResult ? (
              <div className="bg-white border border-stone-200 rounded-2xl p-10 text-center text-slate-500 min-h-[440px] flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
                  <Sprout className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Awaiting Soil Analysis</h3>
                <p className="text-xs text-slate-500 max-w-sm mb-6">
                  Select a sample above or upload your own soil photograph, then click <strong>Analyze Soil</strong> to generate real-time Swin Transformer classification.
                </p>
                <button
                  onClick={() => handleSelectSample(SAMPLE_SOIL_IMAGES[0])}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Load Black Soil Sample</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div ref={reportRef} className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                {/* Result Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mb-1">
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Classification Confirmed
                      </span>
                      <span>·</span>
                      <span className="tabular-nums">Latency: {predictionResult.inferenceTimeMs} ms</span>
                    </div>
                    <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                      {predictionResult.predictedClass}
                    </h3>
                    <div className="text-xs text-slate-500 mt-1">
                      Scientific Order: <strong className="text-slate-800">{predictionResult.soilDetails.orderName}</strong>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end justify-between sm:justify-center bg-emerald-50/80 border border-emerald-200 rounded-xl px-4 py-3 text-right">
                    <span className="text-[11px] font-semibold text-emerald-900 uppercase tracking-wider">
                      Confidence Score
                    </span>
                    <span className="text-3xl font-extrabold text-emerald-800 font-mono tabular-nums">
                      {predictionResult.confidence.toFixed(2)}%
                    </span>
                  </div>
                </div>

                {/* Sub-tabs for switching between Probabilities & Diagnosis, Agronomic Care, and Vision Features */}
                <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg text-xs font-medium overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('results')}
                    className={`flex-1 py-2 px-3 rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      activeTab === 'results'
                        ? 'bg-white text-slate-900 font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Results, Materials & Plants
                  </button>
                  <button
                    onClick={() => setActiveTab('agronomy')}
                    className={`flex-1 py-2 px-3 rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      activeTab === 'agronomy'
                        ? 'bg-white text-slate-900 font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Agronomic Care & NPK
                  </button>
                  <button
                    onClick={() => setActiveTab('features')}
                    className={`flex-1 py-2 px-3 rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      activeTab === 'features'
                        ? 'bg-white text-slate-900 font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Swin Attention Features
                  </button>
                </div>

                {/* Tab 1: Classification Results, Soil Materials Present & Best Plants */}
                {activeTab === 'results' && (
                  <div className="space-y-6">
                    {predictionResult.observations && (
                      <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-slate-700 leading-relaxed">
                        <span className="font-semibold text-slate-900">Specimen Visual Note: </span>
                        {predictionResult.observations}
                      </div>
                    )}

                    {/* Class Probability Distribution */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-semibold text-slate-800">Category Prediction Breakdown</span>
                        <span className="font-mono">Softmax Distribution</span>
                      </div>

                      <div className="space-y-2.5">
                        {predictionResult.classProbabilities.map((item, idx) => {
                          const isTop = idx === 0;
                          return (
                            <div key={item.className} className="space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className={`font-medium ${isTop ? 'text-emerald-950 font-bold' : 'text-slate-700'}`}>
                                  {item.className}
                                  {isTop && <span className="ml-2 text-[11px] text-emerald-800 font-semibold">· Predicted</span>}
                                </span>
                                <span className={`font-mono tabular-nums ${isTop ? 'text-emerald-800 font-bold' : 'text-slate-500'}`}>
                                  {item.probability.toFixed(2)}%
                                </span>
                              </div>

                              <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-700 ${
                                    isTop ? 'bg-emerald-700' : idx === 1 ? 'bg-amber-600' : 'bg-stone-300'
                                  }`}
                                  style={{ width: `${Math.max(1, item.probability)}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Materials Present in This Soil */}
                    {predictionResult.soilDetails.materialsPresent && predictionResult.soilDetails.materialsPresent.length > 0 && (
                      <div className="pt-6 border-t border-stone-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                            <Layers className="w-4 h-4 text-amber-800" />
                            <span>Materials Present in Soil</span>
                          </h4>
                          <span className="text-[11px] text-slate-500 font-mono">
                            pH {predictionResult.soilDetails.phRange.split(' ')[0]} · {predictionResult.soilDetails.organicMatter.split(' ')[0]} OM
                          </span>
                        </div>

                        <div className="divide-y divide-stone-200 border border-stone-200 rounded-xl overflow-hidden bg-stone-50/40">
                          {predictionResult.soilDetails.materialsPresent.map((mat) => (
                            <div key={mat.name} className="p-3.5 bg-white flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                              <div className="space-y-0.5">
                                <div className="text-xs font-bold text-slate-900">{mat.name}</div>
                                <div className="text-xs text-slate-600 leading-relaxed">{mat.role}</div>
                              </div>
                              <div className="sm:text-right shrink-0">
                                <div className="text-xs font-mono font-semibold text-slate-800 tabular-nums">
                                  {mat.concentration}
                                </div>
                                <div className="text-[11px] text-slate-500">
                                  {mat.category}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Best Plants for This Soil */}
                    {predictionResult.soilDetails.bestPlants && predictionResult.soilDetails.bestPlants.length > 0 && (
                      <div className="pt-6 border-t border-stone-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                            <Sprout className="w-4 h-4 text-emerald-800" />
                            <span>Best Plants for This Soil</span>
                          </h4>
                          <span className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                            <Award className="w-3.5 h-3.5" />
                            Top Match: {predictionResult.soilDetails.bestPlants[0].name.split(' (')[0]}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {predictionResult.soilDetails.bestPlants.map((plant) => (
                            <div
                              key={plant.name}
                              className={`p-3.5 rounded-xl border ${
                                plant.suitability === 'Best Match'
                                  ? 'bg-emerald-50/60 border-emerald-200'
                                  : 'bg-stone-50/70 border-stone-200'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div className="text-xs font-bold text-slate-900">{plant.name}</div>
                              </div>
                              <div className="text-[11px] font-medium text-emerald-800 mb-1.5">
                                {plant.suitability} · {plant.season}
                              </div>
                              <p className="text-xs text-slate-600 leading-relaxed">
                                {plant.whyBest}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 2: Agronomic Profile & Nutrient Care */}
                {activeTab === 'agronomy' && (
                  <div className="space-y-5 text-sm">
                    <p className="text-slate-600 leading-relaxed">
                      {predictionResult.soilDetails.description}
                    </p>

                    {/* Key Attributes Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                        <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Texture</div>
                        <div className="text-xs font-semibold text-slate-900 mt-1">{predictionResult.soilDetails.texture}</div>
                      </div>
                      <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                        <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">pH Range</div>
                        <div className="text-xs font-semibold text-slate-900 mt-1">{predictionResult.soilDetails.phRange}</div>
                      </div>
                      <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                        <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Water Retention</div>
                        <div className="text-xs font-semibold text-slate-900 mt-1">{predictionResult.soilDetails.waterRetention}</div>
                      </div>
                    </div>

                    {/* NPK & Organic Carbon Profile */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                        Macro-Nutrient & Organic Carbon Profile
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                        <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                          <div className="text-[11px] text-slate-500">Nitrogen (N)</div>
                          <div className="font-semibold text-slate-900 mt-0.5">{predictionResult.soilDetails.nutrientProfile.nitrogen}</div>
                        </div>
                        <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                          <div className="text-[11px] text-slate-500">Phosphorus (P)</div>
                          <div className="font-semibold text-slate-900 mt-0.5">{predictionResult.soilDetails.nutrientProfile.phosphorus}</div>
                        </div>
                        <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                          <div className="text-[11px] text-slate-500">Potassium (K)</div>
                          <div className="font-semibold text-slate-900 mt-0.5">{predictionResult.soilDetails.nutrientProfile.potassium}</div>
                        </div>
                        <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                          <div className="text-[11px] text-slate-500">Organic Carbon</div>
                          <div className="font-semibold text-slate-900 mt-0.5">{predictionResult.soilDetails.nutrientProfile.organicCarbon}</div>
                        </div>
                      </div>
                    </div>

                    {/* Suitable Crops */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Sprout className="w-4 h-4 text-emerald-800" />
                        <span>All Suitable Agricultural Plants & Crops</span>
                      </h4>
                      <div className="text-xs text-slate-700 leading-relaxed">
                        {predictionResult.soilDetails.suitableCrops.join(' · ')}
                      </div>
                    </div>

                    {/* Management Prescriptions */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Droplet className="w-4 h-4 text-emerald-800" />
                        <span>Agronomic Recommendations</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {predictionResult.soilDetails.agronomicManagement.map((rec, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-700 font-bold">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Tab 3: Swin Vision Features */}
                {activeTab === 'features' && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-600">
                      Extracted multi-scale spectral and textural parameters aligned with Swin Transformer Stage-4 patch tokens:
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                      <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                        <div className="text-[10px] text-slate-400">Mean Color Hue</div>
                        <div className="text-base font-bold text-slate-800 mt-0.5 tabular-nums">
                          {predictionResult.featuresExtracted?.meanHue ?? 38}°
                        </div>
                      </div>
                      <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                        <div className="text-[10px] text-slate-400">Saturation Index</div>
                        <div className="text-base font-bold text-slate-800 mt-0.5 tabular-nums">
                          {predictionResult.featuresExtracted?.meanSaturation ?? 42}%
                        </div>
                      </div>
                      <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                        <div className="text-[10px] text-slate-400">Texture Roughness</div>
                        <div className="text-base font-bold text-slate-800 mt-0.5 tabular-nums">
                          {predictionResult.featuresExtracted?.textureRoughness ?? 0.68}
                        </div>
                      </div>
                      <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                        <div className="text-[10px] text-slate-400">Organic Carbon Index</div>
                        <div className="text-base font-bold text-slate-800 mt-0.5 tabular-nums">
                          {predictionResult.featuresExtracted?.organicIndex ?? 0.54}
                        </div>
                      </div>
                      <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                        <div className="text-[10px] text-slate-400">SW-MSA Entropy</div>
                        <div className="text-base font-bold text-slate-800 mt-0.5 tabular-nums">
                          {predictionResult.featuresExtracted?.swinStage4AttentionEntropy ?? 1.34}
                        </div>
                      </div>
                      <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                        <div className="text-[10px] text-slate-400">Inference Engine</div>
                        <div className="text-xs font-semibold text-emerald-800 mt-1 truncate">
                          Swin-T 224
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer Controls: Print / Download Report & Reset */}
                <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={handleDownloadReport}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-600" />
                    <span>Download / Print Prescription</span>
                  </button>

                  <button
                    onClick={handleClear}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Classify Another Specimen</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
