// components/CategoryFilter.jsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function CategoryFilter({ categories }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams.get('category') || 'Todas';

  const handleChange = e => {
    const value = e.target.value;
    const query = value === 'Todas' ? '' : `?category=${value}`;
    router.push('/' + query);
  };

  return (
    <div className="text-center mb-8">
      <select
        value={selected}
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 rounded-lg shadow"
      >
        {['Todas', ...categories].map(cat => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
