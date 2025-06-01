import React from 'react';
import Layout from '../(root)/layout';

export default async function LoginLayout({ children }) {
  return (
    <div>
      <Layout>{children}</Layout>
    </div>
  );
}
