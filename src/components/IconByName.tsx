import {
  Award,
  Backpack,
  BadgeCheck,
  BedDouble,
  Briefcase,
  CarFront,
  Compass,
  Crown,
  Factory,
  Handshake,
  Headphones,
  HeartHandshake,
  Landmark,
  Map,
  MapPin,
  Route,
  ShieldCheck,
  Stamp,
  Tent,
  Trophy,
  UserCheck,
  Utensils,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  landmark: Landmark,
  "heart-handshake": HeartHandshake,
  route: Route,
  "badge-check": BadgeCheck,
  stamp: Stamp,
  "car-front": CarFront,
  compass: Compass,
  "bed-double": BedDouble,
  map: Map,
  utensils: Utensils,
  backpack: Backpack,
  factory: Factory,
  tent: Tent,
  crown: Crown,
  briefcase: Briefcase,
  "user-check": UserCheck,
  handshake: Handshake,
  headphones: Headphones,
  award: Award,
  "shield-check": ShieldCheck,
  trophy: Trophy,
  "map-pin": MapPin,
};

export default function IconByName({ name }: { name: string }) {
  const Icon = ICONS[name];
  if (!Icon) return null;
  return (
    <span className="lic">
      <Icon />
    </span>
  );
}
