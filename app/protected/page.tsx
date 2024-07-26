import { auth, signOut } from 'app/auth';

export default async function ProtectedPage() {
  let session = await auth();

  return (
      <div className="lg:bg-white w-full flex flex-col lg:flex-row px-4 lg:p-4 rounded-2xl lg:shadow-lg">
        Registado como {session?.user?.email}
        <SignOut />
      </div>
  );
}

function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button type="submit">Sair</button>
    </form>
  );
}
