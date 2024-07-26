import Link from 'next/link';
import { Form } from 'app/form';
import { redirect } from 'next/navigation';
import { createUser, getUser } from 'app/db';
import { SubmitButton } from '@/components/submit-button';

export default function Login() {
  async function register(formData: FormData) {
    'use server';
    let email = formData.get('email') as string;
    let password = formData.get('password') as string;
    let user = await getUser(email);

    if (user.length > 0) {
      return 'O utilizador já existe'; // TODO: Handle errors with useFormStatus
    } else {
      await createUser(email, password);
      redirect('/login');
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Regista-te</h3>
          <p className="text-sm text-gray-500">
            Cria uma conta com o teu e-mail
          </p>
        </div>
        <Form action={register}>
          <SubmitButton>Registar</SubmitButton>
          <p className="text-center text-sm text-gray-600">
            {'Já está registado? '}
            <Link href="/login" className="font-semibold text-gray-800">
              Entre aqui
            </Link>
            {"."}
          </p>
        </Form>
      </div>
    </div>
  );
}
