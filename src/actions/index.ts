import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';

import nodemailer from 'nodemailer';

export const server = {
  sendEmail: defineAction({
    input: z.object({
      email: z.string().email(),
      subject: z.string(),
      body: z.string(),
    }),
    handler: async input => {
      try {
        // Create a transporter
        const transporter = nodemailer.createTransport({
          host: import.meta.env.SMTP_HOST,
          port: 465,
          secure: true,
          auth: {
            user: import.meta.env.CONTACT_EMAIL,
            pass: import.meta.env.CONTACT_PASSWORD,
          },
        });

        // Send the email
        await transporter.sendMail({
          from: import.meta.env.CONTACT_EMAIL,
          to: import.meta.env.DESTINATION_EMAIL,
          subject: `${input.subject} [${input.email}]`,
          text: input.body,
        });

        return { message: 'Email sent successfully' };
      } catch (error) {
        console.error(error);
        throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to send email' });
      }
    },
  }),
};
