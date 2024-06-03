'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ArrowUpRightIcon, HomeIcon, InfoIcon, SettingsIcon } from 'lucide-react';

import { Tables } from '@releasehub/supabase';
import { Badge } from '@releasehub/ui/badge';
import { Button } from '@releasehub/ui/button';
import { cn } from '@releasehub/utils';

export function Nav({
  workspace,
  project,
}: {
  workspace: Tables<'workspaces'>;
  project: Tables<'projects'>;
}) {
  const path = usePathname();

  return (
    <>
      <Link
        href={`/${workspace.slug}/${project.slug}`}
        className={cn(
          path === `/${workspace.slug}/${project.slug}` ? 'text-foreground' : '',
          'flex items-center gap-1',
        )}
      >
        <HomeIcon size={16} />
        Home
      </Link>
      <Link
        href={`/${workspace.slug}/${project.slug}/analytics`}
        className={cn('flex items-center gap-1 pointer-events-none')}
        aria-disabled={true}
      >
        <InfoIcon size={16} />
        Analytics <Badge>Coming soon</Badge>
      </Link>

      <Link
        href={`/${workspace.slug}/${project.slug}/settings`}
        className={cn(
          path === `/${workspace.slug}/${project.slug}/settings` ? 'text-foreground' : '',
          'flex items-center gap-1',
        )}
      >
        <SettingsIcon size={16} />
        Settings
      </Link>
    </>
  );
}
