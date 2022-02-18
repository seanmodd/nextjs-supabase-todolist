import VehicleFilter from './VehicleFilter';
import VehicleSort from './VehicleSort';
import VehicleGrid from './VehicleGrid';

function Sort() {
  return (
    <>
      <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
        <PageHeader />
        <div className="flex items-center">
          <VehicleSort />

          <VehicleFilter />
        </div>
      </div>
      <section aria-labelledby="vehicles-heading" className="pt-6 pb-24">
        <h2 id="vehicles-heading" className="sr-only">
          Vehicless
        </h2>
        <VehicleGrid />
      </section>
    </>
  );
}

export default Sort;

function PageHeader() {
  return (
    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
      Vehicles
    </h1>
  );
}
