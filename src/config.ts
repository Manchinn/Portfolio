import type {
  ExpressiveCodeConfig,
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'

export const siteConfig: SiteConfig = {
  title: 'Chinnakrit',
  subtitle: 'Notes, runbooks, and projects',
  lang: 'en',
  themeColor: {
    hue: 200,
    fixed: false,
  },
  banner: {
    enable: true,
    src: '/og/og-en.png',
    position: 'center',
    credit: {
      enable: false,
      text: '',
      url: '',
    },
  },
  toc: {
    enable: true,
    depth: 3,
  },
  favicon: [{ src: '/favicon.svg', sizes: 'any' }],
}

export const navBarConfig: NavBarConfig = {
  links: [
    { name: 'Home', url: '/' },
    { name: 'Notes', url: '/posts/' },
    { name: 'Work', url: '/#work' },
    { name: 'Thai', url: '/th/' },
  ],
}

export const profileConfig: ProfileConfig = {
  avatar: '/og/og-en.png',
  name: 'Chinnakrit',
  bio: 'A public record of tools, workflows, and experiments.',
  links: [
    { name: 'GitHub', icon: 'fa6-brands:github', url: 'https://github.com/Manchinn' },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: false,
  name: '',
  url: '',
}

export const expressiveCodeConfig: ExpressiveCodeConfig = {
  theme: 'github-dark',
}
