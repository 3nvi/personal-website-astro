import type { ComponentProps } from 'preact';
import clsx from 'clsx';

interface ButtonProps extends ComponentProps<'button'> {
  disabled?: boolean;
  className?: string;
}

const Button = ({ disabled, className, ...rest }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={clsx(
        'from-primary to-accent w-full rounded-3xl bg-gradient-to-l px-12 py-4 font-[system-ui] text-sm leading-none font-bold tracking-[0.15rem] text-white uppercase transition-all duration-150 ease-in-out hover:scale-[1.065] md:w-auto',
        disabled && 'disabled:pointer-events-none disabled:opacity-30',
        className
      )}
      {...rest}
    />
  );
};

export default Button;
