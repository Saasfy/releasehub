import React, { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { ExternalLink } from 'lucide-react';

import { createAdminClient, getUser } from '@releasehub/supabase/server';

import { Nav } from './nav';

export default async function SettingsLayout({
  params,
  children,
}: {
  children: ReactNode;
  params: {
    project: string;
    workspaceSlug: string;
  };
}) {
  const user = await getUser();

  if (!user) {
    return redirect(`/signin/signin`);
  }

  const supabase = createAdminClient();

  const { data: workspace } = await supabase
    .from('workspaces')
    .select('*, workspace_users!inner(*), projects!inner(*)')
    .eq('workspace_users.user_id', user.id)
    .eq('slug', params.workspaceSlug)
    .eq('projects.slug', params.project)
    .single();

  if (!workspace) {
    return redirect('/not-found');
  }

  const { data: project } = await supabase
    .from('projects')
    .select('*, domains(*)')
    .eq('workspace_id', workspace.id)
    .eq('slug', params.project)
    .single();

  if (!project) {
    return redirect('/not-found');
  }

  return (
    <>
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold flex items-center gap-3">
          {project.name}
          {project.domains && (
            <link href={project.domains.slug}>
              <ExternalLink className="w-6 h-6" />
              <span className="sr-only">Public Changelog</span>
            </link>
          )}
        </h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="text-muted-foreground grid gap-4 text-sm">
          <Nav workspace={workspace} project={project} />
        </nav>
        <div className="grid gap-6">{children}</div>
      </div>
    </>
  );
}
