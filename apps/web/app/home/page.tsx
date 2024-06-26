import Link from 'next/link';

import {
  ArrowUpRightIcon,
  CloudIcon,
  CloudyIcon,
  GithubIcon,
  HelpCircleIcon,
  UploadIcon,
} from 'lucide-react';

import { ThemeModeToggle } from '@releasehub/components';
import { createAdminClient } from '@releasehub/supabase/server';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@releasehub/ui/accordion';
import { Badge } from '@releasehub/ui/badge';
import { Button } from '@releasehub/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@releasehub/ui/card';
import { Checkbox } from '@releasehub/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@releasehub/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@releasehub/ui/tooltip';

import { AdminPlansMock } from './examples/admin-plans.mock';
import { SignInMock } from './examples/sign-in.mock';
import { WorkspaceListMock } from './examples/workspace-list.mock';
import { SubscribeForm } from './subscribe-form';

export default function Component() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 items-center justify-between border-b px-4 lg:px-6">
        <div className="flex justify-start">
          <Link className="flex items-center justify-center" href="#">
            <CloudyIcon className="h-6 w-6" />
            <span className="sr-only">ReleaseHub</span>
          </Link>
          <nav className="ml-4 hidden gap-4 sm:flex sm:gap-6 ">
            <Link
              className="text-foreground/60 text-sm font-medium underline-offset-4 hover:underline"
              href="#pages"
            >
              Pages
            </Link>
            <Link
              className="text-foreground/60 text-sm font-medium underline-offset-4 hover:underline"
              href="#pricing"
            >
              Pricing
            </Link>
            <Link
              className="text-foreground/60 text-sm font-medium underline-offset-4 hover:underline"
              href="#faq"
            >
              FAQ
            </Link>
            <Link
              className="text-foreground/60 text-sm font-medium underline-offset-4 hover:underline"
              href="#subscribe"
            >
              Subscribe
            </Link>
          </nav>
        </div>

        <div className="flex gap-2">
          <Button asChild className="rounded-full">
            <Link href="https://app.releasehub.com">
              Demo
              <ArrowUpRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </Button>

          <Button size="icon" asChild variant="secondary" className="rounded-full">
            <Link href="https://twitter.com/katsuba_igor">
              <XIcon className={'h-4 w-4'} />
            </Link>
          </Button>

          <Button size="icon" asChild variant="secondary" className="rounded-full">
            <Link href="https://github.com/Saasfy/releasehub">
              <GithubIcon className="h-4 w-4" />
            </Link>
          </Button>

          <ThemeModeToggle />
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Early Access
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Build your own SaaS
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Support our project and start building your SaaS product today. Saasfy offers a
                  range of features to help you get started.
                </p>

                <div className="flex justify-center gap-4">
                  <Button
                    size="lg"
                    className="rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white"
                    asChild
                  >
                    <Link href="#pricing">Support</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full px-8 py-12 md:py-24 lg:py-32">
          <Tabs defaultValue="signin" id="pages" orientation="vertical">
            <TabsList className="h-auto flex-wrap justify-start">
              <TabsTrigger value="signin">Sign in page</TabsTrigger>
              <TabsTrigger value="workspace-list">Workspace list</TabsTrigger>
              <TabsTrigger value="plans">Manage subscription plans</TabsTrigger>
              <TabsTrigger value="more" disabled>
                More
                <Badge className={'ml-2'} color={'red'}>
                  Cooming Soon
                </Badge>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <div className="bg-card text-card-foreground rounded-lg border shadow-sm">
                <SignInMock />
              </div>
            </TabsContent>
            <TabsContent value="workspace-list">
              <div className="bg-card text-card-foreground overflow-hidden rounded-lg border shadow-sm">
                <WorkspaceListMock />
              </div>
            </TabsContent>
            <TabsContent value="plans">
              <div className="bg-card text-card-foreground rounded-lg border shadow-sm">
                <AdminPlansMock />
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Why Choose Saasfy?
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Saasfy offers a wide range of features designed to help you build and scale your
                  SaaS. Here are just a few of our favorites.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardContent className="flex flex-col items-center justify-center space-y-4 pt-8">
                  <CloudIcon className="h-10 w-10" />
                  <h3 className="text-xl font-bold">Cloud-Based</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Access your data from anywhere with our secure, cloud-based platform.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center space-y-4 pt-8">
                  <UploadIcon className="h-10 w-10" />
                  <h3 className="text-xl font-bold">Every day updates</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    We are constantly updating our platform to provide you with the latest features
                    and improvements.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center space-y-4 pt-8">
                  <HelpCircleIcon className="h-10 w-10" />
                  <h3 className="text-xl font-bold">Transparency</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    We believe in transparency and are committed to providing you with the best
                    possible service.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="from-primary-500 to-primary-600 w-full bg-gradient-to-r py-12 text-black md:py-24 lg:py-32 dark:text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Roadmap
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Version 1.0</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Here are some of the features we plan to include in version 1.0 of Saasfy.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center gap-12 py-12 md:flex-row">
              <div>
                <h3 className="text-xl font-bold">Application</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Checkbox checked className="mt-1" />
                    <span>Workspaces: Create workspaces for your applications.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Checkbox checked className="mt-1" />
                    <span>Projects: Create projects inside your workspace.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Checkbox checked className="mt-1" />
                    <span>Members: Invite members to your workspace.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Checkbox checked={false} className="mt-1" />
                    Roles: Assign roles to workspace members.
                  </li>
                  <li className="flex items-start gap-2">
                    <Checkbox checked className="mt-1" />
                    Subscription: Manage workspace billing and subscription.
                  </li>
                  <li className="flex items-start gap-2">
                    <Checkbox checked={false} className="mt-1" />
                    Settings: Manage your workspace settings.
                  </li>
                  <li className="flex items-start gap-2">
                    <Checkbox checked={false} className="mt-1" />
                    Domains: Manage workspace custom domains.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold">Authentication</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Checkbox checked className="mt-1" />
                    Sign Up: Allow users to sign up.
                  </li>
                  <li className="flex items-start gap-2">
                    <Checkbox checked className="mt-1" />
                    Sign In: Allow users to sign in.
                  </li>
                  <li className="flex items-start gap-2">
                    <Checkbox checked className="mt-1" />
                    Sign Out: Allow users to sign out.
                  </li>
                  <li className="flex items-start gap-2">
                    <Checkbox checked className="mt-1" />
                    Social Login: Allow users to sign in with social accounts.
                  </li>
                  <li className="flex items-start gap-2">
                    <Checkbox checked={false} className="mt-1" />
                    Forgot Password: Allow users to reset their password.
                  </li>
                  <li className="flex items-start gap-2">
                    <Checkbox checked={false} className="mt-1" />
                    Update Profile: Allow users to update their profile.
                  </li>
                  <li className="flex items-start gap-2">
                    <Checkbox checked={false} className="mt-1" />
                    Delete Account: Allow users to delete their account.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold">Admin</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Checkbox checked={false} className="mt-1" />
                    Users: Manage platform users.
                  </li>
                  <li className="flex items-start gap-2">
                    <Checkbox checked className="mt-1" />
                    Plans: Manage platform plans.
                  </li>
                </ul>

                <h3 className="mt-4 text-xl font-bold">Marketing</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Checkbox checked={false} className="mt-1" />
                    Landing Pages: Base landing pages for your products.
                  </li>
                  <li className="flex items-start gap-2">
                    <Checkbox checked={false} className="mt-1" />
                    Blog: Create blog posts to promote your products.
                  </li>
                  <li className="flex items-start gap-2">
                    <Checkbox checked={false} className="mt-1" />
                    SEO: Optimize your products for search engines.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[480px] py-12 md:py-24 lg:py-32" id="faq">
          <FAQ />
        </section>

        <section
          className="flex w-full flex-col items-center justify-center py-12 md:py-24 lg:py-32"
          id="pricing"
        >
          <Plans />
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32" id="subscribe">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Stay in the Loop
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Subscribe to our newsletter to get the latest updates on Saasfy.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <SubscribeForm />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Saasfy. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          {/*<Link className="text-xs hover:underline underline-offset-4" href="#">*/}
          {/*  Terms of Service*/}
          {/*</Link>*/}
          {/*<Link className="text-xs hover:underline underline-offset-4" href="/privacy">*/}
          {/*  Privacy*/}
          {/*</Link>*/}
        </nav>
      </footer>
    </div>
  );
}

