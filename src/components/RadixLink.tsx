import Link from 'next/link';
import { Link as RLink } from '@radix-ui/themes';

type Props = {
  href: string;
  children: string;
};
function RadixLink({ href, children }: Props) {
  return (
    <Link href={href} passHref legacyBehavior>
      <RLink>{children}</RLink>
    </Link>
  );
}

export default RadixLink;
