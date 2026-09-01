import { useState, type ReactNode } from 'react'
import { Menu, X } from 'lucide-react'

type Link = { href: string; label: ReactNode }

export default function MobileMenu({ links, alternateHref }: { links: Link[]; alternateHref: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="grid h-9 w-9 place-items-center rounded-md border border-line bg-surface text-ink"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>
      {open && (
        <div className="absolute top-[64px] right-4 left-4 z-50 overflow-hidden rounded-lg border border-line bg-surface shadow-md">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line px-4 py-3 text-sm font-medium text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={alternateHref}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-accent"
              >
                {alternateHref === '/th' ? 'ไทย' : 'English'}
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
