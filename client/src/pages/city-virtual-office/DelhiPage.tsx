import CityVirtualOfficeBase from "./CityVirtualOfficeBase";
import { cities } from "./cityConfig";

export default function DelhiVirtualOfficePage() {
  return <CityVirtualOfficeBase city={cities.delhi} />;
}
