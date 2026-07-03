import {
  BadgeCheck,
  BedDouble,
  CarFront,
  Compass,
  HeartHandshake,
  Landmark,
  Map,
  Route,
  Stamp,
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
