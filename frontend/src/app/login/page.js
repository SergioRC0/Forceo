import Footer from '@/components/Footer';
import LoginForm from '@/components/forms/LoginForm';

export default async function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen mt-3 md:mt-0 px-4">
      {/* Contenido principal centrado */}
      <div className="flex-1 flex items-center justify-center">
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
}
