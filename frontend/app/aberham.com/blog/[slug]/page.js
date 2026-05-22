// app/aberham.com/post/[id]/page.js
export const metadata = {
  title: 'post | aberham.com',
}

export default function PostPage({ params }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">aberham.com post</h1>
      <p className="text-lg">ID: {params.id}</p>
    </section>
  )
}