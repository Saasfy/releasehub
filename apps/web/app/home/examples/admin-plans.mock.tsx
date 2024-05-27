import React from 'react';
import Link from 'next/link';

import { CloudyIcon, UserCircleIcon } from 'lucide-react';

import { Button } from '@releasehub/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@releasehub/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@releasehub/ui/table';

import DashboardNav from '../../admin/(dashboard)/nav';

export function AdminPlansMock() {
  const plans = [
    {
      id: '1',
      name: 'Basic',
      description: 'Basic plan',
      Price: [
        { amount: 1000, currency: 'usd', interval: 'month' },
        { amount: 10000, currency: 'usd', interval: 'year' },
      ],
    },
    {
      id: '2',
      name: 'Pro',
      description: 'Pro plan',
      Price: [
        { amount: 2000, currency: 'usd', interval: 'month' },
        { amount: 20000, currency: 'usd', interval: 'year' },
      ],
    },
  ];

  return (
    <div className="grid min-h-[720px] w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <CloudyIcon className="h-6 w-6" />
              <span className="">ReleaseHub</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <DashboardNav />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <>
          <header className="flex h-14 items-center gap-4 border-b px-6 lg:h-[60px] ">
            <div className="w-full flex-1"></div>
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
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">Plans</h1>
              {plans?.length ? (
                <Button className="ml-auto" size="sm">
                  Add Plan
                </Button>
              ) : null}
            </div>
            {plans?.length ? (
              <div className="rounded-lg border shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="max-w-[150px]">Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="hidden md:table-cell">Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {plans.map((plan) => (
                      <TableRow key={plan.id}>
                        <TableCell className="font-medium">{plan.name}</TableCell>
                        <TableCell>{plan.description || 'No description'}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div>${plan.Price.at(0)!.amount / 100}/month</div>
                          <div>${plan.Price.at(1)!.amount / 100}/year</div>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button className="ml-2" size="sm" variant="outline">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                <div className="flex flex-col items-center gap-1 text-center">
                  <h3 className="text-2xl font-bold tracking-tight">You have no plans yet.</h3>
                  <p className="text-muted-foreground text-sm">
                    You can start selling as soon as you add a plan.
                  </p>
                  <Button className="mt-4">Add Plan</Button>
                </div>
              </div>
            )}
          </main>
        </>
      </div>
    </div>
  );
}
