import type { ReactNode } from 'react'

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  bleed?: boolean
}

export function Section({ id, children, className = '', bleed = false }: SectionProps) {
  return (
    <section id={id} className={`relative ${bleed ? '' : 'border-t border-console-line/60'} ${className}`}>
      <div className="mx-auto w-full max-w-[1320px] px-6 sm:px-8 lg:px-12">{children}</div>
    </section>
  )
}

interface EyebrowProps {
  label: string
  index?: string
}

export function Eyebrow({ label, index }: EyebrowProps) {
  return (
    <div className="console-eyebrow">
      {index && <span className="text-console-text-2">{index}</span>}
      <span>{label}</span>
    </div>
  )
}

interface SectionHeaderProps {
  eyebrow: string
  index: string
  title: string
  subtitle?: string
  align?: 'left' | 'split'
  rightSlot?: ReactNode
}

export function SectionHeader({ eyebrow, index, title, subtitle, align = 'left', rightSlot }: SectionHeaderProps) {
  if (align === 'split') {
    return (
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl">
          <Eyebrow label={eyebrow} index={index} />
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight text-console-text sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-console-text-2 sm:text-lg">{subtitle}</p>
          )}
        </div>
        {rightSlot && <div className="lg:pb-2">{rightSlot}</div>}
      </div>
    )
  }
  return (
    <div className="max-w-3xl">
      <Eyebrow label={eyebrow} index={index} />
      <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight text-console-text sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-console-text-2 sm:text-lg">{subtitle}</p>
      )}
    </div>
  )
}

export function Panel({
  children,
  className = '',
  hover = false,
  corners = false,
}: {
  children: ReactNode
  className?: string
  hover?: boolean
  corners?: boolean
}) {
  return (
    <div className={`console-panel ${hover ? 'console-panel-hover' : ''} ${className}`}>
      {corners && (
        <>
          <span className="console-corner tl" />
          <span className="console-corner tr" />
          <span className="console-corner bl" />
          <span className="console-corner br" />
        </>
      )}
      {children}
    </div>
  )
}

export function MonoTag({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`console-mono inline-flex items-center gap-2 rounded-sm border border-console-line bg-console-panel-2 px-2.5 py-1 text-[10.5px] uppercase tracking-[0.18em] text-console-text-2 ${className}`}>
      {children}
    </span>
  )
}
