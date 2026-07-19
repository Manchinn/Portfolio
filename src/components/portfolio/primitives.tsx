import type { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type PortfolioSectionProps = {
  id?: string
  children: ReactNode
  className?: string
  wide?: boolean
}

export function PortfolioSection({ id, children, className, wide = false }: PortfolioSectionProps) {
  return (
    <section id={id} className={cn('relative py-18 sm:py-22 lg:py-24', className)}>
      <div className={cn('mx-auto min-w-0 max-w-full px-4 sm:px-6 lg:px-8', wide ? 'max-w-[1280px]' : 'max-w-[1180px]')}>
        {children}
      </div>
    </section>
  )
}

type PortfolioHeaderProps = {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'split'
  rightSlot?: ReactNode
}

export function PortfolioHeader({ eyebrow, title, subtitle, align = 'left', rightSlot }: PortfolioHeaderProps) {
  const centered = align === 'center'

  if (align === 'split') {
    return (
      <div className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
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
      <p className="text-xs font-semibold uppercase text-portfolio-accent">{eyebrow}</p>
      <h2 className="mt-3 max-w-full text-balance break-words text-3xl font-semibold leading-[1.12] text-portfolio-ink sm:text-4xl lg:text-[2.5rem]">
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'mt-4 max-w-full break-words text-base leading-7 text-portfolio-muted text-pretty',
          centered ? 'mx-auto max-w-2xl' : 'max-w-xl'
        )}>
          {subtitle}
        </p>
      )}
    </>
  )
}

type PortfolioButtonProps = {
  href: string
  children: ReactNode
  icon?: ReactNode
  className?: string
  variant?: 'primary' | 'secondary'
  external?: boolean
}

export function PortfolioButton({
  href,
  children,
  icon,
  className,
  variant = 'primary',
  external = false,
}: PortfolioButtonProps) {
  const shape = 'inline-flex items-center justify-center gap-2 rounded-[6px] px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent'
  const appearance = variant === 'primary'
    ? 'bg-portfolio-accent text-white hover:bg-portfolio-accent-strong'
    : 'border border-portfolio-line bg-portfolio-surface text-portfolio-ink hover:border-portfolio-accent hover:text-portfolio-accent-strong'
  const classes = cn(shape, appearance, className)

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        <span className="min-w-0">{children}</span>
        {icon}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      <span className="min-w-0">{children}</span>
      {icon}
    </Link>
  )
}
