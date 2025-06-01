'use client';
import { useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import DeletePost from '../buttons/DeletePost';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LikeButton from '../buttons/LikeButton';
import PostEditButton from '../buttons/PostEditButton';
import EditPostForm from '../forms/EditPostForm';
import ExpandableText from '../ui/ExpandableText';

export default function UserPosts({ posts, currentUser }) {
  // 1 Estado local de posts
  const [userPosts, setUserPosts] = useState(posts);
  const [postToEdit, setPostToEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  // 2 Callback que pasamos al DeletePost
  const handleDelete = postId => {
    // Eliminamos de forma optimista la publicación con dicho ID
    setUserPosts(prev => prev.filter(post => post.id !== postId));
    router.refresh();
  };
  const handleUpdate = updatedPost => {
    setUserPosts(prev => prev.map(p => (p.id === updatedPost.id ? updatedPost : p)));
  };

  return (
    <main className="max-w-3xl mx-auto ">
      <h2 className="text-3xl font-extrabold text-center mb-6">Tus publicaciones</h2>
      {userPosts.length > 0 ? (
        <ul className="space-y-6 mb-6 m-1 animate-fade-in">
          {userPosts.map(post => (
            <li
              key={post.id}
              className="
                bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50
                border-l-4 border-indigo-500
                rounded-xl shadow-lg
                transform hover:scale-105 hover:shadow-2xl
                transition-all duration-300
                overflow-hidden relative z-0
              "
            >
              <div className="p-6 flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-xs font-semibold uppercase rounded-full">
                    {post.category.toLowerCase()}
                  </span>
                  <div className="flex items-center gap-2">
                    {post.updated_at && post.updated_at !== post.created_at && (
                      <span className="text-sm italic text-gray-500">[editado]</span>
                    )}
                    <time className="text-xs text-gray-600">
                      {new Date(post.created_at).toLocaleDateString()}
                    </time>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 line-clamp-2 flex items-center gap-2">
                  {post.title}
                </h3>
                <div className="m-2">
                  <ExpandableText text={post.content} />
                </div>
                <div className="flex justify-between items-center text-black">
                  {/*  Tres iconos a la izquierda */}
                  <div className="flex items-center space-x-6">
                    <LikeButton
                      itemId={post.id}
                      type="post"
                      isLiked={post.post_likes?.some(like => like.user_id === currentUser?.id)}
                      totalLikes={post.post_likes?.length ?? 0}
                      isAuthenticated={!!currentUser}
                    />

                    <div className="flex items-center space-x-1">
                      <Link href={`/post/${post.id}#comentarios`}>
                        <MessageCircle className="w-5 h-5 cursor-pointer text-black hover:text-indigo-600" />
                      </Link>
                      <span>{post.comments?.length ?? 0}</span>
                    </div>

                    <PostEditButton
                      post={post}
                      onEdit={() => {
                        setPostToEdit(post);
                        setShowModal(true);
                      }}
                    />
                  </div>
                  {/*  Papelera a la derecha */}
                  <DeletePost postId={post.id} onDeleted={handleDelete} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center italic text-gray-500">Aún no tienes ninguna publicación.</p>
      )}
      {showModal && (
        <div className=" fixed inset-0 bg-black bg-opacity-50 backdrop:-blur-sm flex items-center justify-center z-50">
          <div className=" animate-pop-in w-11/12 max-w-lg mx-auto ">
            <div className="bg-white rounded-2xl shadow-2xl p-6 relative">
              <button
                onClick={() => setShowModal(false)}
                className=" absolute top-4 right-4 text-black   cursor-pointer"
              >
                ✕
              </button>
              <div>
                <EditPostForm
                  postId={postToEdit?.id}
                  initialData={{
                    title: postToEdit?.title || '',
                    content: postToEdit?.content || '',
                  }}
                  onSuccess={updatedPost => {
                    handleUpdate(updatedPost);
                    setShowModal(false);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
