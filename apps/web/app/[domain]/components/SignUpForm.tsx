import { useId } from 'react';

import { Button } from '@releasehub/ui/button';
import { Input } from '@releasehub/ui/input';

export function SignUpForm() {
  const id = useId();

  return (
    <form className="relative isolate mt-8 flex items-center pr-1 space-x-2">
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <Input
        required
        type="email"
        autoComplete="email"
        name="email"
        id={id}
        placeholder="Email address"
      />
      <Button type="submit">Get updates</Button>
    </form>
  );
}
