import { redirect } from 'next/navigation';

import { createAdminClient, getUser } from '@releasehub/supabase/server';
import { Button } from '@releasehub/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@releasehub/ui/card';
import { Input } from '@releasehub/ui/input';

export default async function Settings({ params }: { params: { workspaceSlug: string } }) {
  const user = await getUser();

  if (!user) {
    return redirect('/login');
  }

  const supabase = createAdminClient();

  const { data: workspace } = await supabase
    .from('workspaces')
    .select('*, workspace_users!inner(*)')
    .eq('slug', params.workspaceSlug)
    .eq('workspace_users.user_id', user.id)
    .single();

  if (!workspace) {
    return redirect('/not-found');
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Workspace Name</CardTitle>
          <CardDescription>The name of your workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input defaultValue={workspace.name} readOnly />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Workspace Slug</CardTitle>
          <CardDescription>The slug of your workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input defaultValue={workspace.slug} readOnly />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </>
  );
}
