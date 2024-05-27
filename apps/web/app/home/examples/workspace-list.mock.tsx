import React, { Suspense } from 'react';
import Link from 'next/link';

import {
  ArrowUpRightIcon,
  Check,
  ChevronsUpDown,
  CloudyIcon,
  PlusIcon,
  SearchIcon,
  UserCircleIcon,
} from 'lucide-react';

import { ThemeModeToggle } from '@releasehub/components';
import { Tables } from '@releasehub/supabase';
import { Badge } from '@releasehub/ui/badge';
import { Button } from '@releasehub/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@releasehub/ui/command';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@releasehub/ui/dropdown-menu';
import { Input } from '@releasehub/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@releasehub/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@releasehub/ui/table';
import { cn } from '@releasehub/utils';

export function WorkspaceListMock() {
  const workspaces: Tables<'workspaces'>[] = [
    {
      id: '1',
      name: 'Workspace 1',
      slug: 'workspace-1',
      description: 'Workspace 1 description',
      status: 'active',
      created_at: new Date().toISOString(),
      plan_id: null,
      stripe_customer_id: null,
      stripe_subscription_id: null,
      stripe_subscription_status: null,
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Workspace 2',
      slug: 'workspace-2',
      description: 'Workspace 2 description',
      status: 'inactive',
      created_at: new Date().toISOString(),
      plan_id: null,
      stripe_customer_id: null,
      stripe_subscription_id: null,
      stripe_subscription_status: null,
      updated_at: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Workspace 3',
      slug: 'workspace-3',
      description: 'Workspace 3 description',
      status: 'active',
      created_at: new Date().toISOString(),
      plan_id: null,
      stripe_customer_id: null,
      stripe_subscription_id: null,
      stripe_subscription_status: null,
      updated_at: new Date().toISOString(),
    },
  ];

  const slug = 'workspace-1';

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}></Suspense>
      <div className="flex min-h-[720px] w-full flex-col">
        <header className="bg-background sticky top-0 z-10 flex h-16 items-center gap-4 border-b px-4 md:px-6">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link className="flex items-center gap-2 text-lg font-semibold md:text-base" href={`/`}>
              <CloudyIcon className="h-6 w-6" />
              <span className="sr-only">ReleaseHub</span>
            </Link>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className="w-[200px] justify-between">
                  {slug
                    ? workspaces?.find((workspace) => workspace.slug === slug)?.name
                    : 'Select workspace...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search workspace..." />
                  <CommandList>
                    <CommandEmpty>No workspace found.</CommandEmpty>
                    <CommandGroup>
                      {workspaces?.map((workspace) => (
                        <CommandItem key={workspace.slug} value={workspace.slug}>
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              slug === workspace.slug ? 'opacity-100' : 'opacity-0',
                            )}
                          />
                          {workspace.name}
                        </CommandItem>
                      ))}

                      <CommandSeparator className="my-1" />

                      <CommandItem>
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Create new workspace
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </nav>
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <SearchIcon className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
                <Input
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                  placeholder="Search..."
                  type="search"
                />
              </div>
            </form>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full" size="icon" variant="secondary">
                  <UserCircleIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeModeToggle />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <>
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">Workspaces</h1>

              <Button className="ml-auto" size="sm">
                Create Workspace
              </Button>
            </div>
            <div className="rounded-lg border shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="max-w-[150px]">Name</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="hidden md:table-cell">Projects</TableHead>
                    <TableHead>Domains</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workspaces.map((workspace) => (
                    <TableRow key={workspace.id}>
                      <TableCell className="font-medium">{workspace.name}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge
                          className="capitalize"
                          variant={workspace.status === 'active' ? 'default' : 'destructive'}
                        >
                          {workspace.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{Math.floor(Math.random() * 100)}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {Math.floor(Math.random() * 100)}
                      </TableCell>
                      <TableCell className="w-36">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`#`}>
                            View
                            <ArrowUpRightIcon className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        </main>
      </div>
    </div>
  );
}
