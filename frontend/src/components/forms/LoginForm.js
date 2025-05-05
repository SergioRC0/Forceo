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
          </form>
          
        )
}