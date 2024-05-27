import { createAdminClient, getUser } from '@releasehub/supabase/server';
import { Button } from '@releasehub/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@releasehub/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@releasehub/ui/table';

import { CreateTokenDialog } from './create-token-dialog';
import { RevokeButton } from './revoke-button';

export default async function Component() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const supabase = createAdminClient();

  const { data: tokens, error } = await supabase.from('tokens').select('*').eq('user', user.id);

  if (error) {
    throw error;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Your Tokens</h1>
          <p className="text-gray-600">
            Manage your personal access tokens for secure authentication.
          </p>
        </div>
        {tokens.length ? (
          <Card>
            <CardHeader></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead></TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tokens.map((token) => (
                    <TableRow key={token.id}>
                      <TableCell>{token.name}</TableCell>
                      <TableCell>{token.masked}</TableCell>
                      <TableCell>
                        {token.expires ? new Date(token.expires).toLocaleDateString() : 'Never'}
                      </TableCell>
                      <TableCell>
                        <RevokeButton id={token.id}>
                          <Button size="sm" variant="outline">
                            Revoke
                          </Button>
                        </RevokeButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <CreateTokenDialog>
                <Button>Generate New Token</Button>
              </CreateTokenDialog>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader></CardHeader>
            <CardContent>
              <p className="text-gray-600">
                You don&apos;t have any tokens yet. Generate a new token to authenticate with the
                API.
              </p>
            </CardContent>
            <CardFooter>
              <CreateTokenDialog>
                <Button>Generate New Token</Button>
              </CreateTokenDialog>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
