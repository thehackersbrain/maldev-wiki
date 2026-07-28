import { getCollection } from 'astro:content';
import { categories } from '../data/categories';

export interface NavPage {
  title: string;
  href: string;
  active: boolean;
}

export interface NavSection {
  slug: string;
  name: string;
  sym: string;
  href: string;
  pages: NavPage[];
  /** true when the current page lives in this section */
  open: boolean;
}

/** The docs tree, shared by the desktop sidebar and the compact mobile/tablet nav. */
export async function getNavSections(pathname: string): Promise<NavSection[]> {
  const entries = (await getCollection('techniques')).filter((e) => !e.data.draft);
  const path = pathname.replace(/\/$/, '');

  return categories.map((cat) => {
    const pages = entries
      .filter((e) => e.data.category === cat.slug)
      .sort((a, b) => a.data.title.localeCompare(b.data.title))
      .map((e) => {
        const href = `/techniques/${e.id}`;
        return { title: e.data.title, href, active: href === path };
      });

    return {
      slug: cat.slug,
      name: cat.name,
      sym: cat.sym,
      href: `/techniques/${cat.slug}`,
      pages,
      open: path === `/techniques/${cat.slug}` || pages.some((p) => p.active),
    };
  });
}
