import VehicleGrid from 'src/components/vehicles/VehicleGrid';
import VehicleHeader from './header/_VehicleHeader';

function Sort() {
  return (
    <>
  
        <VehicleHeader />

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
