export default function Services() {
  return (
    <div className="min-h-screen py-20 px-4 bg-white dark:bg-zinc-900">
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
            Our Services
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            We offer a comprehensive range of beauty treatments designed to enhance your natural beauty. Each service is tailored to your unique needs.
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <article className="group border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-zinc-800">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">Facial Treatments</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Customized facials for all skin types, including deep cleansing, exfoliation, and hydration therapies.
            </p>
          </article>

          <article className="group border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-zinc-800">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">Massage Therapy</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Relaxing and therapeutic massage treatments to melt away stress and tension.
            </p>
          </article>

          <article className="group border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-zinc-800">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">Body Treatments</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Revitalizing body wraps, scrubs, and contouring treatments for glowing skin.
            </p>
          </article>

          <article className="group border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-zinc-800">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">Waxing</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Professional waxing services for smooth, hair-free skin using gentle, effective methods.
            </p>
          </article>

          <article className="group border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-zinc-800">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">Lash & Brow</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Enhance your eyes with lash lifts, tints, and brow shaping for a polished look.
            </p>
          </article>

          <article className="group border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-zinc-800">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">Makeup Application</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Professional makeup application for special occasions or everyday elegance.
            </p>
          </article>
        </section>
      </div>
    </div>
  );
}