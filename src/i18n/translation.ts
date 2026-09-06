import { getUI, type Language } from './ui'
import I18nKey from './i18nKey'

const keys: Record<Language, Record<I18nKey, string>> = {
  en: {
    [I18nKey.home]: 'Home',
    [I18nKey.about]: 'About',
    [I18nKey.archive]: 'Archive',
    [I18nKey.search]: 'Search',
    [I18nKey.tags]: 'Tags',
    [I18nKey.categories]: 'Categories',
    [I18nKey.recentPosts]: 'Recent Notes',
    [I18nKey.comments]: 'Comments',
    [I18nKey.untitled]: 'Untitled',
    [I18nKey.uncategorized]: 'Uncategorized',
    [I18nKey.noTags]: 'No Tags',
    [I18nKey.wordCount]: 'word',
    [I18nKey.wordsCount]: 'words',
    [I18nKey.minuteCount]: 'minute',
    [I18nKey.minutesCount]: 'minutes',
    [I18nKey.postCount]: 'note',
    [I18nKey.postsCount]: 'notes',
    [I18nKey.themeColor]: 'Theme Color',
    [I18nKey.lightMode]: 'Light',
    [I18nKey.darkMode]: 'Dark',
    [I18nKey.systemMode]: 'System',
    [I18nKey.more]: 'More',
    [I18nKey.author]: 'Author',
    [I18nKey.publishedAt]: 'Published at',
    [I18nKey.license]: 'License',
  },
  th: {
    [I18nKey.home]: 'หน้าแรก',
    [I18nKey.about]: 'เกี่ยวกับ',
    [I18nKey.archive]: 'คลัง',
    [I18nKey.search]: 'ค้นหา',
    [I18nKey.tags]: 'ป้ายกำกับ',
    [I18nKey.categories]: 'หมวดหมู่',
    [I18nKey.recentPosts]: 'บันทึกล่าสุด',
    [I18nKey.comments]: 'ความคิดเห็น',
    [I18nKey.untitled]: 'ไม่ได้ตั้งชื่อ',
    [I18nKey.uncategorized]: 'ไม่ได้จัดหมวดหมู่',
    [I18nKey.noTags]: 'ไม่มีป้ายกำกับ',
    [I18nKey.wordCount]: 'คำ',
    [I18nKey.wordsCount]: 'คำ',
    [I18nKey.minuteCount]: 'นาที',
    [I18nKey.minutesCount]: 'นาที',
    [I18nKey.postCount]: 'บันทึก',
    [I18nKey.postsCount]: 'บันทึก',
    [I18nKey.themeColor]: 'สีของธีม',
    [I18nKey.lightMode]: 'สว่าง',
    [I18nKey.darkMode]: 'มืด',
    [I18nKey.systemMode]: 'ตามระบบ',
    [I18nKey.more]: 'ดูเพิ่ม',
    [I18nKey.author]: 'ผู้เขียน',
    [I18nKey.publishedAt]: 'เผยแพร่เมื่อ',
    [I18nKey.license]: 'สัญญาอนุญาต',
  },
}

export type Translation = Record<I18nKey, string>

export function getTranslation(lang: string): Translation {
  return keys[(lang.toLowerCase().startsWith('th') ? 'th' : 'en') as Language]
}

export function i18n(key: I18nKey, lang?: Language): string {
  return getTranslation(lang ?? 'en')[key] ?? getUI(lang ?? 'en').brand
}
