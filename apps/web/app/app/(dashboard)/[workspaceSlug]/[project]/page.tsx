import React, { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { GlobeIcon } from 'lucide-react';

import { createAdminClient, getUser } from '@releasehub/supabase/server';

export default async function SettingsLayout({
  params,
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
    <div className="w-full mx-auto">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="grid gap-4">
            <div className="flex items-center justify-start space-x-2">
              {/*<h1 className="text-2xl font-bold">Project Name</h1>*/}
              {/*<Link*/}
              {/*  href="#"*/}
              {/*  className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"*/}
              {/*  prefetch={false}*/}
              {/*>*/}
              {/*  <LinkIcon className="w-4 h-4" />*/}
              {/*  <span className="sr-only">Public Changelog</span>*/}
              {/*</Link>*/}
            </div>
            <p className="text-gray-500 dark:text-gray-400">{project.description}</p>
            <div className="flex items-center gap-2">
              <GlobeIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <a
                href={project.domains?.slug}
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                {project.domains?.slug}
              </a>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden w-full max-w-[600px] mx-auto">
            <img
              src="/placeholder.svg"
              alt="Project Screenshot"
              width={600}
              height={400}
              className="w-full aspect-[3/2] object-cover"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
