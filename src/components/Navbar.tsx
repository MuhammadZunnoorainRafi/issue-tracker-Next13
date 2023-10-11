'use client';
import {
  Flex,
  Container,
  Box,
  DropdownMenu,
  Avatar,
  Text,
} from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

const NavLink = [
  {
    href: '/',
    label: 'Dashboard',
  },
  {
    href: '/issues/list',
    label: 'Issues',
  },
];

function Navbar() {
  return (
    <div className=" border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug size={20} />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </div>
  );
}

const NavLinks = () => {
  const pathName = usePathname();

  return (
    <>
      {NavLink.map((val) => {
        return (
          <Link
            className={classNames({
              'text-zinc-900 font-medium': pathName === val.href,
              'text-zinc-500': pathName !== val.href,
              'hover:text-zinc-800 transition-colors': true,
            })}
            key={val.href}
            href={val.href}
          >
            {val.label}
          </Link>
        );
      })}
    </>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') return null;
  if (status === 'unauthenticated')
    return <Link href="/api/auth/signin">Login</Link>;

  return (
    <>
      <Box>
        {status === 'authenticated' && (
          <Box>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Avatar
                  src={session!.user!.image!}
                  fallback="?"
                  size="2"
                  radius="full"
                  className="cursor-pointer"
                  referrerPolicy="no-referrer"
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>
                  <Text size="2">{session!.user!.email}</Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                  <Link href="/api/auth/signout">Log out</Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Navbar;
