// app/aberham.com/blog/page.js
export const metadata = {
  title: 'blog | aberham.com',
}

export default function BlogPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">aberham.com blog</h1>
      <div className="prose prose-lg">
        {/* blog page content */}
      </div>
    </section>
  )
}