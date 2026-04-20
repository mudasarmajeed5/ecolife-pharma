interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-4 py-2 rounded-full font-semibold transition whitespace-nowrap ${
            selected === category
              ? "bg-green-600 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:border-green-600"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
