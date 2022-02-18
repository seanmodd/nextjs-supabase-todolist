import VehicleFeatures from './VehicleFeatures';
import VehicleGalleryAndDetails from './VehicleGalleryAndDetails';
import VehicleGrid from './VehicleGrid';

function Vehicle() {
  return (
    <>
      <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
        <PageHeader />
        <div className="flex items-center" />
      </div>
      <section aria-labelledby="vehicles-heading" className="pt-6 pb-24">
        <h2 id="vehicles-heading" className="sr-only">
          Vehicle Details
        </h2>
        {/* <VehicleGrid /> */}
        <VehicleGalleryAndDetails />
        <VehicleFeatures />
      </section>
    </>
  );
}

export default Vehicle;

function PageHeader() {
  return (
    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
      Vehicles Details
    </h1>
  );
}
