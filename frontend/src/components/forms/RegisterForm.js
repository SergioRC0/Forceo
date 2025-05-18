'use client';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/schemas/registerSchema';
import { useRouter } from 'next/navigation';
import SubmitButton from '../buttons/SubmitButton';
import toast from 'react-hot-toast';
import { useRegister } from '@/hooks/useAuth';

export default function RegisterForm() {
  const router = useRouter();
  const { registerU, loading } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema), //usamos la libreria importada Zod para validar en el cliente, tambien lo haremos en el backend
    mode: 'onChange', //con esto hacemos que cuando el usuario cambie el mensaje del input este se actualiza a tiempo real
  });
  const onSubmit = async registerDataForm => {
    const { ok, data } = await registerU(registerDataForm);
    if (ok) {
      router.push('/login');
    } else {
      toast.error(data?.message || 'Credenciales inválidas');
    }
  };

  return (
    <div>
      <div className="flex-grow flex items-center justify-center md:mb-30">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md p-6 rounded-xl shadow-xl space-y-4 mx-4 bg-white"
        >
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-black">Regístrate para tener total acceso</h2>
          </div>
          {/* Campo Email */}
          <div className="relative w-full">
            <input
              type="email"
              {...register('email')}
              placeholder="Email"
              className="w-full border rounded-xl px-3 py-2 border-black text-black"
            />
            {errors.email && (
              <p className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 text-sm">
                {' '}
                {errors.email.message}{' '}
              </p>
            )}
          </div>

          {/* Campo Username */}
          <div className="relative w-full">
            <input
              type="text"
              {...register('username')}
              placeholder="Usuario"
              className="w-full border rounded-xl px-3 py-2 border-black text-black"
            />
            {errors.username && (
              <p className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 text-sm">
                {' '}
                {errors.username.message}{' '}
              </p>
            )}
          </div>
          {/* Campo Password */}
          <div className="relative w-full">
            <input
              type="password"
              {...register('password')}
              placeholder="Contraseña"
              className="w-full border rounded-xl px-3 py-2 border-black text-black"
            />
            {errors.password && (
              <p className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 text-sm">
                {' '}
                {errors.password.message}{' '}
              </p>
            )}
          </div>

          <div>
            <p className="text-black">¿Ya eres de los nuestros?</p>
            <Link href="/login" className="text-blue-400 hover:text-blue-700 cursor-pointer">
              Inicia sesión aquí
            </Link>
          </div>
          <SubmitButton loading={loading}>Registrarse</SubmitButton>
        </form>
      </div>
    </div>
  );
}
