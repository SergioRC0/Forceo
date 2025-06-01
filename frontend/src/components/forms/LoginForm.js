'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schemas/loginSchema';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useLogin } from '@/hooks/useAuth';
import SubmitButton from '@/components/buttons/SubmitButton';
import GoogleLoginButton from '@/components/buttons/GoogleLoginButton';

export default function LoginForm() {
  const router = useRouter();
  const { login, loading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async credentials => {
    const { ok, data } = await login(credentials);
    if (ok) {
      router.push('/profile');
    } else {
      toast.error('Credenciales Invalidas');
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center md:mb-30 animate-fade-in">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-6 rounded-xl shadow-xl space-y-4 mx-4 bg-white animate-fade-in"
      >
        <h2 className="text-4xl font-bold text-black text-center">Conéctate</h2>

        {/* Usuario o Email */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Usuario/eMail"
            {...register('emailOrUsername')}
            className="w-full border rounded-xl px-3 py-2 text-black"
          />
          {errors.emailOrUsername && (
            <p className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 text-sm">
              {errors.emailOrUsername.message}
            </p>
          )}
        </div>

        {/* Contraseña */}
        <div className="relative w-full">
          <input
            type="password"
            {...register('password')}
            placeholder="Contraseña"
            className="w-full border rounded-xl px-3 py-2 text-black"
          />
          {errors.password && (
            <p className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        <p className="text-blue-500 hover:underline cursor-pointer text-sm">
          ¿Has olvidado la contraseña?
        </p>

        <SubmitButton loading={loading}>Iniciar sesión</SubmitButton>

        <GoogleLoginButton />
      </form>
    </div>
  );
}
