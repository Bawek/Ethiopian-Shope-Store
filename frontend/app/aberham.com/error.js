// app/aberham.com/error.js
'use client'

export default function Error({ error, reset }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">aberham.com Error</h2>
      <p className="text-gray-700 mb-6">{error.message}</p>
      <button 
        onClick={() => reset()}
        className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  )
}