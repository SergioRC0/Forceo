'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/schemas/registerSchema';
import { useRouter } from 'next/navigation';
import SubmitButton from '../buttons/SubmitButton';
import toast from 'react-hot-toast';
import { useRegister } from '@/hooks/useAuth';
import ReCAPTCHA from 'react-google-recaptcha';

export default function RegisterForm() {
  const router = useRouter();
  const { registerU, loading } = useRegister();

  // 1) Estado para el token de reCAPTCHA
  const [captchaToken, setCaptchaToken] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const onSubmit = async formData => {
    // 2) Validación cliente: que el usuario haya pasado el captcha
    if (!captchaToken) {
      toast.error('Por favor, completa el captcha antes de enviar.');
      return;
    }

    // 3) Montar payload con el token
    const payload = {
      ...formData,
      captchaToken,
    };

    const { ok, data } = await registerU(payload);
    if (ok) {
      router.push('/login');
    } else {
      toast.error(data?.message || 'Credenciales inválidas');
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center md:mb-30 animate-fade-in">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm mx-auto p-6 mt-10 bg-white rounded-xl shadow-xl space-y-4"
      >
        <h2 className="text-4xl font-bold text-black text-center">
          Regístrate para tener total acceso
        </h2>

        {/* Email */}
        <div className="relative w-full">
          <input
            type="email"
            {...register('email')}
            placeholder="Email"
            className="w-full border rounded-xl px-3 py-2 text-black"
          />
          {errors.email && (
            <p className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 text-sm">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Usuario */}
        <div className="relative w-full">
          <input
            type="text"
            {...register('username')}
            placeholder="Usuario"
            className="w-full border rounded-xl px-3 py-2 text-black"
          />
          {errors.username && (
            <p className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 text-sm">
              {errors.username.message}
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

        <div>
          <p className="text-black">¿Ya eres de los nuestros?</p>
          <Link href="/login" className="text-blue-500 hover:underline">
            Inicia sesión aquí
          </Link>
        </div>

        {/* 4) El reCAPTCHA con onChange y onExpired */}
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          onChange={token => setCaptchaToken(token)}
          onExpired={() => setCaptchaToken('')}
        />

        <SubmitButton loading={loading}>Registrarse</SubmitButton>
      </form>
    </div>
  );
}
