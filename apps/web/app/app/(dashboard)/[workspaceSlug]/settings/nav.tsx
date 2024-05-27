'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ArrowUpRightIcon } from 'lucide-react';

import { Tables } from '@releasehub/supabase';
import { Button } from '@releasehub/ui/button';
import { cn } from '@releasehub/utils';

export function Nav({ workspace }: { workspace: Tables<'workspaces'> }) {
  const path = usePathname();

  return (
    <>
      <Link
        href={`/${workspace.slug}/settings`}
        className={cn(path === `/${workspace.slug}/settings` ? 'text-foreground' : '')}
      >
        Settings
      </Link>
      <Link
        href={`/${workspace.slug}/settings/members`}
        className={cn(path === `/${workspace.slug}/settings/members` ? 'text-foreground' : '')}
      >
        Members
      </Link>
      {/*domains*/}
      <Link
        href={`/${workspace.slug}/settings/domains`}
        className={cn(path === `/${workspace.slug}/settings/domains` ? 'text-foreground' : '')}
      >
        Domains
      </Link>
      <Link
        href={`/${workspace.slug}/settings/notifications`}
        className={cn(
          path === `/${workspace.slug}/settings/notifications` ? 'text-foreground' : '',
        )}
      >
        Notifications
      </Link>
      {workspace.status === 'active' ? (
        <form action={`/api/workspaces/${workspace.slug}/subscription/portal`} method="GET">
          <button type="submit" className="inline-flex">
            <span>Billing</span>
            <ArrowUpRightIcon size={16} />
          </button>
        </form>
      ) : (
        <Button asChild size="sm" variant="secondary">
          <Link href={`/${workspace.slug}/settings/upgrade`}>Upgrade</Link>
        </Button>
      )}
    </>
  );
}
