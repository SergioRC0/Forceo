// components/Post/PostCard.jsx
import PostActions from './PostActions';

export default function PostCard({ post, currentUserId }) {
  return (
    <li className="bg-white rounded-2xl shadow-md flex flex-col overflow-hidden transform hover:scale-105 hover:shadow-2xl transition duration-300">
      <div className="p-6 flex flex-col flex-grow space-y-4">
        {/* Cabecera */}
        <div className="flex justify-between items-center">
          <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold uppercase rounded-full">
            {post.category.toLowerCase()}
          </span>
          <time className="text-xs text-gray-500">
            {new Date(post.created_at).toLocaleDateString()}
          </time>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2 ">
          <span className="user-style">{post.user?.username}</span>{' '}
          <p className=" break-words line-clamp-1">{post.title}</p>
        </h2>
        <p className="text-gray-600 flex-grow break-words line-clamp-1 ">{post.content}</p>
        <PostActions post={post} currentUserId={currentUserId} />
      </div>
    </li>
  );
}
