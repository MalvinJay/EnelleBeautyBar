export default function Products() {
  const products = [
    {
      id: 1,
      name: "HydraFacial Deluxe",
      price: "$125",
      description: "Complete hydration and rejuvenation treatment",
    },
    {
      id: 2,
      name: "Relaxation Massage",
      price: "$95",
      description: "60-minute full-body massage",
    },
    {
      id: 3,
      name: "Glow Facial",
      price: "$85",
      description: "Brightening treatment for radiant skin",
    },
    {
      id: 4,
      name: "Lash Lift & Tint",
      price: "$75",
      description: "Lash lift and brow tint combo",
    },
  ];

  return (
    <div className="py-20 px-4 bg-white dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
            Products & Treatments
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Discover our curated selection of premium treatments and products designed for beautiful results.
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <article
              key={product.id}
              className="border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-zinc-800"
            >
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                {product.name}
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">
                {product.description}
              </p>
              <p className="text-zinc-800 dark:text-zinc-200 font-medium">
                {product.price}
              </p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}