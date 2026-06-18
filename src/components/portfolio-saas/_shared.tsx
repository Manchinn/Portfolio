import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SaasSectionProps = {
  id?: string
  children: ReactNode
  className?: string
  wide?: boolean
}

export function SaasSection({ id, children, className, wide = false }: SaasSectionProps) {
  return (
    <section id={id} className={cn('relative py-24 sm:py-28 lg:py-32', className)}>
      <div className={cn('mx-auto min-w-0 max-w-full px-4 sm:px-6 lg:px-8', wide ? 'max-w-[1280px]' : 'max-w-[1180px]')}>
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
      <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="min-w-0">
          <HeaderText eyebrow={eyebrow} title={title} subtitle={subtitle} />
        </div>
        {rightSlot && <div className="lg:pb-2">{rightSlot}</div>}
      </div>
    )
  }

  return (
    <div className={cn('min-w-0 max-w-3xl', centered && 'mx-auto text-center')}>
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
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-saas-muted">{eyebrow}</p>
      <h2 className="mt-4 max-w-full text-balance break-words text-3xl font-bold leading-[1.08] tracking-tight text-saas-ink sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'mt-4 max-w-full break-words text-base font-light leading-8 text-saas-muted text-pretty',
          centered ? 'mx-auto max-w-2xl' : 'max-w-xl'
        )}>
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
  default: 'bg-transparent text-saas-ink',
  mint: 'bg-saas-surface-soft text-saas-ink',
  cream: 'bg-saas-surface-soft text-saas-ink',
  lilac: 'bg-saas-surface-soft text-saas-ink',
  coral: 'bg-saas-surface-soft text-saas-ink',
  dark: 'bg-saas-surface-soft text-white',
}

export function SaasCard({ children, className, tone = 'default', hover = false }: SaasCardProps) {
  const isDefault = tone === 'default'
  const baseClass = isDefault
    ? 'min-w-0 max-w-full'
    : 'min-w-0 max-w-full overflow-hidden rounded-[20px] border border-saas-line p-6 shadow-saas-sm'

  return (
    <div
      className={cn(
        baseClass,
        toneClass[tone],
        hover && 'transition duration-200 hover:-translate-y-0.5 hover:shadow-saas-md',
        className
      )}
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
    'bg-white text-black hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black',
  secondary:
    'text-white hover:text-neutral-300 border border-saas-line hover:bg-saas-surface-soft',
  ghost: 'text-white hover:text-neutral-300',
}

export function SaasButton({ href, children, variant = 'primary', icon, className }: SaasButtonProps) {
  const shape =
    variant === 'primary'
      ? 'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition outline-none'
      : 'inline-flex items-center gap-2 text-sm font-semibold transition outline-none'

  return (
    <a href={href} className={cn(shape, buttonClass[variant], className)}>
      <span>{children}</span>
      {icon}
    </a>
  )
}
