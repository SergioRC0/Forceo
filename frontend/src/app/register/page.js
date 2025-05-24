import RegisterForm from '@/components/forms/RegisterForm';
import Footer from '@/components/Footer';

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Contenido principal centrado */}
      <div className="flex-1 flex items-center justify-center">
        <RegisterForm />
      </div>
      <div className="mb-20">
        {/* Footer abajo */}
        <Footer />
      </div>
    </div>
  );
}
