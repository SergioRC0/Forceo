import { logoutUser } from "@/utils/auth";
import { redirect } from 'next/navigation';

export const handleLogout = (router) => {
    logoutUser();
    redirect('/login');
};