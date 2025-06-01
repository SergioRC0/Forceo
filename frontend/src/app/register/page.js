import RegisterForm from '@/components/forms/RegisterForm';
import Footer from '@/components/Footer';

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen mt-3 md:mt-0 px-4">
      {/* Contenido principal centrado */}
      <div className="flex-1 flex items-center justify-center">
        <RegisterForm />
      </div>
      <div>
        {/* Footer abajo */}
        <Footer />
      </div>
    </div>
  );
}
