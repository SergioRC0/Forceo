import React from 'react';
import Layout from '@/app/(root)/layout';

export default async function postLayout({ children }) {
  return (
    <div>
      <Layout>{children}</Layout>
    </div>
  );
}
