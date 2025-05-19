'use client';
import { Loader2 } from 'lucide-react';
export default function SubmitButton({ loading, children, ...props }) {
  return (
    <button
      type="submit"
      className="w-full px-4 py-2 text-white bg-black btn-hover disabled:cursor-not-allowed"
      disabled={loading}
      {...props}
    >
      {loading ? <Loader2 className="h-5 w-5 animate-spin left" /> : children}
    </button>
  );
}
