import { Suspense } from 'react';
import Loader from '@/components/Loader';
import LoginForm from './LoginForm';

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center px-4 py-12 sm:px-6">
          <Loader />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

