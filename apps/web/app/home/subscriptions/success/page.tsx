import { headers } from 'next/headers';
import Link from 'next/link';

import { CheckIcon } from 'lucide-react';

import { Button } from '@releasehub/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@releasehub/ui/card';

export default function Component() {
  const host = headers().get('host');

  const appUrl = `${host && host.includes('localhost') ? 'http' : 'https'}://app.${host}`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-12">
      <Card>
        <CardHeader className={'items-center justify-center'}>
          <CheckIcon className="h-16 w-16 text-green-500" />
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Payment Successful!
          </h2>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center">
            <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
              Thank you for your purchase. Your subscription is now active.
            </p>

            <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
              You can now access the app. Please click the button below to go to the app and login
              using GitHub. Within 8 hours you will have access to the repository.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className={'w-full'}>
            <Link href={appUrl}>Go to the app</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
