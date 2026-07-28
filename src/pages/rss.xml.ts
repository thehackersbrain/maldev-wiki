import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../lib/seo';
import { categoryBySlug } from '../data/categories';

export async function GET(context: APIContext) {
  const entries = (await getCollection('techniques'))
    .filter((e) => !e.data.draft)
    .sort((a, b) => b.data.updated.localeCompare(a.data.updated));

  return rss({
    title: `${site.name} — recently updated`,
    description: site.description,
    site: context.site ?? site.url,
    trailingSlash: false,
    items: entries.map((e) => ({
      title: e.data.title,
      description: e.data.summary,
      link: `/techniques/${e.id}`,
      pubDate: new Date(`${e.data.updated}T00:00:00Z`),
      author: e.data.author,
      categories: [
        categoryBySlug.get(e.data.category)?.name ?? e.data.category,
        e.data.mitre,
        ...e.data.platform,
      ],
    })),
    customData: '<language>en</language>',
  });
}
