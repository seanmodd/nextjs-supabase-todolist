function ProductGrid() {
  const products = [
    {
      id: 1,
      name: 'Nomad Pouch',
      href: '#',
      price: '$50',
      availability: 'White and Black',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/category-page-07-product-01.jpg',
      imageAlt:
        'White fabric pouch with white zipper, black zipper pull, and black elastic loop.',
    },
    {
      id: 2,
      name: 'Zip Tote Basket',
      href: '#',
      price: '$140',
      availability: 'Washed Black',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/category-page-07-product-02.jpg',
      imageAlt:
        'Front of tote bag with washed black canvas body, black straps, and tan leather handles and accents.',
    },
    // More products...
  ];
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:col-span-3 lg:gap-x-8">
      {products.map((product) => (
        <a key={product.id} href={product.href} className="text-sm group">
          <div className="w-full overflow-hidden bg-gray-100 rounded-lg aspect-w-1 aspect-h-1 group-hover:opacity-75">
            <img
              src={product.imageSrc}
              alt={product.imageAlt}
              className="object-cover object-center w-full h-full"
            />
          </div>
          <h3 className="mt-4 font-medium text-gray-900">{product.name}</h3>
          <p className="italic text-gray-500">{product.availability}</p>
          <p className="mt-2 font-medium text-gray-900">{product.price}</p>
        </a>
      ))}
    </div>
  );
}

export default ProductGrid;
