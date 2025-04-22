/// <reference types="astro/content" />

interface ImportMetaEnv {
  readonly SMTP_HOST: string;
  readonly CONTACT_EMAIL: string;
  readonly CONTACT_PASSWORD: string;
  readonly DESTINATION_EMAIL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
