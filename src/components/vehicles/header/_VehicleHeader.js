import VehicleFilter from 'src/components/vehicles/header/VehicleFilter';
import VehicleSort from 'src/components/vehicles/header/VehicleSort';
import SearchBar from 'src/components/SearchBar';

function VehicleHeader() {
  return (
    <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
      <div className="flex justify-between ">
        <PageHeader />
        <SearchBar />
      </div>
      <div className="flex items-center">
        <VehicleSort />
        <VehicleFilter />
      </div>
    </div>
  );
}

export default VehicleHeader;

function PageHeader() {
  return (
    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
      Vehicles
    </h1>
  );
}
