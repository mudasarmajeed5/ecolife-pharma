export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  benefits: string[];
  composition: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'EOCULIFE',
    category: 'Eye Care',
    price: 899,
    image: '👁️',
    benefits: ['Hyperopia', 'Myopia', 'Astigmatism', 'Cataract Prevention'],
    composition: ['Earl Ghazalaun', 'Amlaki', 'Arjuna', 'Brahmi'],
  },
  {
    id: '2',
    name: 'HERBAL POWER TABLET',
    category: 'Nutritional',
    price: 599,
    image: '💪',
    benefits: ['Energy Booster', 'Immune Support', 'Antioxidant'],
    composition: ['Zinc Gluconate', 'Turmeric', 'Vitamin C', 'Biotin'],
  },
  {
    id: '3',
    name: 'ECO VITAL KS',
    category: 'Nutritional',
    price: 749,
    image: '🧪',
    benefits: ['Vitamin Support', 'Mineral Supplement', 'Body System Support'],
    composition: ['Camphora', 'Celandolo Oil', 'Thymol'],
  },
  {
    id: '4',
    name: 'SAFAAGEL',
    category: 'Pain Relief',
    price: 499,
    image: '🧴',
    benefits: ['Pain Relief', 'Anti-inflammatory', 'Muscle Relaxation'],
    composition: ['Cardamom', 'Papaya Seed', 'Olive Oil', 'Cinnamon Oil'],
  },
  {
    id: '5',
    name: 'SAFIHOOD TAANDARK',
    category: 'Blood Purification',
    price: 349,
    image: '🩸',
    benefits: ['Blood Purification', 'Detoxification', 'Skin Health'],
    composition: ['Tamarisk', 'Sarsaparilla', 'Neem'],
  },
  {
    id: '6',
    name: 'JOSHANDA',
    category: 'Cold & Cough',
    price: 299,
    image: '🍵',
    benefits: ['Cough Relief', 'Fever Reduction', 'Throat Soothing'],
    composition: ['Thymol', 'Cardamom', 'Ginger', 'Cinnamon'],
  },
  {
    id: '7',
    name: 'KRACK CREAM',
    category: 'Skin Care',
    price: 399,
    image: '🧴',
    benefits: ['Crack Healing', 'Moisturization', 'Skin Restoration'],
    composition: ['Aromatic Oils', 'Natural Moisturizers'],
  },
  {
    id: '8',
    name: 'PIYOX',
    category: 'Digestive',
    price: 449,
    image: '🌿',
    benefits: ['Digestive Health', 'Energy Boost', 'Appetite Enhancement'],
    composition: ['Natural Plant Extracts', 'Honey Base'],
  },
];
