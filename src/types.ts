export interface SoilMaterial {
  name: string;
  category: 'Mineral' | 'Organic' | 'Compound' | 'Trace Element';
  concentration: string;
  role: string;
}

export interface BestPlantRecommendation {
  name: string;
  suitability: 'Best Match' | 'Highly Suitable' | 'Recommended';
  season: string;
  whyBest: string;
}

export interface SoilProfile {
  id: string;
  name: string;
  scientificName: string;
  orderName: string;
  colorHex: string;
  imagePath: string;
  tagline: string;
  description: string;
  texture: string;
  organicMatter: string;
  phRange: string;
  waterRetention: string;
  nutrientProfile: {
    nitrogen: string;
    phosphorus: string;
    potassium: string;
    organicCarbon: string;
  };
  materialsPresent: SoilMaterial[];
  bestPlants: BestPlantRecommendation[];
  suitableCrops: string[];
  agronomicManagement: string[];
  geographicalDistribution: string;
}

export interface ClassProbability {
  className: string;
  probability: number;
}

export interface FeaturesExtracted {
  meanHue: number;
  meanSaturation: number;
  meanValue: number;
  textureRoughness: number;
  organicIndex: number;
  swinStage4AttentionEntropy: number;
}

export interface PredictionRecord {
  id: string;
  timestamp: string;
  fileName: string;
  predictedClass: string;
  confidence: number;
  secondaryClass: string;
  secondaryConfidence: number;
  classProbabilities: ClassProbability[];
  soilDetails: SoilProfile;
  featuresExtracted?: FeaturesExtracted;
  observations?: string;
  inferenceTimeMs: number;
  modelEngine: string;
}

export interface SampleSoilImage {
  id: string;
  name: string;
  soilType: string;
  path: string;
  caption: string;
}

export interface ModelStatusInfo {
  name: string;
  version: string;
  architecture: string;
  timmModelName: string;
  checkpointFile: string;
  checkpointFound: boolean;
  inputResolution: string;
  patchSize: string;
  windowSize: string;
  numClasses: number;
  classes: string[];
  embeddingDimension: number;
  stageDepths: number[];
  attentionHeads: number[];
  totalParameters: string;
  validationTop1Accuracy: string;
  validationF1Score: string;
  lossFunction: string;
  optimizer: string;
  status: string;
}
