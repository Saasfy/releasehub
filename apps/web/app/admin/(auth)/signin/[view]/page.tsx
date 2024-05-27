import { redirect } from 'next/navigation';

import { getUser } from '@releasehub/supabase/server';

import { SignInForm } from '../../../../app/(auth)/signin/[view]/signin-form';

export default async function SignInViews() {
  const user = await getUser();

  if (user && user.email === process.env.APP_ADMIN_EMAIL) {
    return redirect('/');
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignInForm view="signin" />
    </div>
  );
}
