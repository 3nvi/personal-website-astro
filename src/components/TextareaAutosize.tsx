import type { ComponentProps } from 'preact';
import { useRef, useLayoutEffect } from 'preact/hooks';

const TextareaAutosize = (props: ComponentProps<'textarea'>) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight + 1}px`;
    }
  }, [props.value]);

  return <textarea ref={textareaRef} {...props} />;
};

export default TextareaAutosize;
