// app/mebman/page.js
export const metadata = {
  title: 'Welcome to mebman',
  description: 'mebman shop homepage',
}

export default function HomePage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to mebman</h1>
      <p className="text-lg text-gray-700">Discover our products</p>
    </section>
  )
}