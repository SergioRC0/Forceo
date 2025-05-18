import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Forceo",
  description: "Una plataforma en la que todos los deportistas podrán publicar entre sí sus progresos o curiosidades sobre el mundo deportivo.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
         <Toaster
        position="top-center"    // puedes elegir otra posición
        toastOptions={{
          duration: 2000,        // milisegundos
          style: { zIndex: 9999 } // para que no quede oculto
        }}
      />
      </body>
    </html>
  );
}
