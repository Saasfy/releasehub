import React from 'react';
import { redirect } from 'next/navigation';

import { createAdminClient, getUser } from '@releasehub/supabase/server';
import { Button } from '@releasehub/ui/button';
import { Input } from '@releasehub/ui/input';
import { Label } from '@releasehub/ui/label';
import { Textarea } from '@releasehub/ui/textarea';

export default async function ProjectPage({
  params,
}: {
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
    .select('*, workspace_users!inner(*), projects(*)')
    .eq('workspace_users.user_id', user.id)
    .eq('slug', params.workspaceSlug)
    .eq('projects.slug', params.project)
    .single();

  if (!workspace) {
    return redirect('/not-found');
  }

  const projects = workspace.projects;
  const project = projects?.at(0);

  if (!project) {
    return redirect('/not-found');
  }

  return (
    <>
      <div className="flex items-center">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold md:text-2xl">Settings</h3>
        </div>
      </div>
      <div className="w-full mx-auto">
        <form className="mt-6 space-y-6">
          <div className="space-y-2">
            <Label className="text-white" htmlFor="name">
              Name
            </Label>
            <Input id="name" placeholder="Enter project name" />
          </div>
          <div className="space-y-2">
            <Label className="text-white" htmlFor="description">
              Description
            </Label>
            <Textarea
              className="min-h-[100px]"
              id="description"
              placeholder="Enter project description"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white" htmlFor="domain">
              Domain
            </Label>
            <Input id="domain" placeholder="Enter project domain" />
          </div>
          <div className="space-y-2">
            <Label className="text-white" htmlFor="github">
              GitHub
            </Label>
            <Input id="github" placeholder="Enter GitHub URL" />
          </div>
          <div className="space-y-2">
            <Label className="text-white" htmlFor="id">
              ID
            </Label>
            <Input id="id" placeholder="Enter project ID" />
          </div>
          <div className="space-y-2">
            <Label className="text-white" htmlFor="primary_color">
              Primary Color
            </Label>
            <Input id="primary_color" placeholder="Enter primary color" type="color" />
          </div>
          <div className="space-y-2">
            <Label className="text-white" htmlFor="site">
              Site
            </Label>
            <Input id="site" placeholder="Enter site URL" />
          </div>
          <div className="space-y-2">
            <Label className="text-white" htmlFor="slug">
              Slug
            </Label>
            <Input id="slug" placeholder="Enter slug" />
          </div>
          <Button className="w-full">Save</Button>
        </form>
      </div>
    </>
  );
}
