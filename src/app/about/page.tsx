export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 py-20 px-4">
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 mb-4">
            About Enelle Beauty Bar
          </h1>
          <p className="text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            We are dedicated to enhancing natural beauty through personalized care and premium treatments. Located in the heart of the city, our salon combines luxury with expertise.
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-6">Our Mission</h2>
            <p className="text-zinc-600 leading-relaxed">
              At Enelle Beauty Bar, our mission is to provide a sanctuary where clients can relax, rejuvenate, and feel their best. We believe beauty comes from confidence and self-care.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-6">Our Team</h2>
            <p className="text-zinc-600 leading-relaxed">
              Our licensed estheticians bring years of experience and continuous training to every service. We stay current with the latest techniques and trends in the beauty industry.
            </p>
          </div>
        </section>

        <section className="mt-20 pt-16 border-t border-zinc-200">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-6">Our Values</h2>
          <ul className="grid grid-cols-2 gap-4 text-zinc-600">
            <li>Personalized consultations</li>
            <li>Premium quality products</li>
            <li>Relaxing, luxurious environment</li>
            <li>Skin health over trends</li>
          </ul>
        </section>
      </div>
    </div>
  );
}