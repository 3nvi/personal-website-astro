import clsx from 'clsx';
import type { ComponentProps, VNode } from 'preact';

interface Props extends ComponentProps<'h1'> {
  children: VNode | string;
  size?: 'small' | 'large';
  className?: string;
}

const Heading = ({ size = 'large', className, ...rest }: Props) => {
  return (
    <h1
      className={clsx(
        className,
        'font-playfair text-5xl',
        size === 'small' && 'md:text-6xl lg:text-6xl xl:text-7xl',
        size === 'large' && 'md:text-8xl lg:text-9xl xl:text-[10rem]'
      )}
      {...rest}
    />
  );
};

export const BorderedHeading = (props: Props) => (
  <Heading {...props} className="border-solid border-gray-700 max-md:border-y-8 max-md:py-4" />
);

export default Heading;
