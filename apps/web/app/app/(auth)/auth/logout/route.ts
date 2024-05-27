import { getUrl } from '@releasehub/api/server';
import { createAuthClient } from '@releasehub/supabase/server';

export async function GET(request: Request) {
  const auth = createAuthClient();

  await auth.signOut();

  return Response.redirect(getUrl(request, '/signin/signin'));
}
