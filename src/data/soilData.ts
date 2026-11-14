import { SoilProfile, SampleSoilImage } from '../types';

export const SOIL_CATEGORIES: SoilProfile[] = [
  {
    id: 'alluvial',
    name: 'Alluvial Soil',
    scientificName: 'Fluventic / Entisols & Inceptisols',
    orderName: 'Entisols / Inceptisols',
    colorHex: '#6D5D4B',
    imagePath: '/src/assets/images/alluvial_soil_1794401281254.jpg',
    tagline: 'River-transported silty loam with supreme agricultural productivity',
    description: 'Immature river-deposited loamy soil formed through fluvial deposition across river basins and deltas. Highly fertile, rich in potash, phosphoric acid, and lime, but generally deficient in nitrogen.',
    texture: 'Sandy loam to silty clay loam',
    organicMatter: 'Moderate (0.5% - 0.9%)',
    phRange: '6.5 - 8.2 (Neutral to mildly alkaline)',
    waterRetention: 'Moderate to High',
    nutrientProfile: {
      nitrogen: 'Deficient to Medium',
      phosphorus: 'Medium to Adequate',
      potassium: 'Rich / High',
      organicCarbon: 'Medium (0.6%)',
    },
    materialsPresent: [
      { name: 'Quartz Silt & Fine Sand', category: 'Mineral', concentration: '55% - 70%', role: 'Provides friable loamy drainage and easy root penetration' },
      { name: 'Potash (K₂O) & Feldspar', category: 'Compound', concentration: 'High (280 - 420 kg/ha)', role: 'Drives starch synthesis, stalk strength, and drought resilience' },
      { name: 'Calcium Carbonate (Lime)', category: 'Compound', concentration: '2% - 6%', role: 'Buffers soil pH and improves flocculation of river clays' },
      { name: 'Illite Clay & Phosphoric Acid', category: 'Mineral', concentration: '18% - 28%', role: 'Retains exchangeable cations and supports early root vigor' },
      { name: 'Riverine Humus & Organic Matter', category: 'Organic', concentration: '0.5% - 0.9%', role: 'Feeds beneficial rhizosphere microbes and holds topsoil moisture' }
    ],
    bestPlants: [
      { name: 'Rice (Paddy / Oryza sativa)', suitability: 'Best Match', season: 'Kharif (Monsoon)', whyBest: 'Thrives in silty clay loam retention and abundant potash/lime during flooded vegetative growth.' },
      { name: 'Wheat (Triticum aestivum)', suitability: 'Best Match', season: 'Rabi (Winter)', whyBest: 'Deep friable alluvial loam supports dense fibrous root systems and high grain filling.' },
      { name: 'Sugarcane (Saccharum officinarum)', suitability: 'Highly Suitable', season: 'Annual (10–12 mo)', whyBest: 'Rich potassium and phosphoric acid reserves drive high sucrose accumulation.' },
      { name: 'Banana & Vegetables', suitability: 'Recommended', season: 'Year-round', whyBest: 'High potash content and neutral pH favor heavy-feeding horticultural crops.' }
    ],
    suitableCrops: ['Rice (Paddy)', 'Wheat', 'Sugarcane', 'Cotton', 'Jute', 'Oilseeds', 'Pulses'],
    agronomicManagement: [
      'Apply split doses of nitrogenous fertilizers to minimize deep percolation losses.',
      'Incorporate organic green manure (Sesbania / Dhaincha) before paddy puddling.',
      'Maintain laser land leveling for uniform moisture distribution and drainage.'
    ],
    geographicalDistribution: 'Indo-Gangetic plains (Punjab, Haryana, UP, Bihar, West Bengal) and major river deltas (Mahanadi, Godavari, Krishna, Cauvery).'
  },
  {
    id: 'arid',
    name: 'Arid Soil',
    scientificName: 'Typic Torripsamments / Aridisols',
    orderName: 'Aridisols',
    colorHex: '#CBB279',
    imagePath: '/src/assets/images/arid_soil_1794401301505.jpg',
    tagline: 'Dry sandy soil of desert ecosystems with high mineral salinity',
    description: 'Coarse-textured sandy soil developed in hyper-arid to semi-arid regions with high evapotranspiration. Deficient in moisture and humus, containing variable deposits of calcium carbonate (kankar) nodules and gypsum.',
    texture: 'Coarse Sand to Sandy Loam',
    organicMatter: 'Very Low (< 0.25%)',
    phRange: '7.8 - 9.2 (Alkaline / Saline-prone)',
    waterRetention: 'Very Low (rapid percolation)',
    nutrientProfile: {
      nitrogen: 'Severely Deficient',
      phosphorus: 'Low to Medium',
      potassium: 'Adequate / High',
      organicCarbon: 'Very Poor (< 0.2%)',
    },
    materialsPresent: [
      { name: 'Coarse Silica Sand (SiO₂)', category: 'Mineral', concentration: '78% - 90%', role: 'Creates high aeration and rapid water infiltration' },
      { name: 'Calcium Carbonate (Kankar Nodules)', category: 'Compound', concentration: '5% - 15%', role: 'Forms calcic horizons that raise pH and restrict deep drainage' },
      { name: 'Soluble Salts & Gypsum (CaSO₄)', category: 'Compound', concentration: 'Elevated (EC > 2 dS/m)', role: 'Increases osmotic pressure; gypsum helps displace excess sodium' },
      { name: 'Available Phosphate & Potash', category: 'Trace Element', concentration: 'Moderate to High', role: 'Supports hardy root establishment despite low nitrogen' },
      { name: 'Humus & Organic Carbon', category: 'Organic', concentration: 'Very Low (< 0.25%)', role: 'Minimal microbial activity due to arid heat and sparse litter' }
    ],
    bestPlants: [
      { name: 'Pearl Millet (Bajra / Pennisetum glaucum)', suitability: 'Best Match', season: 'Kharif (Monsoon)', whyBest: 'Exceptional heat tolerance and deep scavenging roots adapted to coarse silica sands and low moisture.' },
      { name: 'Date Palm (Phoenix dactylifera)', suitability: 'Best Match', season: 'Perennial', whyBest: 'Tolerates alkaline pH (up to 9.0) and moderate soil salinity with deep taproot access.' },
      { name: 'Cluster Bean (Guar / Cyamopsis)', suitability: 'Highly Suitable', season: 'Kharif', whyBest: 'Fixes atmospheric nitrogen in N-deficient sandy soil while withstanding dry spells.' },
      { name: 'Aloe Vera & Jojoba', suitability: 'Recommended', season: 'Perennial', whyBest: 'Succulent and xerophytic physiology prevents root rot in fast-draining sandy profiles.' }
    ],
    suitableCrops: ['Pearl Millet (Bajra)', 'Sorghum (Jowar)', 'Cluster Bean (Guar)', 'Moth Bean', 'Barley', 'Mustard', 'Date Palm'],
    agronomicManagement: [
      'Implement pressurized micro-drip irrigation combined with fertigation to conserve water.',
      'Establish shelterbelts with drought-tolerant flora (Prosopis cineraria) against wind deflation.',
      'Apply biochar and bulky compost to improve moisture retention and microbial biomass.'
    ],
    geographicalDistribution: 'Western Rajasthan (Thar Desert), Rann of Kutch (Gujarat), southern fringes of Punjab and Haryana.'
  },
  {
    id: 'black',
    name: 'Black Soil',
    scientificName: 'Typic Haplusterts / Vertisols (Regur)',
    orderName: 'Vertisols',
    colorHex: '#2B2724',
    imagePath: '/src/assets/images/black_regur_soil_1794401278966.jpg',
    tagline: 'Deccan basalt clay soil characterized by deep drying fissures & high swelling',
    description: 'Dark, highly cohesive soil weathered from Deccan Trap volcanic basalt rocks. Dominated by montmorillonite/smectite expanding clays that swell substantially when wet and crack open into deep self-ploughing fissures upon drying.',
    texture: 'Dense Heavy Clay (40% - 60% clay fraction)',
    organicMatter: 'Low to Moderate (0.4% - 0.7%)',
    phRange: '7.4 - 8.6 (Mildly Alkaline)',
    waterRetention: 'Exceptionally High (Slow internal drainage)',
    nutrientProfile: {
      nitrogen: 'Deficient',
      phosphorus: 'Deficient to Low',
      potassium: 'High / Abundant',
      organicCarbon: 'Medium-low (0.5%)',
    },
    materialsPresent: [
      { name: 'Montmorillonite / Smectite Clay', category: 'Mineral', concentration: '40% - 60%', role: '2:1 expanding clay lattice giving high moisture retention and self-ploughing cracks' },
      { name: 'Titaniferous Magnetite & Iron', category: 'Compound', concentration: '6% - 10%', role: 'Imparts characteristic deep black/charcoal pigmentation from volcanic basalt' },
      { name: 'Calcium & Magnesium Carbonates', category: 'Compound', concentration: '4% - 9%', role: 'Maintains high cation exchange capacity (CEC) and alkaline buffering' },
      { name: 'Potash (K₂O) & Lime', category: 'Trace Element', concentration: 'Abundant', role: 'Fuels boll development, fiber strength, and legume pod filling' },
      { name: 'Basalt-Derived Humus Complex', category: 'Organic', concentration: '0.4% - 0.7%', role: 'Clay-humus complexes stabilize aggregates against rapid oxidation' }
    ],
    bestPlants: [
      { name: 'Cotton (Gossypium hirsutum)', suitability: 'Best Match', season: 'Kharif (Rainfed/Irrigated)', whyBest: 'Deep subsoil moisture held by smectite clay sustains long-duration boll formation; hence called Black Cotton Soil.' },
      { name: 'Soybean (Glycine max)', suitability: 'Best Match', season: 'Kharif', whyBest: 'High calcium, magnesium, and potassium levels support vigorous nodulation and oilseed yield.' },
      { name: 'Pigeon Pea (Tur / Cajanus cajan)', suitability: 'Highly Suitable', season: 'Kharif–Rabi', whyBest: 'Deep taproot penetrates cracking clay pans and fixes nitrogen in N-poor vertisols.' },
      { name: 'Chickpea (Gram) & Citrus', suitability: 'Recommended', season: 'Rabi / Perennial', whyBest: 'Utilizes residual monsoon moisture stored in heavy clay horizons without needing frequent irrigation.' }
    ],
    suitableCrops: ['Cotton (Black Cotton Soil)', 'Soybean', 'Pigeon Pea (Tur)', 'Wheat', 'Chickpea', 'Safflower', 'Citrus / Mandarin'],
    agronomicManagement: [
      'Construct Broad Bed and Furrow (BBF) systems to mitigate monsoon waterlogging.',
      'Perform subsoil chisel ripping every three seasons to break impermeable subsurface pans.',
      'Incorporate zinc sulfate and soluble phosphates during pre-sowing soil prep.'
    ],
    geographicalDistribution: 'Deccan Lava Plateau covering Maharashtra, western Madhya Pradesh, Gujarat, northern Karnataka, Telangana, and Andhra Pradesh.'
  },
  {
    id: 'laterite',
    name: 'Laterite Soil',
    scientificName: 'Plinthic Kandiustults / Oxisols & Ultisols',
    orderName: 'Oxisols / Ultisols',
    colorHex: '#9E4733',
    imagePath: '/src/assets/images/laterite_soil_1794401281246.jpg',
    tagline: 'Porous vesicular weathered tropical soil rich in iron and aluminum sesquioxides',
    description: 'Formed under intense tropical weathering with alternating high-precipitation and drought cycles. Heavy leaching (desilication) removes silica and bases, leaving a porous, gravelly clay matrix rich in iron and aluminum oxides.',
    texture: 'Gravelly Porous Sandy Clay / Loam',
    organicMatter: 'Poor (rapid bacterial decomposition)',
    phRange: '4.5 - 5.8 (Strongly Acidic)',
    waterRetention: 'Low (High macro-porosity)',
    nutrientProfile: {
      nitrogen: 'Deficient',
      phosphorus: 'Severely Fixed / Deficient',
      potassium: 'Deficient to Low',
      organicCarbon: 'Low (0.3% - 0.4%)',
    },
    materialsPresent: [
      { name: 'Iron Sesquioxide (Fe₂O₃ / Hematite)', category: 'Compound', concentration: '25% - 45%', role: 'Produces brick-red color and hardens into vesicular laterite upon exposure' },
      { name: 'Aluminum Oxide (Al₂O₃ / Gibbsite)', category: 'Compound', concentration: '20% - 35%', role: 'Drives strong soil acidity (pH < 5.5) and binds soluble phosphorus' },
      { name: 'Kaolinite Clay & Quartz Gravel', category: 'Mineral', concentration: '20% - 30%', role: 'Non-expanding 1:1 clay providing high permeability and zero waterlogging' },
      { name: 'Manganese & Titanium Traces', category: 'Trace Element', concentration: '1% - 3%', role: 'Supports enzymatic chlorophyll synthesis in acid-loving plantation flora' },
      { name: 'Depleted Tropical Humus', category: 'Organic', concentration: 'Low (0.3% - 0.4%)', role: 'Rapidly mineralized under tropical warmth; requires regular mulching' }
    ],
    bestPlants: [
      { name: 'Cashew Nut (Anacardium occidentale)', suitability: 'Best Match', season: 'Perennial', whyBest: 'Acid-tolerant hardy tree that thrives in porous, iron-rich gravelly laterite slopes without waterlogging.' },
      { name: 'Tea (Camellia sinensis)', suitability: 'Best Match', season: 'Perennial', whyBest: 'Prefers strongly acidic soil (pH 4.5–5.5) with rapid monsoon drainage and iron-rich subsoil.' },
      { name: 'Coffee & Rubber (Hevea)', suitability: 'Highly Suitable', season: 'Perennial', whyBest: 'Deep root anchorage in porous laterite hills under heavy tropical rainfall.' },
      { name: 'Tapioca (Cassava) & Black Pepper', suitability: 'Recommended', season: 'Annual / Perennial', whyBest: 'High aluminum-tolerance and strong tuber/vine performance with organic mulch.' }
    ],
    suitableCrops: ['Cashew Nut', 'Tea', 'Coffee', 'Rubber', 'Coconut', 'Areca Nut', 'Tapioca', 'Black Pepper'],
    agronomicManagement: [
      'Broadcast agricultural lime or dolomite at 1.5 - 2.5 t/ha to correct aluminum toxicity.',
      'Apply rock phosphate with mycorrhizal bio-inoculants to overcome severe P-fixation.',
      'Adopt contour stone bunds and thick grass mulching on slope profiles.'
    ],
    geographicalDistribution: 'Western Ghats crest (Kerala, Coastal Karnataka, Goa), Eastern Ghats of Odisha, Chota Nagpur plateau, and hills of Assam & Meghalaya.'
  },
  {
    id: 'mountain',
    name: 'Mountain Soil',
    scientificName: 'Humic Lithic Cryumbrepts / Inceptisols',
    orderName: 'Inceptisols / Spodosols',
    colorHex: '#3A332A',
    imagePath: '/src/assets/images/mountain_soil_1794401301569.jpg',
    tagline: 'High-altitude organic forest soil with rich humus and friable structure',
    description: 'Immature, heterogeneous soils developed in temperate and sub-alpine mountain forests. Features thick organic humus surface horizons (O-horizon) composed of decomposed needle litter and leaves, with shallow skeletal bedrock.',
    texture: 'Silty Loam to Coarse Gravelly Loam',
    organicMatter: 'Very High (1.8% - 3.5%)',
    phRange: '5.2 - 6.6 (Acidic to Moderately Acidic)',
    waterRetention: 'Moderate to High (Humus dependent)',
    nutrientProfile: {
      nitrogen: 'Adequate to Rich (Organic form)',
      phosphorus: 'Low to Medium',
      potassium: 'Medium',
      organicCarbon: 'High (> 1.2%)',
    },
    materialsPresent: [
      { name: 'Forest Humus & Leaf-Litter (O-Horizon)', category: 'Organic', concentration: '1.8% - 3.5%', role: 'Dark spongy organic matrix holding moisture, slow-release nitrogen, and mycorrhizae' },
      { name: 'Skeletal Rock & Mica/Quartz Fragments', category: 'Mineral', concentration: '25% - 40%', role: 'Ensures rapid slope drainage and prevents root hypoxia in cool climates' },
      { name: 'Organic Nitrogen Complexes', category: 'Compound', concentration: 'High', role: 'Fuels vigorous vegetative canopy growth in temperate orchards' },
      { name: 'Fulvic & Humic Acids', category: 'Organic', concentration: 'High', role: 'Chelates iron and micronutrients while imparting acidic forest pH' },
      { name: 'Silty Loam & Weathering Feldspar', category: 'Mineral', concentration: '30% - 45%', role: 'Supplies gradual potassium and magnesium weathering from bedrock' }
    ],
    bestPlants: [
      { name: 'Apple (Malus domestica)', suitability: 'Best Match', season: 'Temperate Perennial', whyBest: 'Excels in cool, humus-rich, well-drained mountain slopes with slightly acidic pH (5.5–6.5).' },
      { name: 'Saffron & Cardamom', suitability: 'Best Match', season: 'Seasonal / Perennial', whyBest: 'Requires friable organic forest loam with zero standing water and high humic acid content.' },
      { name: 'Walnut & Almond Orchards', suitability: 'Highly Suitable', season: 'Temperate Perennial', whyBest: 'Deep skeletal mineral fragments provide ideal anchorage and aeration for temperate nut trees.' },
      { name: 'Seed Potato & Temperate Tea', suitability: 'Recommended', season: 'Spring–Summer', whyBest: 'Loose organic topsoil allows clean tuber expansion and high-aroma leaf flush.' }
    ],
    suitableCrops: ['Apples', 'Walnuts', 'Almonds', 'Peaches', 'Temperate Spices (Cardamom, Saffron)', 'Potato', 'Tea'],
    agronomicManagement: [
      'Construct bench terraces across mountain contours to arrest steep slope runoff.',
      'Neutralize subsoil acidity through well-aged livestock manure and wood ash.',
      'Keep perennial groundcover crops in orchard rows to stabilize topsoil during thaw.'
    ],
    geographicalDistribution: 'Himalayan belts across Jammu & Kashmir, Ladakh, Himachal Pradesh, Uttarakhand, Sikkim, and Arunachal Pradesh.'
  },
  {
    id: 'red',
    name: 'Red Soil',
    scientificName: 'Rhodic Paleustalfs / Alfisols',
    orderName: 'Alfisols',
    colorHex: '#B85038',
    imagePath: '/src/assets/images/red_soil_field_1794401280024.jpg',
    tagline: 'Warm iron-pigmented crystalline loam with high permeability',
    description: 'Derived from ancient crystalline granites and metamorphic gneisses under warm semi-arid conditions. Prominent reddish coloration stems from the widespread diffusion of unhydrated ferric oxide (Fe2O3) compounds.',
    texture: 'Porous Sandy Loam to Clayey Loam',
    organicMatter: 'Low (0.3% - 0.5%)',
    phRange: '6.0 - 7.1 (Slightly Acidic to Neutral)',
    waterRetention: 'Low to Medium',
    nutrientProfile: {
      nitrogen: 'Deficient',
      phosphorus: 'Deficient to Medium',
      potassium: 'Moderate / Medium',
      organicCarbon: 'Low (0.4%)',
    },
    materialsPresent: [
      { name: 'Unhydrated Ferric Oxide (Fe₂O₃)', category: 'Compound', concentration: '8% - 16%', role: 'Coats mineral grains to create characteristic brick-red color and friable structure' },
      { name: 'Crystalline Quartz & Granite Sand', category: 'Mineral', concentration: '50% - 65%', role: 'Keeps soil airy, warm, and highly permeable for root pegging and tubers' },
      { name: 'Kaolinite & Illite Clay', category: 'Mineral', concentration: '15% - 25%', role: 'Provides moderate nutrient exchange without forming heavy waterlogging crusts' },
      { name: 'Potash & Trace Manganese', category: 'Trace Element', concentration: 'Medium', role: 'Supports oil synthesis in legumes and grain resilience in dryland millets' },
      { name: 'Low Humus Fraction', category: 'Organic', concentration: '0.3% - 0.5%', role: 'Requires green manure or compost supplementation to boost nitrogen retention' }
    ],
    bestPlants: [
      { name: 'Groundnut / Peanut (Arachis hypogaea)', suitability: 'Best Match', season: 'Kharif & Rabi', whyBest: 'Friable, non-crusting sandy red loam lets flower pegs easily penetrate underground for pod formation.' },
      { name: 'Finger Millet (Ragi / Eleusine coracana)', suitability: 'Best Match', season: 'Kharif', whyBest: 'Highly adapted to low-nitrogen, porous granitic red soils with intermittent rainfall.' },
      { name: 'Red Gram & Black Gram (Pulses)', suitability: 'Highly Suitable', season: 'Kharif', whyBest: 'Symbiotic Rhizobium nodules replenish deficient nitrogen while thriving in well-aerated loam.' },
      { name: 'Castor, Tobacco & Potato', suitability: 'Recommended', season: 'Rabi / Kharif', whyBest: 'Iron-rich neutral-to-slightly-acidic drainage prevents tuber rot and supports quality leaf cure.' }
    ],
    suitableCrops: ['Groundnut (Peanut)', 'Finger Millet (Ragi)', 'Pulses (Red gram, Black gram)', 'Tobacco', 'Castor', 'Potato', 'Millets'],
    agronomicManagement: [
      'Carry out deep summer ploughing to maximize absorption of early monsoon downpours.',
      'Incorporate heavy green leaf manure and nitrogen-fixing Rhizobium biofertilizers.',
      'Install drip lines for supplemental irrigation during crucial flowering stages.'
    ],
    geographicalDistribution: 'Extensive in Tamil Nadu, Karnataka, Telangana, Rayalaseema (Andhra Pradesh), southeastern Maharashtra, Odisha, and Jharkhand.'
  },
  {
    id: 'yellow',
    name: 'Yellow Soil',
    scientificName: 'Xanthic Hapludox / Ultisols & Inceptisols',
    orderName: 'Ultisols / Inceptisols',
    colorHex: '#CFA43B',
    imagePath: '/src/assets/images/yellow_soil_1794401301671.jpg',
    tagline: 'Hydrated ferric-oxide loam developed in prolonged subsoil moisture conditions',
    description: 'A hydrated facies closely associated with red soil tracts, appearing in low-lying or sub-humid zones where continuous moisture retention hydrates iron oxides into limonite and goethite, giving a distinctive yellowish-ochre appearance.',
    texture: 'Fine Silt Clay to Silty Loam',
    organicMatter: 'Low to Moderate (0.4% - 0.6%)',
    phRange: '5.5 - 6.8 (Moderately Acidic to Neutral)',
    waterRetention: 'Moderate',
    nutrientProfile: {
      nitrogen: 'Deficient',
      phosphorus: 'Low to Medium',
      potassium: 'Medium',
      organicCarbon: 'Low to Medium (0.5%)',
    },
    materialsPresent: [
      { name: 'Hydrated Iron Oxides (Goethite & Limonite)', category: 'Compound', concentration: '7% - 14%', role: 'Hydrated FeO(OH) minerals responsible for golden-ochre hue and moisture stability' },
      { name: 'Fine Silt & Weathering Mica', category: 'Mineral', concentration: '45% - 60%', role: 'Enhances water-holding capacity compared to coarse upland red soils' },
      { name: 'Kaolinitic Silty Clay', category: 'Mineral', concentration: '20% - 30%', role: 'Maintains moderate cation exchange and smooth workability during tillage' },
      { name: 'Exchangeable Potassium & Sulfur', category: 'Trace Element', concentration: 'Medium', role: 'Promotes oilseed glucosinolate formation and cereal grain weight' },
      { name: 'Sub-Humid Organic Matter', category: 'Organic', concentration: '0.4% - 0.6%', role: 'Moderate carbon pool sustained by higher valley moisture' }
    ],
    bestPlants: [
      { name: 'Lowland Rice (Paddy / Oryza sativa)', suitability: 'Best Match', season: 'Kharif', whyBest: 'Fine silty clay retains sub-humid valley moisture ideal for transplanted paddy cultivation.' },
      { name: 'Maize (Zea mays)', suitability: 'Best Match', season: 'Kharif / Rabi', whyBest: 'Moderately acidic to neutral silty loam supports rapid root expansion and balanced NPK uptake.' },
      { name: 'Mustard & Sesamum (Oilseeds)', suitability: 'Highly Suitable', season: 'Rabi / Post-Monsoon', whyBest: 'Moderate moisture retention and sulfur availability boost seed oil percentage.' },
      { name: 'Soybean & Lentils', suitability: 'Recommended', season: 'Kharif / Rabi', whyBest: 'Thrives in smooth silty loam while naturally restoring nitrogen levels.' }
    ],
    suitableCrops: ['Rice (Lowland Paddy)', 'Maize', 'Soybean', 'Mustard', 'Sesamum', 'Lentils', 'Millet'],
    agronomicManagement: [
      'Maintain adequate surface drainage to prevent excessive anaerobic waterlogging.',
      'Provide balanced NPK nutrition supplemented with sulfur and zinc.',
      'Blend vermicompost with bio-inoculants to enhance nutrient mobilization.'
    ],
    geographicalDistribution: 'Parts of Odisha, Chhattisgarh, Middle Ganga Valley, Chota Nagpur plateau margins, and Eastern Ghats foothills.'
  }
];

