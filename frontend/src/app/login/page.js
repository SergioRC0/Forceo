import Footer from '@/components/Footer';
import LoginForm from '@/components/forms/LoginForm';

export default async function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex items-center justify-center">
        <LoginForm />
      </div>
      <div className="mb-18">
        <Footer />
      </div>
    </div>
  );
}
