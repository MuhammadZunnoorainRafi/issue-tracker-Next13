import { Text } from '@radix-ui/themes';
import { PropsWithChildren } from 'react';

function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <Text as="p" color="red">
      {children}
    </Text>
  );
}

export default ErrorMessage;
