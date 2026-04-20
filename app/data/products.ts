export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  icon: string;
  benefits: string[];
  composition: string[];
  description: string;
  form: string;
  image?: string,
  indications: string[];
  usage?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "EOCULIFE",
    category: "Eye Care",
    price: 899,
    icon: "Eye",
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
    id: "2",
    name: "HERBAL POWER TABLET",
    category: "Nutritional",
    price: 599,
    icon: "Zap",
    description:
      "Advanced herbal nutritional supplement with vitamins and minerals for overall wellness",
    form: "Tablet (20 tablets per pack)",
    benefits: [
      "Energy booster",
      "Immune system support",
      "Antioxidant protection",
      "Nutritional supplementation",
      "General wellness enhancement",
    ],
    composition: [
      "Zinc Gluconate (API): 5mg",
      "Curcuma longa (Turmeric): 50mg",
      "Beta Carotene (API): 0.5mg",
      "Vitamin E: 0.8mg",
      "Vitamin C: 40mg",
      "Biotin: 37.5mg",
      "Folic Acid: 88mg",
      "Calcium Pantothenate: 12mg",
      "Magnesium Citrate: 37.5mg",
    ],
    indications: [
      "Daily nutritional support",
      "Energy enhancement",
      "Immune boost",
    ],
  },
  {
    id: "3",
    name: "ECO VITAL KS",
    category: "Nutritional",
    price: 749,
    icon: "Beaker",
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
    name: "SAFAAGEL",
    category: "Pain Relief",
    price: 499,
    icon: "Droplet",
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
    name: "SAFIHOOD TAANDARK",
    category: "Blood Purification",
    price: 349,
    icon: "Droplet",
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
    name: "JOSHANDA",
    category: "Cold & Cough",
    price: 299,
    icon: "Wind",
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
    name: "KRACK CREAM",
    category: "Skin Care",
    price: 399,
    icon: "Droplet",
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
    name: "PIYOX",
    category: "Digestive",
    price: 449,
    icon: "Leaf",
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
];
