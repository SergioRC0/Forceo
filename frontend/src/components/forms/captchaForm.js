'use client';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function CaptchaForm() {
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ captchaToken }),
    });

    const data = await res.json();
    console.log(data);
    alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={setCaptchaToken} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Enviar
      </button>
    </form>
  );
}
