import { getUrl } from '@releasehub/api/server';
import { createAuthClient } from '@releasehub/supabase/server';

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the `@supabase/ssr` package. It exchanges an auth code for the user's session.
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const auth = createAuthClient();

    const { error } = await auth.exchangeCodeForSession(code);

    if (error) {
      return Response.redirect(getUrl(request, '/signin/forgot_password'));
    }
  }

  // URL to redirect to after sign in process completes
  return Response.redirect(getUrl(request, '/signin/update_password'));
}
