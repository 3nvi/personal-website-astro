// src/pages/rss.xml.js
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const publications = await getCollection('publications'); // Replace 'blog' with your collection name

  return rss({
    title: 'Aggelos Arvanitakis RSS Feed',
    description: 'An RSS feed of all the articles published by Aggelos Arvanitakis',
    site: context.site!,
    items: publications.map(({ data: publication }) => ({
      title: publication.title,
      pubDate: new Date(publication.createdAt),
      description: publication.description,
      link: publication.href,
      guid: publication.href,
      custom_elements: [{ readingTime: publication.timeInMinutes }],
    })),
    customData: `<language>en-us</language>`,
  });
}
