'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@releasehub/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@releasehub/ui/dialog';
import { Input } from '@releasehub/ui/input';
import { Label } from '@releasehub/ui/label';
import { useToast } from '@releasehub/ui/use-toast';

export function CreateTokenDialog({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate New Token</DialogTitle>
          <DialogDescription>Create a new token for secure authentication.</DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="name">
                Name
              </Label>
              <Input
                className="col-span-3"
                name="tokenName"
                placeholder="Token Name"
                autoComplete="off"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="submit"
                formAction={async (formData: FormData) => {
                  const response = await fetch('/api/tokens', {
                    method: 'POST',
                    body: JSON.stringify({
                      name: formData.get('tokenName'),
                    }),
                  });

                  const body = await response.json();

                  if (response.ok) {
                    router.refresh();
                    toast({
                      title: 'Token Generated',
                      description: 'Your new token has been generated successfully.',
                      action: (
                        <Button
                          variant="ghost"
                          onClick={() => {
                            navigator.clipboard.writeText(body.token.token);
                          }}
                        >
                          Copy Token
                        </Button>
                      ),
                    });
                  } else {
                    toast({
                      title: 'Error',
                      description: body.errors.join('. '),
                      variant: 'destructive',
                    });
                  }
                }}
              >
                Generate
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
