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
    <section id={id} className={cn('relative py-18 sm:py-22 lg:py-24', className)}>
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
      <p className="text-xs font-semibold uppercase text-saas-accent">{eyebrow}</p>
      <h2 className="mt-3 max-w-full text-balance break-words text-3xl font-semibold leading-[1.12] text-saas-ink sm:text-4xl lg:text-[2.5rem]">
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'mt-4 max-w-full break-words text-base leading-7 text-saas-muted text-pretty',
          centered ? 'mx-auto max-w-2xl' : 'max-w-xl'
        )}>
          {subtitle}
        </p>
      )}
    </>
  )
}

type SaasButtonProps = {
  href: string
  children: ReactNode
  icon?: ReactNode
  className?: string
}

export function SaasButton({ href, children, icon, className }: SaasButtonProps) {
  const shape = 'inline-flex items-center justify-center gap-2 rounded-[6px] px-5 py-2.5 text-sm font-semibold transition-colors outline-none'

  return (
    <a href={href} className={cn(shape, 'bg-saas-accent text-white hover:bg-saas-accent-strong', className)}>
      <span className="min-w-0">{children}</span>
      {icon}
    </a>
  )
}