async function Plans() {
  const supabase = createAdminClient();

  const { data: plans, error } = await supabase
    .from('plans')
    .select('*, prices(*)')
    .eq('status', 'active')
    .eq('prices.status', 'active');

  if (error) {
    console.error(error);
    return <div>Error loading plans</div>;
  }

  return (
    <>
      <h1 className="mb-6 text-4xl font-bold">Want to support project?</h1>
      <p className="mb-12 max-w-[700px] px-4 text-center text-lg md:px-0">
        We offer different ways to support the project. Choose the plan that best suits your needs.
      </p>
      <div className="grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
        {plans.map((plan) => (
          <Card key={plan.id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2">
                {plan.features?.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              {plan.prices?.map((price) => (
                <div className="my-4 text-4xl font-bold" key={price.id}>
                  ${price.amount / 100}/{price.interval}
                </div>
              ))}
              <form action={`/api/public/subscriptions`} method="post">
                <input type="hidden" name="planId" value={plan.id} />
                <input type="hidden" name="priceId" value={plan.prices.at(0)?.id} />
                <Button className="w-full">Support</Button>
              </form>
            </CardContent>
          </Card>
        ))}

        <Card>
          <CardHeader>
            <CardTitle>Do not find your way to support?</CardTitle>
            <CardDescription>Custom plan for you</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-inside list-disc space-y-2">
              <li>Custom Features</li>
              <li>Custom Support</li>
              <li>Estimate on request</li>
            </ul>
            <div className="my-4 text-4xl font-bold">Contact Us</div>
            <Button className="w-full" asChild>
              <Link href="mailto:igor@katsuba.dev">Get in Touch</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function FAQ() {
  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">Frequently Asked Questions</h2>
      <Accordion className="w-full" collapsible type="single">
        <AccordionItem value="question1">
          <AccordionTrigger className="text-base font-semibold">What is Saasfy?</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm">
              Saasfy is a template designed to help you build your SaaS product. It provides a range
              of features and components that can be customized to suit your needs.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="question2">
          <AccordionTrigger className="text-base font-semibold">
            How do I customize Saasfy for my product?
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm">
              Saasfy is built with customization in mind. You can easily change colors, fonts,
              layouts and add or remove components as needed. Our documentation{' '}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge>?</Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Coming soon</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>{' '}
              provides detailed instructions on how to make these changes.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="question3">
          <AccordionTrigger className="text-base font-semibold">
            Do I need coding skills to use Saasfy?
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm">
              Yes! You will need some basic knowledge of HTML, CSS and JavaScript to customize
              Saasfy for your product. Our documentation{' '}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge>?</Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Coming soon</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>{' '}
              provides step-by-step instructions and we also offer support if you need help.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="question4">
          <AccordionTrigger className="text-base font-semibold">
            Can I use Saasfy for non-SaaS products?
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm">
              Absolutely! While Saasfy is designed with SaaS products in mind, it can be customized
              to suit any type of product or service. But keep in mind that some features may not be
              relevant to your product.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 1227" fill="none" className={className}>
      <path
        d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
        fill="currentColor"
      />
    </svg>
  );
}
