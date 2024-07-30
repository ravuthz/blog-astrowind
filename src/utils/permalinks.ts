import slugify from 'limax';

import { SITE, APP_BLOG } from 'astrowind:config';

import { trim } from '~/utils/utils';
import type { MenuItems, MenuItem, Href } from '~/types';

export const trimSlash = (s: string) => trim(trim(s, '/'));
const createPath = (...params: string[]) => {
  const paths = params
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
  return '/' + paths + (SITE.trailingSlash && paths ? '/' : '');
};

const BASE_PATHNAME = SITE.base || '/';

export const cleanSlug = (text = '') =>
  trimSlash(text)
    .split('/')
    .map((slug) => slugify(slug))
    .join('/');

export const BLOG_BASE = cleanSlug(APP_BLOG?.list?.pathname);
export const CATEGORY_BASE = cleanSlug(APP_BLOG?.category?.pathname);
export const TAG_BASE = cleanSlug(APP_BLOG?.tag?.pathname) || 'tag';

export const POST_PERMALINK_PATTERN = trimSlash(APP_BLOG?.post?.permalink || `${BLOG_BASE}/%slug%`);

/** */
export const getCanonical = (path = ''): string | URL => {
  const url = String(new URL(path, SITE.site));
  if (SITE.trailingSlash == false && path && url.endsWith('/')) {
    return url.slice(0, -1);
  } else if (SITE.trailingSlash == true && path && !url.endsWith('/')) {
    return url + '/';
  }
  return url;
};

/** */
export const getPermalink = (slug = '', type = 'page'): string => {
  let permalink: string;

  if (
    slug.startsWith('https://') ||
    slug.startsWith('http://') ||
    slug.startsWith('://') ||
    slug.startsWith('#') ||
    slug.startsWith('javascript:')
  ) {
    return slug;
  }

  switch (type) {
    case 'home':
      permalink = getHomePermalink();
      break;

    case 'blog':
      permalink = getBlogPermalink();
      break;

    case 'asset':
      permalink = getAsset(slug);
      break;

    case 'category':
      permalink = createPath(CATEGORY_BASE, trimSlash(slug));
      break;

    case 'tag':
      permalink = createPath(TAG_BASE, trimSlash(slug));
      break;

    case 'post':
      permalink = createPath(trimSlash(slug));
      break;

    case 'page':
    default:
      permalink = createPath(slug);
      break;
  }

  return definitivePermalink(permalink);
};

/** */
export const getHomePermalink = (): string => getPermalink('/');

/** */
export const getBlogPermalink = (): string => getPermalink(BLOG_BASE);

/** */
export const getAsset = (path: string): string =>
  '/' +
  [BASE_PATHNAME, path]
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');

/** */
const definitivePermalink = (permalink: string): string => createPath(BASE_PATHNAME, permalink);



/** */
export const applyGetPermalinks = (menu: MenuItems): MenuItems => {
  if (Array.isArray(menu)) {
    return menu.map((item) => applyGetPermalinks(item)) as MenuItems;
  } else if (typeof menu === 'object' && menu !== null) {
    const obj: MenuItem = { href: '' };
    for (const key in menu) {
      if (key === 'href') {
        
        if (typeof menu[key] === 'string') {
          obj[key] = getPermalink(menu[key] as string);
        } else if (typeof menu[key] === 'object') {
          const href = menu[key] as Href;

          switch (href.type) {
            case 'home':
              obj[key] = getHomePermalink();
              break;

            case 'blog':
              obj[key] = getBlogPermalink();
              break;

            case 'asset':
              obj[key] = getAsset(href.url);
              break;

            default:
              obj[key] = getPermalink(href.url, href.type);
              break;
          }
        }
      } else {
        obj[key] = applyGetPermalinks(menu[key] as MenuItems);
      }
    }
    return obj;
  }
  return menu;
};
