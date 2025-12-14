import CityVirtualOfficeBase from "./CityVirtualOfficeBase";
import { cities } from "./cityConfig";

export default function MumbaiVirtualOfficePage() {
  return <CityVirtualOfficeBase city={cities.mumbai} />;
}
