'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
export default function LikeButton({
  itemId,
  isLiked,
  totalLikes,
  type = 'post',
  isAuthenticated,
  disabled = false,
}) {
  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(totalLikes);
  const router = useRouter();

  const endpointMap = {
    post: '/api/posts/toggleLike',
    comment: '/api/posts/comments/toggleLike',
  };

  const handleClick = async () => {
    if (disabled) return;

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const endpoint = endpointMap[type];
    if (!endpoint) {
      console.error(`Tipo de like desconocido: ${type}`);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          [`${type}Id`]: itemId,
        }),
      });

      if (!res.ok) throw new Error('Error al hacer like');

      const data = await res.json();
      setLiked(data.liked);
      setLikes(prev => prev + (data.liked ? 1 : -1));
    } catch (err) {
      console.error('Error en toggleLike:', err.message);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center space-x-1 text-sm group cursor-pointer ${
        disabled ? 'opacity-50 ' : ''
      }`}
      disabled={disabled}
    >
      <Heart
        className={`w-5 h-5 transition-colors duration-150  ${
          liked ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover:text-red-400'
        }`}
      />
      <span>{likes}</span>
    </button>
  );
}
