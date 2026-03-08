"use client";

import {
  Rocket,
  Truck,
  ShoppingCart,
  CreditCard,
  Ban,
  Headphones,
  Info,
  Shield,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  rocket: Rocket,
  truck: Truck,
  cart: ShoppingCart,
  payments: CreditCard,
  block: Ban,
  headset: Headphones,
  info: Info,
  shield: Shield,
};

interface CategoryIconProps {
  icon?: string | null;
  className?: string;
}

export function CategoryIcon({ icon, className }: CategoryIconProps) {
  const Icon = (icon && iconMap[icon]) ? iconMap[icon] : HelpCircle;
  return <Icon className={cn("h-6 w-6", className)} />;
}
