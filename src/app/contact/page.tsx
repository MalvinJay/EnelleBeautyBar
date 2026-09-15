export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 py-20 px-4">
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 mb-4">
            Contact Us
          </h1>
          <p className="text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Book an appointment or ask us a question. We&apos;ll get back to you within 24 hours.
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-6">Location</h2>
            <address className="text-zinc-600 space-y-4">
              <p>
                <strong>Enelle Beauty Bar</strong><br />
                123 Beauty Lane<br />
                City, State 12345
              </p>
              <p>Phone: <a href="tel:+1234567890" className="underline text-zinc-900">(234) 567-8901</a></p>
              <p>Email: <a href="mailto:info@enellebeautybar.com" className="underline text-zinc-900">info@enellebeautybar.com</a></p>
            </address>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-6">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-zinc-600 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full rounded border px-3 py-2 text-zinc-900 dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
                  required
                />
              </div>
              <div>
                <label className="block text-zinc-600 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full rounded border px-3 py-2 text-zinc-900 dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
                  required
                />
              </div>
              <div>
                <label className="block text-zinc-600 mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full rounded border px-3 py-2 text-zinc-900 dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-zinc-900 text-white font-medium py-3 px-6 hover:bg-zinc-800 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

        <div className="mt-20 pt-16 border-t border-zinc-200 text-center text-zinc-500">
          <p>
            Office hours: Monday - Saturday 9:00 AM - 7:00 PM<br />Closed Sunday
          </p>
        </div>
      </div>
    </div>
  );
}