import { disablePageScrolling, runWithViewTransition } from '../utils/helpers';
import clsx from 'clsx';
import { useEffect, useState } from 'preact/hooks';

type Props = {
  currentUrl: string;
  logo: {
    src: string;
    srcSet: string;
  };
};

const navLinks = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/about',
    label: 'About',
  },
  {
    href: '/publications',
    label: 'Publications',
  },
  {
    href: '/projects',
    label: 'Projects',
  },
  {
    href: '/contact',
    label: 'Contact',
  },
];

const NavHeader = ({ logo, currentUrl }: Props) => {
  const [isMobileMenuVisible, setMobileMenuVisibility] = useState(false);

  useEffect(() => {
    disablePageScrolling(isMobileMenuVisible);
  }, [isMobileMenuVisible]);

  return (
    <header className="flex items-center max-md:mb-16">
      <nav className="flex flex-grow justify-between">
        <ul className="md:flex md:items-center">
          <li className="max-md:hidden">
            <a href="/" className="flex items-center space-x-4">
              <img src={logo.src} srcSet={logo.srcSet} alt="Logo" width={30} height={30} />
              <span className="text-xl font-bold tracking-[0.2rem] max-lg:hidden">Aggelos.</span>
            </a>
          </li>
        </ul>
        <ul
          className={clsx(
            'md:flex md:items-center',
            'max-md:fixed max-md:top-0 max-md:left-0 max-md:h-screen max-md:w-screen',
            'max-md:flex-col max-md:items-center max-md:justify-center max-md:text-center',
            isMobileMenuVisible ? 'max-md:flex' : 'max-md:hidden',
            'max-md:z-10 max-md:bg-white/[0.975]',
            'max-md:gap-y-4 md:max-lg:gap-x-4 lg:gap-x-8'
          )}
        >
          {navLinks.map(link => (
            <li key={link.href} className="flex">
              <a
                href={link.href}
                className={clsx(
                  currentUrl === link.href && 'active',
                  'relative p-4 tracking-[0.2rem] text-gray-700 no-underline',
                  'after:absolute after:right-0 after:bottom-0 after:left-0 after:mx-auto after:w-[calc(100%-1.5rem)]',
                  '[&.active]:font-bold',
                  "[&.active]:after:h-[5px] [&.active]:after:rounded-[25px] [&.active]:after:content-['']",
                  '[&.active]:after:from-primary [&.active]:after:to-accent [&.active]:after:bg-gradient-to-l',
                  "hover:[&:not(.active)]:after:h-px hover:[&:not(.active)]:after:bg-gray-700 hover:[&:not(.active)]:after:content-['']"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <button
        aria-label="Toggle menu"
        className={clsx(
          'md:hidden',
          'absolute',
          'top-3 right-3',
          'z-[1009]',
          'p-4',
          'bg-transparent',
          'border-none',
          "before:block before:h-px before:w-[30px] before:bg-gray-700 before:content-['']",
          'before:transition-all before:duration-200 before:ease-linear',
          "after:block after:h-px after:w-[30px] after:bg-gray-700 after:content-['']",
          'after:transition-all after:duration-200 after:ease-linear',
          isMobileMenuVisible
            ? 'before:translate-y-[3px] before:rotate-45 after:translate-y-[3px] after:-rotate-45'
            : 'before:mb-[15px]'
        )}
        onClick={() =>
          runWithViewTransition(() => {
            setMobileMenuVisibility(!isMobileMenuVisible);
          })
        }
      />
    </header>
  );
};

export default NavHeader;