export const SAMPLE_SOIL_IMAGES: SampleSoilImage[] = [
  {
    id: 'sample-black',
    name: 'Black Cotton Soil (Deccan Regur)',
    soilType: 'Black Soil',
    path: '/src/assets/images/black_regur_soil_1794401278966.jpg',
    caption: 'Cracking smectite clay aggregate from Maharashtra cotton belt'
  },
  {
    id: 'sample-alluvial',
    name: 'Ganga Basin Alluvial Silt',
    soilType: 'Alluvial Soil',
    path: '/src/assets/images/alluvial_soil_1794401281254.jpg',
    caption: 'Fertile river silt loam with fine quartz and organic crumbs'
  },
  {
    id: 'sample-red',
    name: 'Granitic Red Loam',
    soilType: 'Red Soil',
    path: '/src/assets/images/red_soil_field_1794401280024.jpg',
    caption: 'Iron-rich porous loam from Telangana dryland agriculture'
  },
  {
    id: 'sample-laterite',
    name: 'Porous Vesicular Laterite',
    soilType: 'Laterite Soil',
    path: '/src/assets/images/laterite_soil_1794401281246.jpg',
    caption: 'Leached iron-sesquioxide profile from Western Ghats plantation'
  },
  {
    id: 'sample-arid',
    name: 'Thar Desert Arid Sand',
    soilType: 'Arid Soil',
    path: '/src/assets/images/arid_soil_1794401301505.jpg',
    caption: 'Coarse saline-prone sand with low organic carbon and moisture'
  },
  {
    id: 'sample-mountain',
    name: 'Himalayan Organic Humus',
    soilType: 'Mountain Soil',
    path: '/src/assets/images/mountain_soil_1794401301569.jpg',
    caption: 'High-altitude organic woodland soil with decomposed leaf litter'
  },
  {
    id: 'sample-yellow',
    name: 'Hydrated Ferric Yellow Loam',
    soilType: 'Yellow Soil',
    path: '/src/assets/images/yellow_soil_1794401301671.jpg',
    caption: 'Ochre hydrated ferric-oxide subsoil from Eastern Ghats foothills'
  }
];
