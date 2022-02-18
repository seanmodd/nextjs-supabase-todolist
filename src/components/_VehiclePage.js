/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import AppLayout from 'src/components/layout/_AppLayout';
import Vehicle from './vehicle/_Vehicle';

export default function VehicleInventory() {
  return (
    <div className="bg-white">
      <div>
        <AppLayout>
          <Vehicle />
        </AppLayout>
      </div>
    </div>
  );
}
