import Footer from '@/components/Footer';
import LoginForm from '@/components/forms/LoginForm';

export default function LoginPage() {

  
  return (
    <div className="flex flex-col min-h-screen">
    {/* Contenido principal centrado */}
      <div className="flex-1 flex items-center justify-center">
        <LoginForm />
      </div>
      <div className='mb-20'>
    {/* Footer abajo */}
        <Footer/>
      </div>  
  </div>
  );
}
