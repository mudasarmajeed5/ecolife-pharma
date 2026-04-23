export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  benefits: string[];
  composition: string[];
  description: string;
  form: string;
  image : string;
  indications: string[];
  usage?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Arq E Ghulab",
    category: "Eye Care",
    price: 125, // Updated: matched to "Arq-e-Gulab Spray" S.No 8, MRP 125
    image: "/products/arq e ghulab.jpeg",
    description:
      "Comprehensive herbal eye care solution for vision enhancement and eye health maintenance",
    form: "Herbal remedy",
    benefits: [
      "Hyperopia (far-sightedness)",
      "Myopia (near-sightedness)",
      "Astigmatism",
      "Presbyopia (age-related vision issues)",
      "Cataract prevention",
      "Diabetic retinopathy support",
      "Macular degeneration prevention",
      "Eye strain and fatigue relief",
      "Better night vision",
    ],
    composition: [
      "Earl Ghazalaun (APL)",
      "Amlaki (APL)",
      "Arjuna (APL)",
      "Brahmi (APL)",
    ],
    indications: [
      "All eye-related problems",
      "Vision enhancement",
      "Eye health maintenance",
    ],
    usage: "Take as directed for comprehensive eye care",
  },
  {
    id: "3",
    name: "Herimor Powder",
    category: "Nutritional",
    price: 400, // Updated: matched to "Eco's Herimore (Moringa Powder) Jar" S.No 10, MRP 400
    image: "/products/herimor powder.jpeg",
    description:
      "Multivitamin and mineral supplement in capsule form for vital health maintenance",
    form: "Capsule",
    benefits: [
      "Comprehensive nutritional support",
      "Vitamin supplementation",
      "Mineral supplementation",
      "Vital health maintenance",
      "Body system support",
    ],
    composition: [
      "Camphora",
      "Celandolo Oil (USP)",
      "Undecanoic Acid",
      "Thymol",
    ],
    indications: ["Nutritional gaps", "Health maintenance", "Wellness support"],
  },
  {
    id: "4",
    name: "Safa Gel",
    category: "Pain Relief",
    price: 140, // Updated: matched to "Safa gel Tube" S.No 48, MRP 140
    image: "/products/safa gel.jpeg",
    description:
      "Natural pain relief and wellness gel with anti-inflammatory properties",
    form: "Gel (Spray and Cream variants available)",
    benefits: [
      "General pain relief",
      "Anti-inflammatory action",
      "Muscle relaxation",
      "Joint support",
      "Wellness promotion",
      "Natural pain management",
    ],
    composition: [
      "Cardamom (API)",
      "Papaya Seed",
      "Olive Oil (USP)",
      "Cinnamon Oil (USP)",
    ],
    indications: ["Pain relief", "Muscle and joint support", "Wellness"],
    usage: "Apply externally as directed for pain relief",
  },
  {
    id: "5",
    name: "Safoof e Thandak",
    category: "Blood Purification",
    price: 250, // Updated: matched to "Safoof-e-Thandak" S.No 19, MRP 250
    image: "/products/safoof e thandak.jpeg",
    description:
      "Traditional blood purification and detoxification syrup for skin health and wellness",
    form: "Syrup",
    benefits: [
      "Blood purification",
      "Detoxification",
      "Skin health improvement",
      "General wellness",
      "Immune system support",
      "Cleansing and detoxification",
      "Blood health improvement",
      "Skin clarity enhancement",
    ],
    composition: [
      "Tamarisk/Reedhar",
      "Sarsaparilla/THINDAK",
      "Detoxifying ingredients",
      "Neem",
    ],
    indications: [
      "Blood purification",
      "Detoxification",
      "Skin health",
      "General wellness",
      "Immune support",
    ],
  },
  {
    id: "6",
    name: "Thundai Syrup",
    category: "Cold & Cough",
    price: 230, // Updated: matched to "Sharbat Thundani" S.No 22, MRP 230
    image: "/products/thundai syrup.jpeg",
    description:
      "Herbal remedy for cough and cold relief with throat soothing properties",
    form: "Herbal remedy/Tea formulation",
    benefits: [
      "Common cold relief",
      "Cough relief (dry and productive)",
      "Fever relief",
      "Throat congestion relief",
      "Respiratory support",
      "Immune system boost",
      "Natural fever management",
    ],
    composition: [
      "Thymol",
      "Girasol (Sunflower)",
      "Cardamom",
      "Fenugreek",
      "Ginger",
      "Cinnamon",
      "Clove",
    ],
    indications: [
      "Common cold",
      "Cough",
      "Fever",
      "Throat congestion",
      "Respiratory support",
    ],
    usage: "Prepare as tea or use as directed for cold and cough relief",
  },
  {
    id: "7",
    name: "Krack Cream",
    category: "Skin Care",
    price: 150, // Updated: matched to "Krack Cream" S.No 47, MRP 150
    image: "/products/krack cream.jpeg",
    description:
      "Specialized skin healing cream for cracked skin and fissure treatment",
    form: "Cream (2 variants)",
    benefits: [
      "Cracked skin healing (hands/feet)",
      "Skin restoration",
      "Deep moisturization",
      "Fissure treatment",
      "Skin nourishment",
      "Safe for sensitive skin",
    ],
    composition: [
      "Mixed aromatic compounds",
      "Healing oils",
      "Natural moisturizers",
    ],
    indications: [
      "Cracked skin",
      "Skin healing",
      "Moisturization",
      "Fissure treatment",
    ],
    usage: "Apply to affected areas as needed for healing",
  },
  {
    id: "8",
    name: "Plyox Piles Reliver",
    category: "Digestive",
    price: 300, // Updated: matched to "Pylox Capsules 30's" S.No 32, MRP 300
    image: "/products/plyox.jpeg",
    description:
      "Digestive health and nutritional support capsule for energy restoration",
    form: "Capsule (10, 20, 30 capsules per pack)",
    benefits: [
      "Digestive health support",
      "Natural energy boost",
      "Body revitalization",
      "Appetite enhancement",
      "Nutritional support",
    ],
    composition: [
      "Hexamine bodies (API)",
      "Natural plant extracts",
      "Honey base",
    ],
    indications: [
      "Digestive health",
      "Energy restoration",
      "General wellness",
      "Nutritional gaps",
      "Appetite enhancement",
    ],
    usage: "Take as directed for digestive and nutritional support",
  },
  {
    id: "9",
    name: "Morgina",
    category: "Skin Care",
    price: 379, // UNCHANGED: no confident match found in price list
    image: "/products/morgina.jpeg",
    description:
      "Joint and skin care cream for pain relief and crack healing with anti-inflammatory properties",
    form: "Cream",
    benefits: [
      "Joint pain relief",
      "Crack healing",
      "Skin conditioning",
      "Anti-inflammatory action",
      "Cracks and fissures healing",
      "Joint support",
      "Topical pain relief",
      "Skin nourishment",
    ],
    composition: [
      "Mixed aromatic oils",
      "Healing compounds",
      "Natural moisturizers",
    ],
    indications: [
      "Joint pain",
      "Cracked skin",
      "Skin healing",
      "Anti-inflammatory support",
    ],
    usage: "Apply topically as directed for pain relief and healing",
  },
  {
    id: "10",
    name: "Ecofer Syrup",
    category: "Nutritional",
    price: 230, // Updated: matched to "Ecofer syp" S.No 42, MRP 230
    image: "/products/ecofer syrup.jpeg",
    description:
      "Health supplement in oil and syrup formulation for enhanced nutritional support",
    form: "Oil/Syrup formulation",
    benefits: [
      "Nutritional enhancement",
      "Health maintenance",
      "Body system support",
      "Wellness promotion",
    ],
    composition: [
      "Herbal extract blend",
      "Natural oils",
      "Nutritive ingredients",
    ],
    indications: ["Nutritional gaps", "Health maintenance", "General wellness"],
  },
  {
    id: "11",
    name: "Arq e Ghulab",
    category: "Nutritional",
    price: 499, // UNCHANGED: could not confidently distinguish from id "1" in price list
    image: "/products/arq e ghulab syrup.jpeg",
    description:
      "Herbal nutritional support supplement for energy and health maintenance",
    form: "Herbal supplement",
    benefits: [
      "Nutritional supplementation",
      "Energy support",
      "General health maintenance",
      "Body wellness",
    ],
    composition: [
      "Herbal extract blend",
      "Nutritive ingredients",
      "Natural herbs",
    ],
    indications: [
      "Nutritional gaps",
      "Energy restoration",
      "Health maintenance",
    ],
  },
  {
    id: "12",
    name: "Hazmoo Kalwanji",
    category: "Nutritional",
    price: 349, // UNCHANGED: no confident match found in price list
    image: "/products/hazmoo.jpeg",
    description:
      "Natural herbal nutritional supplement for overall wellness and health support",
    form: "Tablet formulation",
    benefits: [
      "Nutritional support",
      "General wellness",
      "Herbal health benefits",
      "Body revitalization",
    ],
    composition: [
      "Natural herbal extract",
      "Nutritive elements",
      "Plant-based ingredients",
    ],
    indications: [
      "Nutritional supplement",
      "General wellness",
      "Health maintenance",
    ],
    usage: "Take as directed for nutritional support",
  },
  {
    id: "13",
    name: "White Rose Syrup",
    category: "Beverages",
    price: 370, // Updated: matched to "White Rose syp (Homeo)" S.No 25, MRP 370
    image: "/products/white rose syrup.jpeg",
    description:
      "Refreshing herbal syrup beverage with natural flavoring for thirst quenching and wellness",
    form: "Syrup/Drink concentrate",
    benefits: [
      "Thirst quenching",
      "Natural ingredients",
      "Pleasant taste",
      "Refreshment beverage",
      "Natural drink alternative",
    ],
    composition: ["Natural flavoring", "Herbal extracts", "Sugar content"],
    indications: ["Refreshment", "Natural beverage", "Wellness drink"],
    usage: "Mix with water as directed for refreshing beverage",
  },
  {
    id: "14",
    name: "Plyox (capsules)",
    category: "Nutritional",
    price: 280, // Updated: matched to "Pylox Capsules 20's" S.No 31, MRP 280
    image: "/products/plyox capsules.jpeg",
    description:
      "Encapsulated herbal blend for general wellness and therapeutic herbal therapy support",
    form: "Capsule (20 capsules per pack)",
    benefits: [
      "General wellness support",
      "Herbal therapy support",
      "Body system support",
      "Natural health enhancement",
    ],
    composition: [
      "Encapsulated herbal blend",
      "Therapeutic herbs",
      "Natural plant extracts",
    ],
    indications: ["General wellness", "Herbal therapy", "Health maintenance"],
    usage: "Take as directed for wellness support",
  },
  {
    id: "15",
    name: "Podeena Sharbat",
    category: "Nutritional",
    price: 369, // UNCHANGED: could not confidently match to a specific Podeena variant
    image: "/products/podeena.jpeg",
    description:
      "Licorice-based herbal wellness product with traditional remedy benefits for health maintenance",
    form: "Herbal formulation",
    benefits: [
      "Herbal wellness support",
      "Traditional remedy benefits",
      "Health maintenance",
      "Body system support",
    ],
    composition: [
      "Licorice-based formulation",
      "Natural herbal extract",
      "Plant-based ingredients",
    ],
    indications: ["Wellness support", "Health maintenance", "General wellness"],
  },
  {
    id: "16",
    name: "Respolite Syrup",
    category: "Nutritional",
    price: 230, // Updated: matched to "Respolite Syp" S.No 46, MRP 230
    image: "/products/repsolite syrup.jpeg",
    description:
      "Traditional herbal preparation tablet for natural health supplementation and wellness",
    form: "Tablet formulation",
    benefits: [
      "Natural health supplement",
      "Traditional herbal benefits",
      "General wellness support",
      "Body system support",
    ],
    composition: [
      "Traditional herbal blend",
      "Nutritive elements",
      "Plant-based ingredients",
    ],
    indications: [
      "Health supplementation",
      "General wellness",
      "Health maintenance",
    ],
    usage: "Take as directed for health supplementation",
  },
];