'use client'

interface ContentPiece {
  id: string
  created: string
  status: string
  facebook: { text: string; hashtags: string[]; published?: boolean; post_url?: string }
  threads: { text: string; hashtags: string[]; published?: boolean; post_url?: string }
  blog: { title: string; meta_description: string; content: string; published?: boolean; slug?: string }
}

interface ContentCardProps {
  content: ContentPiece
  onPublish: (id: string, platform: string) => void
}

export default function ContentCard({ content, onPublish }: ContentCardProps) {
  return (
    <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_#000]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">{content.blog?.title || 'Untitled'}</h3>
        <span className="text-xs bg-neo-yellow px-2 py-1 border-2 border-black font-mono">
          {content.status}
        </span>
      </div>

      <div className="space-y-4 text-sm">
        {/* Facebook */}
        <div className="p-3 border-2 border-black bg-blue-50">
          <div className="flex items-center justify-between mb-2">
            <strong className="text-blue-600">Facebook</strong>
            {content.facebook?.published ? (
              <span className="text-green-600 text-xs font-bold">✓ Published</span>
            ) : (
              <button
                onClick={() => onPublish(content.id, 'facebook')}
                className="bg-blue-500 text-white px-3 py-1 text-xs border-2 border-black font-bold hover:bg-blue-600"
              >
                Post FB
              </button>
            )}
          </div>
          <p className="text-gray-700 line-clamp-3">{content.facebook?.text}</p>
          {content.facebook?.hashtags && (
            <p className="text-blue-400 text-xs mt-1">{content.facebook.hashtags.join(' ')}</p>
          )}
        </div>

        {/* Threads */}
        <div className="p-3 border-2 border-black bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <strong>Threads</strong>
            {content.threads?.published ? (
              <span className="text-green-600 text-xs font-bold">✓ Published</span>
            ) : (
              <button
                onClick={() => onPublish(content.id, 'threads')}
                className="bg-black text-white px-3 py-1 text-xs border-2 border-black font-bold hover:bg-gray-800"
              >
                Post Threads
              </button>
            )}
          </div>
          <p className="text-gray-700 line-clamp-3">{content.threads?.text}</p>
        </div>

        {/* Blog */}
        <div className="p-3 border-2 border-black bg-green-50">
          <div className="flex items-center justify-between mb-2">
            <strong className="text-green-700">Blog</strong>
            {content.blog?.published ? (
              <span className="text-green-600 text-xs font-bold">✓ Published</span>
            ) : (
              <button
                onClick={() => onPublish(content.id, 'blog')}
                className="bg-neo-green text-black px-3 py-1 text-xs border-2 border-black font-bold hover:opacity-80"
              >
                Publish Blog
              </button>
            )}
          </div>
          <p className="text-gray-700">{content.blog?.meta_description}</p>
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-400 font-mono">
        {new Date(content.created).toLocaleString('th-TH')}
      </div>
    </div>
  )
}
