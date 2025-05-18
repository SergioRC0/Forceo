'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schemas/loginSchema';
import LoginButton from '@/components/buttons/LoginButton';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/utils/auth';
import toast from 'react-hot-toast';


export default function LoginForm(){
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
      });
    
    const onSubmit = async (credentials) => {
        const {ok, data } = await loginUser(credentials)
        if(ok){
            router.push('/profile');
        }else{
            toast.error(data?.message || 'Credenciales Invalidas')
        }
    };
    
    return(
        
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl py-10 px-10 rounded-2xl shadow-2xl space-y-6 mx-4 bg-white">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-black">Conéctate</h2>
            </div>
            <input
              type="text"
              placeholder="Usuario/eMail"
              {...register('emailOrUsername')}
              className="w-full border rounded-xl px-3 py-2 border-black text-black"
            />{errors.emailOrUsername && (<p className="text-red-500 text-sm mt-1">{errors.emailOrUsername.message}</p>)}
            <input
              type="password"
              {...register('password')}
              placeholder="Contraseña"
              className="w-full border rounded-xl px-3 py-2 border-black text-black"
            />{errors.password && (<p className="text-red-500 text-sm mt-1">{errors.password.message}</p>)}
            <p className="text-blue-400 hover:text-blue-700 cursor-pointer">
              ¿Has olvidado la contraseña?
            </p>
            <LoginButton />
            <a
              href="http://localhost:3001/api/auth/google"
              className="w-full flex items-center justify-center mt-4 py-2 px-4 rounded-xl bg-[#4285F4] text-white font-semibold hover:bg-[#357ae8] transition-colors"
              style={{ textDecoration: 'none' }}
            >
              <svg width="20" height="20" viewBox="0 0 48 48" className="mr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path fill="#4285F4" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.3-5.7 7-10.3 7-6.1 0-11-4.9-11-11s4.9-11 11-11c2.6 0 5 .9 6.9 2.4l6.6-6.6C35.1 6.5 29.8 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.3-3.5z"/>
                  <path fill="#34A853" d="M6.3 14.7l6.6 4.8C14.6 16.1 19 13 24 13c2.6 0 5 .9 6.9 2.4l6.6-6.6C35.1 6.5 29.8 4 24 4c-7.2 0-13.4 3.7-17.1 9.4z"/>
                  <path fill="#FBBC05" d="M24 44c5.5 0 10.2-1.8 13.6-4.9l-6.3-5.2c-1.9 1.4-4.4 2.3-7.3 2.3-4.6 0-8.7-2.7-10.3-7H6.3C9.9 39.3 16.4 44 24 44z"/>
                  <path fill="#EA4335" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.1 2.9-3.2 5.1-6.3 6.5l6.3 5.2c3.7-3.4 6.7-8.4 6.7-15.2 0-1.3-.1-2.7-.3-3.5z"/>
                </g>
              </svg>
              Iniciar sesión con Google
            </a>
          </form>

          
          
        )
}