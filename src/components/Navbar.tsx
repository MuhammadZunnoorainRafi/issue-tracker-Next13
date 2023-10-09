'use client';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

const NavLink = [
  {
    href: '/',
    label: 'Dashboard',
  },
  {
    href: '/issues',
    label: 'Issues',
  },
];

function Navbar() {
  const pathName = usePathname();
  return (
    <div className="flex items-center border-b px-5 h-14 space-x-3">
      <AiFillBug />
      {NavLink.map((val) => {
        return (
          <Link
            className={classNames({
              'text-zinc-900': pathName === val.href,
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
    </div>
  );
}

export default Navbar;
