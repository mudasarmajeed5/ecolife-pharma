import {
  Eye,
  Zap,
  Beaker,
  Droplet,
  Wind,
  Leaf,
  ShoppingCart,
  Check,
  Home,
} from "lucide-react";

export function getIcon(iconName: string, size: number = 24) {
  const icons: { [key: string]: JSX.Element } = {
    Eye: <Eye size={size} />,
    Zap: <Zap size={size} />,
    Beaker: <Beaker size={size} />,
    Droplet: <Droplet size={size} />,
    Wind: <Wind size={size} />,
    Leaf: <Leaf size={size} />,
    ShoppingCart: <ShoppingCart size={size} />,
    Check: <Check size={size} />,
    Home: <Home size={size} />,
  };

  return icons[iconName] || <Leaf size={size} />;
}
