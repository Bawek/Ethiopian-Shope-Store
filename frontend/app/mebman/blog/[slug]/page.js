// app/mebman/post/[id]/page.js
export const metadata = {
  title: 'post | mebman',
}

export default function PostPage({ params }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">mebman post</h1>
      <p className="text-lg">ID: {params.id}</p>
    </section>
  )
}