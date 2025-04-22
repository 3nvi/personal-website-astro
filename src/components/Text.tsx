import clsx from 'clsx';

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  spaced?: boolean;
}

const Text = ({ spaced = false, className, ...rest }: Props) => {
  return (
    <p
      className={clsx(
        'my-8 leading-[1.7rem] text-gray-400',
        spaced && 'tracking-widest md:tracking-[0.15rem]',
        className
      )}
      {...rest}
    />
  );
};

export default Text;
