import Link from 'next/link';

import { Button } from '@releasehub/ui/button';

export default function Component() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-6xl font-extrabold text-gray-800 dark:text-white">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-800 dark:text-white">Page not found</h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Unfortunately, the page you are looking for does not exist.
        </p>
        <Button asChild className="mt-4">
          <Link href="/">Go back to home</Link>
        </Button>
      </div>
    </div>
  );
}
