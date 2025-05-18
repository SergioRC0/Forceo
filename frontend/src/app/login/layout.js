import React from 'react';
import Layout from '../(root)/layout';

export default async function LoginLayout({ children }) {
  return (
    <div>
      <Layout hideOverflow>{children}</Layout>
    </div>
  );
}
