import type { BaseSyntheticEvent, ReactElement } from 'react';
import { useState } from 'preact/hooks';
import { actions } from 'astro:actions';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/Button';
import TextareaAutosize from '@/components/TextareaAutosize';
const formFieldClasses = 'w-full border-b border-gray-200 py-2 outline-none focus:border-gray-400';

const validationSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Please enter an email to respond to'),
  subject: z
    .string()
    .max(40, 'Please enter no more than 40 characters')
    .min(1, 'Please enter a subject for your message'),
  body: z.string().min(1, 'Please enter a message'),
});

type FormValues = z.infer<typeof validationSchema>;

export const ContactForm = () => {
  const [isMessageSent, setMessageSent] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid, touchedFields },
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      subject: '',
      body: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    const { error } = await actions.sendEmail(values);
    if (error) {
      setError('root.serverError', {
        message: error.message || 'An unexpected error occurred',
      });
    } else {
      setMessageSent(true);
    }
  };

  if (isMessageSent) {
    return (
      <div className="mt-4 rounded bg-gray-700 px-4 py-8 text-center text-white">
        Your message has been sent!
      </div>
    );
  }

  return (
    <form
      onSubmit={e => handleSubmit(onSubmit)(e as unknown as BaseSyntheticEvent)}
      className="space-y-12 pb-4"
      noValidate
    >
      <fieldset className="space-y-1">
        <label htmlFor="email" className="text-sm text-gray-500">
          Your email address
        </label>
        <input {...register('email')} type="email" id="email" className={formFieldClasses} />
        {errors.email && touchedFields.email && (
          <p className="text-xs text-red-600">{errors.email.message}</p>
        )}
      </fieldset>
      <fieldset className="space-y-1">
        <label htmlFor="subject" className="text-sm text-gray-500">
          Subject
        </label>
        <input {...register('subject')} type="text" id="subject" className={formFieldClasses} />
        {errors.subject && touchedFields.subject && (
          <p className="text-xs text-red-600">{errors.subject.message}</p>
        )}
      </fieldset>
      <fieldset className="space-y-1">
        <label htmlFor="body" className="text-sm text-gray-500">
          Message
        </label>
        <Controller
          name="body"
          control={control}
          render={({ field }) =>
            (<TextareaAutosize {...field} id="body" className={formFieldClasses} />) as ReactElement
          }
        />
        {errors.body && touchedFields.body && (
          <p className="text-xs text-red-600">{errors.body.message}</p>
        )}
      </fieldset>
      {errors.root && (
        <div className="my-2">
          <p className="text-xs text-red-600">{errors.root.serverError.message}</p>
        </div>
      )}
      <div className="grid">
        <Button type="submit" disabled={isSubmitting || !isValid}>
          Send message
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
