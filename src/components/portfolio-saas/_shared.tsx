import type { ReactNode } from 'react'

type SaasSectionProps = {
  id?: string
  children: ReactNode
  className?: string
  wide?: boolean
}

export function SaasSection({ id, children, className = '', wide = false }: SaasSectionProps) {
  return (
    <section id={id} className={`relative py-20 sm:py-24 lg:py-28 ${className}`}>
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${wide ? 'max-w-[1280px]' : 'max-w-[1180px]'}`}>
        {children}
      </div>
    </section>
  )
}

type SaasHeaderProps = {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'split'
  rightSlot?: ReactNode
}

export function SaasHeader({ eyebrow, title, subtitle, align = 'left', rightSlot }: SaasHeaderProps) {
  const centered = align === 'center'

  if (align === 'split') {
    return (
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <HeaderText eyebrow={eyebrow} title={title} subtitle={subtitle} />
        {rightSlot && <div className="lg:pb-2">{rightSlot}</div>}
      </div>
    )
  }

  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <HeaderText eyebrow={eyebrow} title={title} subtitle={subtitle} centered={centered} />
    </div>
  )
}

function HeaderText({
  eyebrow,
  title,
  subtitle,
  centered = false,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  centered?: boolean
}) {
  return (
    <>
      <p className="text-xs font-black uppercase tracking-[0.16em] text-saas-green">{eyebrow}</p>
      <h2 className="mt-4 text-balance text-3xl font-black leading-[1.04] text-saas-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-base leading-8 text-saas-muted sm:text-lg ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>
          {subtitle}
        </p>
      )}
    </>
  )
}

type SaasCardProps = {
  children: ReactNode
  className?: string
  tone?: 'default' | 'mint' | 'cream' | 'lilac' | 'coral' | 'dark'
  hover?: boolean
}

const toneClass = {
  default: 'border-saas-line bg-saas-surface text-saas-ink',
  mint: 'border-emerald-100 bg-saas-mint text-saas-ink',
  cream: 'border-amber-100 bg-saas-cream text-saas-ink',
  lilac: 'border-violet-100 bg-saas-lilac text-saas-ink',
  coral: 'border-rose-100 bg-saas-coral text-saas-ink',
  dark: 'border-saas-ink bg-saas-ink text-white',
}

export function SaasCard({ children, className = '', tone = 'default', hover = false }: SaasCardProps) {
  return (
    <div
      className={`rounded-[14px] border p-5 shadow-saas-sm ${toneClass[tone]} ${
        hover ? 'transition duration-200 hover:-translate-y-1 hover:shadow-saas-md' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

type SaasButtonProps = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  icon?: ReactNode
  className?: string
}

const buttonClass = {
  primary:
    'bg-saas-green text-white shadow-saas-sm hover:bg-saas-green-strong focus-visible:shadow-saas-focus',
  secondary:
    'border border-saas-line bg-white text-saas-ink hover:border-saas-green hover:text-saas-green focus-visible:shadow-saas-focus',
  ghost: 'text-saas-green hover:text-saas-green-strong',
}

export function SaasButton({ href, children, variant = 'primary', icon, className = '' }: SaasButtonProps) {
  const shape =
    variant === 'ghost'
      ? 'inline-flex items-center gap-2 text-sm font-black transition'
      : 'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-black transition outline-none'

  return (
    <a href={href} className={`${shape} ${buttonClass[variant]} ${className}`}>
      <span>{children}</span>
      {icon}
    </a>
  )
}
