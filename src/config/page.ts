import { fetchProfileData } from './profile';

const { personal, socialLinks } = await fetchProfileData();

export const blogHeaderData = {
  links: [
    { text: 'Home', href: '/' },
    { text: 'Blog', href: '/blog' },
    { text: 'Github', href: personal.github }
  ]
};

export const headerData = {
  links: [
    { text: 'Home', href: '#' },
    { text: 'About', href: '#about' },
    { text: 'Resume', href: '#resume' },
    { text: 'Blog', href: '/blog' },
    { text: 'Github', href: personal.github }
  ]
};

export const footerData = {
  links: [
  // {
  //   title: 'Product',
  //   links: [
  //     { text: 'Features', href: '#' },
  //     { text: 'Security', href: '#' },
  //     { text: 'Team', href: '#' },
  //     { text: 'Enterprise', href: '#' },
  //     { text: 'Customer stories', href: '#' },
  //     { text: 'Pricing', href: '#' },
  //     { text: 'Resources', href: '#' },
  //   ],
  // },
  // {
  //   title: 'Platform',
  //   links: [
  //     { text: 'Developer API', href: '#' },
  //     { text: 'Partners', href: '#' },
  //     { text: 'Atom', href: '#' },
  //     { text: 'Electron', href: '#' },
  //     { text: 'AstroWind Desktop', href: '#' },
  //   ],
  // },
  // {
  //   title: 'Support',
  //   links: [
  //     { text: 'Docs', href: '#' },
  //     { text: 'Community Forum', href: '#' },
  //     { text: 'Professional Services', href: '#' },
  //     { text: 'Skills', href: '#' },
  //     { text: 'Status', href: '#' },
  //   ],
  // },
  // {
  //   title: 'Company',
  //   links: [
  //     { text: 'About', href: '#' },
  //     { text: 'Blog', href: '#' },
  //     { text: 'Careers', href: '#' },
  //     { text: 'Press', href: '#' },
  //     { text: 'Inclusion', href: '#' },
  //     { text: 'Social Impact', href: '#' },
  //     { text: 'Shop', href: '#' },
  //   ],
  // },
  // ],
  // secondaryLinks: [
  //   { text: 'Terms', href: getPermalink('/terms') },
  //   { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks,
  footNote: `Ravuthz <strong>©</strong> ${new Date().getFullYear()} · All rights reserved.`,
  // footNote: `
  //   <img class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm" src="https://onwidget.com/favicon/favicon-32x32.png" alt="onWidget logo" loading="lazy"></img>
  //   Made by <a class="text-blue-600 underline dark:text-muted" href="https://onwidget.com/"> onWidget</a> · All rights reserved.
  // `,
};
