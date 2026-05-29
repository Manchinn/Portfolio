'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Eye,
  Heart,
  MapPin,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  UserRound,
} from 'lucide-react'

type FrameType = 'full-rim' | 'half-rim' | 'rimless'
type Material = 'acetate' | 'metal' | 'titanium' | 'mixed'
type Style = 'daily' | 'business' | 'fashion' | 'sport'
type Service = 'eye-test' | 'pickup' | 'repair' | 'contact-lens'
type FaqCategory = 'ordering' | 'lenses' | 'warranty' | 'store visit' | 'membership' | 'booking'

type Product = {
  id: string
  name: string
  slug: string
  price: number
  frameType: FrameType
  colors: string[]
  material: Material
  style: Style
  image: string
  badges: string[]
  recommended: number
  isNew: boolean
}

type StoreLocation = {
  id: string
  name: string
  area: string
  province: string
  transit?: string
  address: string
  hours: string
  phone: string
  services: Service[]
  availableSlots: string[]
  openNow: boolean
}

type BookingDetails = {
  name: string
  phone: string
  email: string
  serviceType: Service
  contactMethod: 'phone' | 'email' | 'line'
  note: string
}

type FaqItem = {
  id: string
  category: FaqCategory
  question: string
  answer: string
}

const products: Product[] = [
  {
    id: 'p-101',
    name: 'Clearview Daily 01',
    slug: 'clearview-daily-01',
    price: 1890,
    frameType: 'full-rim',
    colors: ['black', 'sand'],
    material: 'acetate',
    style: 'daily',
    image: 'CV',
    badges: ['Best fit', 'Lightweight'],
    recommended: 95,
    isNew: false,
  },
  {
    id: 'p-102',
    name: 'Northline Titanium',
    slug: 'northline-titanium',
    price: 3490,
    frameType: 'half-rim',
    colors: ['silver', 'navy'],
    material: 'titanium',
    style: 'business',
    image: 'NT',
    badges: ['Premium', 'Office'],
    recommended: 90,
    isNew: true,
  },
  {
    id: 'p-103',
    name: 'Aero Rimless Lite',
    slug: 'aero-rimless-lite',
    price: 2890,
    frameType: 'rimless',
    colors: ['clear', 'silver'],
    material: 'metal',
    style: 'daily',
    image: 'AR',
    badges: ['Minimal', 'Feather fit'],
    recommended: 86,
    isNew: false,
  },
  {
    id: 'p-104',
    name: 'Metro Square Flex',
    slug: 'metro-square-flex',
    price: 2190,
    frameType: 'full-rim',
    colors: ['brown', 'black'],
    material: 'mixed',
    style: 'fashion',
    image: 'MS',
    badges: ['Style edit', 'Flexible'],
    recommended: 82,
    isNew: true,
  },
  {
    id: 'p-105',
    name: 'Active Clip Sport',
    slug: 'active-clip-sport',
    price: 2590,
    frameType: 'full-rim',
    colors: ['blue', 'black'],
    material: 'mixed',
    style: 'sport',
    image: 'AC',
    badges: ['Sport', 'Clip option'],
    recommended: 78,
    isNew: false,
  },
  {
    id: 'p-106',
    name: 'Studio Round Metal',
    slug: 'studio-round-metal',
    price: 2390,
    frameType: 'half-rim',
    colors: ['gold', 'rose'],
    material: 'metal',
    style: 'fashion',
    image: 'SR',
    badges: ['New tone', 'Light feel'],
    recommended: 88,
    isNew: true,
  },
]

const stores: StoreLocation[] = [
  {
    id: 's-101',
    name: 'Vision Lane Siam',
    area: 'Siam',
    province: 'Bangkok',
    transit: 'BTS Siam',
    address: 'Fictional retail floor, Rama I area',
    hours: '10:00 - 21:00',
    phone: '02-000-1101',
    services: ['eye-test', 'pickup', 'repair', 'contact-lens'],
    availableSlots: ['10:30', '13:00', '16:30'],
    openNow: true,
  },
  {
    id: 's-102',
    name: 'Vision Lane Ari',
    area: 'Ari',
    province: 'Bangkok',
    transit: 'BTS Ari',
    address: 'Fictional neighborhood plaza, Phahon area',
    hours: '10:00 - 20:00',
    phone: '02-000-1102',
    services: ['eye-test', 'pickup', 'repair'],
    availableSlots: ['11:00', '14:00', '18:00'],
    openNow: true,
  },
  {
    id: 's-103',
    name: 'Vision Lane Chiang Mai',
    area: 'Nimman',
    province: 'Chiang Mai',
    address: 'Fictional lifestyle mall, Nimman district',
    hours: '10:30 - 20:30',
    phone: '053-000-110',
    services: ['pickup', 'repair', 'contact-lens'],
    availableSlots: ['12:00', '15:30'],
    openNow: false,
  },
  {
    id: 's-104',
    name: 'Vision Lane Phuket',
    area: 'Central Phuket',
    province: 'Phuket',
    address: 'Fictional island retail center',
    hours: '11:00 - 21:00',
    phone: '076-000-110',
    services: ['eye-test', 'pickup', 'contact-lens'],
    availableSlots: ['13:30', '17:30', '19:00'],
    openNow: true,
  },
]

const faqs: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'ordering',
    question: 'Can I reserve frames before visiting a store?',
    answer: 'Yes. In this prototype, a customer can add a frame to a wishlist and continue into a store booking flow.',
  },
  {
    id: 'faq-2',
    category: 'lenses',
    question: 'How are lens options selected?',
    answer: 'Lens options are shown as frontend-only choices so the customer can compare everyday, blue-filter, and progressive mock packages.',
  },
  {
    id: 'faq-3',
    category: 'warranty',
    question: 'Where are warranty details displayed?',
    answer: 'Warranty content is grouped in guide cards and FAQ answers so it can become SEO-friendly static content later.',
  },
  {
    id: 'faq-4',
    category: 'store visit',
    question: 'Can customers find stores with eye-test service?',
    answer: 'Yes. The locator filters fictional branches by service, transit access, and open-now status.',
  },
  {
    id: 'faq-5',
    category: 'membership',
    question: 'Is this real authentication?',
    answer: 'No. The member panel is mock auth state only. It demonstrates account UI without passwords, tokens, or a backend.',
  },
  {
    id: 'faq-6',
    category: 'booking',
    question: 'Does the booking form submit data?',
    answer: 'No. The flow validates inputs and reaches confirmation in React state only. No external API is called.',
  },
]

const lensOptions = ['Everyday clear', 'Blue-filter comfort', 'Progressive mock']
const categories: FaqCategory[] = ['ordering', 'lenses', 'warranty', 'store visit', 'membership', 'booking']
const services: Service[] = ['eye-test', 'pickup', 'repair', 'contact-lens']

const formatBaht = (value: number) => new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 }).format(value)

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-5">
      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-teal-700">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-black leading-tight text-slate-950 sm:text-3xl">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-slate-600">{description}</p>
    </div>
  )
}

function Badge({ children }: { children: string }) {
  return (
    <span className="rounded-sm border border-slate-200 bg-white px-2 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-slate-600">
      {children}
    </span>
  )
}

export default function OpticalRetailDemoPage() {
  const [query, setQuery] = useState('')
  const [frameType, setFrameType] = useState<'all' | FrameType>('all')
  const [material, setMaterial] = useState<'all' | Material>('all')
  const [style, setStyle] = useState<'all' | Style>('all')
  const [sort, setSort] = useState<'recommended' | 'price-low' | 'newest'>('recommended')
  const [selectedProductId, setSelectedProductId] = useState(products[0].id)
  const [selectedLens, setSelectedLens] = useState(lensOptions[0])

  const [storeQuery, setStoreQuery] = useState('')
  const [requiredService, setRequiredService] = useState<'all' | Service>('all')
  const [nearTransit, setNearTransit] = useState(false)
  const [openNow, setOpenNow] = useState(false)
  const [selectedStoreId, setSelectedStoreId] = useState(stores[0].id)

  const [bookingStep, setBookingStep] = useState(1)
  const [selectedSlot, setSelectedSlot] = useState(stores[0].availableSlots[0])
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    name: '',
    phone: '',
    email: '',
    serviceType: 'eye-test',
    contactMethod: 'phone',
    note: '',
  })
  const [bookingErrors, setBookingErrors] = useState<string[]>([])

  const [memberLoggedIn, setMemberLoggedIn] = useState(false)
  const [faqCategory, setFaqCategory] = useState<'all' | FaqCategory>('all')
  const [faqQuery, setFaqQuery] = useState('')
  const [openFaqId, setOpenFaqId] = useState(faqs[0].id)

  const selectedProduct = products.find((product) => product.id === selectedProductId) ?? products[0]
  const selectedStore = stores.find((store) => store.id === selectedStoreId) ?? stores[0]

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesQuery = `${product.name} ${product.badges.join(' ')} ${product.colors.join(' ')}`.toLowerCase().includes(query.toLowerCase())
        const matchesFrame = frameType === 'all' || product.frameType === frameType
        const matchesMaterial = material === 'all' || product.material === material
        const matchesStyle = style === 'all' || product.style === style
        return matchesQuery && matchesFrame && matchesMaterial && matchesStyle
      })
      .sort((a, b) => {
        if (sort === 'price-low') return a.price - b.price
        if (sort === 'newest') return Number(b.isNew) - Number(a.isNew)
        return b.recommended - a.recommended
      })
  }, [frameType, material, query, sort, style])

  const filteredStores = useMemo(() => {
    return stores.filter((store) => {
      const matchesQuery = `${store.name} ${store.area} ${store.province} ${store.transit ?? ''}`.toLowerCase().includes(storeQuery.toLowerCase())
      const matchesService = requiredService === 'all' || store.services.includes(requiredService)
      const matchesTransit = !nearTransit || Boolean(store.transit)
      const matchesOpen = !openNow || store.openNow
      return matchesQuery && matchesService && matchesTransit && matchesOpen
    })
  }, [nearTransit, openNow, requiredService, storeQuery])

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory = faqCategory === 'all' || faq.category === faqCategory
      const matchesQuery = `${faq.question} ${faq.answer}`.toLowerCase().includes(faqQuery.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [faqCategory, faqQuery])

  const validateBooking = () => {
    const errors: string[] = []
    if (!selectedStoreId) errors.push('Select a store.')
    if (!selectedSlot) errors.push('Select a time slot.')
    if (!bookingDetails.name.trim()) errors.push('Name is required.')
    if (!bookingDetails.phone.trim()) errors.push('Phone is required.')
    if (!bookingDetails.email.trim()) errors.push('Email is required.')
    if (bookingDetails.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingDetails.email)) errors.push('Use a valid email address.')
    setBookingErrors(errors)
    return errors.length === 0
  }

  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (validateBooking()) setBookingStep(5)
  }

  return (
    <main className="mobile-page min-h-screen bg-[#f7f8f5] text-slate-950">
      <div className="mx-auto grid max-w-[1800px] gap-5 px-4 py-5 lg:px-6">
        <section className="border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8">
          <Link href="/demos" className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-slate-600 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800">
            Back to demos
          </Link>
          <div className="mt-8 grid gap-8 xl:grid-cols-[1.2fr_0.8fr] xl:items-end">
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                <Badge>Public-safe mock</Badge>
                <Badge>Next.js</Badge>
                <Badge>Retail workflow</Badge>
              </div>
              <h1 className="mobile-safe-text max-w-5xl text-3xl font-black leading-tight text-slate-950 sm:text-6xl">
                Optical Retail Web App Demo
              </h1>
              <p className="mobile-safe-text mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
                A fictional optical retail prototype covering product discovery, store locator UX, booking, membership mock state, FAQ search, and SEO-ready route coverage.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              {[
                ['Products', filteredProducts.length.toString(), 'live filtered'],
                ['Stores', filteredStores.length.toString(), 'mock branches'],
                ['Private data', '0', 'not rendered'],
              ].map(([label, value, note]) => (
                <div key={label} className="rounded-md border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">{label}</p>
                  <p className="mt-1 text-3xl font-black text-slate-950">{value}</p>
                  <p className="mt-1 text-xs font-bold text-slate-500">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.72fr_1.55fr]">
          <aside className="grid content-start gap-5">
            <div className="rounded-md border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <SectionHeader
                eyebrow="Safety boundary"
                title="Fictional data only"
                description="No brand assets, product photos, customer data, credentials, private routes, or real store records are included."
              />
              <div className="grid gap-3">
                {['No real optical brand copy', 'No payment or auth provider', 'No map API key', 'No customer records'].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm font-bold text-slate-700">
                    <ShieldCheck className="h-5 w-5 shrink-0 text-teal-700" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-md border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <SectionHeader
                eyebrow="Product detail"
                title={selectedProduct.name}
                description="Detail composition with specs, color/material choices, lens options, and retail CTAs."
              />
              <div className="flex aspect-[4/3] items-center justify-center rounded-md bg-gradient-to-br from-slate-100 to-teal-50 text-6xl font-black text-teal-800">
                {selectedProduct.image}
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-2xl font-black">{formatBaht(selectedProduct.price)}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.colors.map((color) => <Badge key={color}>{color}</Badge>)}
                </div>
              </div>
              <div className="mt-4 grid gap-2 text-sm font-bold text-slate-600">
                <p>Frame: {selectedProduct.frameType}</p>
                <p>Material: {selectedProduct.material}</p>
                <p>Style: {selectedProduct.style}</p>
              </div>
              <div className="mt-4 grid gap-2">
                {lensOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelectedLens(option)}
                    className={`rounded-md border px-3 py-2 text-left text-sm font-black transition ${selectedLens === option ? 'border-teal-700 bg-teal-50 text-teal-900' : 'border-slate-200 bg-white text-slate-600 hover:border-teal-200'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {[
                  [Heart, 'Wishlist'],
                  [CalendarCheck, 'Book eye test'],
                  [MapPin, 'Find store'],
                ].map(([Icon, label]) => (
                  <button key={label as string} type="button" className="inline-flex items-center justify-center rounded-md bg-slate-950 px-3 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:bg-teal-800">
                    <Icon className="mr-2 h-4 w-4" />
                    {label as string}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="grid gap-5">
            <section className="rounded-md border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <SectionHeader
                eyebrow="Product catalog"
                title="Search, filter, and sort frame inventory"
                description="Interactive mock catalog with TypeScript product data and client-side filtering."
              />
              <div className="grid gap-3 lg:grid-cols-[1fr_0.55fr_0.55fr_0.55fr_0.55fr]">
                <label className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                  <Search className="h-5 w-5 text-slate-400" />
                  <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search frames, tags, colors" className="w-full bg-transparent text-sm font-bold outline-none" />
                </label>
                <select value={frameType} onChange={(event) => setFrameType(event.target.value as 'all' | FrameType)} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold">
                  <option value="all">All frames</option>
                  <option value="full-rim">Full rim</option>
                  <option value="half-rim">Half rim</option>
                  <option value="rimless">Rimless</option>
                </select>
                <select value={material} onChange={(event) => setMaterial(event.target.value as 'all' | Material)} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold">
                  <option value="all">All materials</option>
                  <option value="acetate">Acetate</option>
                  <option value="metal">Metal</option>
                  <option value="titanium">Titanium</option>
                  <option value="mixed">Mixed</option>
                </select>
                <select value={style} onChange={(event) => setStyle(event.target.value as 'all' | Style)} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold">
                  <option value="all">All styles</option>
                  <option value="daily">Daily</option>
                  <option value="business">Business</option>
                  <option value="fashion">Fashion</option>
                  <option value="sport">Sport</option>
                </select>
                <select value={sort} onChange={(event) => setSort(event.target.value as 'recommended' | 'price-low' | 'newest')} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold">
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price low-high</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <article key={product.id} className={`rounded-md border p-4 transition ${selectedProductId === product.id ? 'border-teal-700 bg-teal-50' : 'border-slate-200 bg-white hover:border-teal-200'}`}>
                    <button type="button" onClick={() => setSelectedProductId(product.id)} className="block w-full text-left">
                      <div className="flex aspect-[4/3] items-center justify-center rounded-md bg-slate-100 text-4xl font-black text-slate-500">
                        {product.image}
                      </div>
                      <div className="mt-4 flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-black text-slate-950">{product.name}</h3>
                          <p className="mt-1 text-sm font-bold text-slate-500">{product.frameType} · {product.material}</p>
                        </div>
                        <p className="font-black text-teal-800">{formatBaht(product.price)}</p>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {product.badges.map((badge) => <Badge key={badge}>{badge}</Badge>)}
                      </div>
                    </button>
                  </article>
                ))}
              </div>
            </section>

            <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-md border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <SectionHeader
                  eyebrow="Store locator"
                  title="Find a fictional branch"
                  description="Filter store cards by area, province, transit access, open-now state, and service availability."
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 sm:col-span-2">
                    <MapPin className="h-5 w-5 text-slate-400" />
                    <input value={storeQuery} onChange={(event) => setStoreQuery(event.target.value)} placeholder="Search area, province, transit" className="w-full bg-transparent text-sm font-bold outline-none" />
                  </label>
                  <select value={requiredService} onChange={(event) => setRequiredService(event.target.value as 'all' | Service)} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold">
                    <option value="all">All services</option>
                    {services.map((service) => <option key={service} value={service}>{service}</option>)}
                  </select>
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => setNearTransit(!nearTransit)} className={`rounded-md border px-3 py-2 text-xs font-black uppercase tracking-[0.1em] ${nearTransit ? 'border-teal-700 bg-teal-50 text-teal-800' : 'border-slate-200 bg-white text-slate-600'}`}>
                      BTS/MRT
                    </button>
                    <button type="button" onClick={() => setOpenNow(!openNow)} className={`rounded-md border px-3 py-2 text-xs font-black uppercase tracking-[0.1em] ${openNow ? 'border-teal-700 bg-teal-50 text-teal-800' : 'border-slate-200 bg-white text-slate-600'}`}>
                      Open now
                    </button>
                  </div>
                </div>
                <div className="mt-5 grid gap-3">
                  {filteredStores.map((storeItem) => (
                    <button
                      key={storeItem.id}
                      type="button"
                      onClick={() => {
                        setSelectedStoreId(storeItem.id)
                        setSelectedSlot(storeItem.availableSlots[0] ?? '')
                      }}
                      className={`rounded-md border p-4 text-left transition ${selectedStoreId === storeItem.id ? 'border-teal-700 bg-teal-50' : 'border-slate-200 bg-white hover:border-teal-200'}`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="font-black text-slate-950">{storeItem.name}</h3>
                          <p className="mt-1 text-sm font-bold text-slate-500">{storeItem.area}, {storeItem.province}</p>
                        </div>
                        <Badge>{storeItem.openNow ? 'Open now' : 'Closed'}</Badge>
                      </div>
                      <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{storeItem.address}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {storeItem.transit && <Badge>{storeItem.transit}</Badge>}
                        {storeItem.services.map((service) => <Badge key={service}>{service}</Badge>)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={submitBooking} className="rounded-md border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <SectionHeader
                  eyebrow="Booking flow"
                  title="Frontend-only appointment"
                  description="Multi-step booking state with validation and confirmation. No backend call is made."
                />
                <div className="mb-5 grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <button key={step} type="button" onClick={() => setBookingStep(step)} className={`h-9 rounded-md text-xs font-black ${bookingStep === step ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {step}
                    </button>
                  ))}
                </div>

                {bookingStep === 1 && (
                  <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                    <Store className="mb-3 h-6 w-6 text-teal-700" />
                    <h3 className="font-black">{selectedStore.name}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{selectedStore.address}</p>
                    <button type="button" onClick={() => setBookingStep(2)} className="mt-4 rounded-md bg-slate-950 px-4 py-3 text-xs font-black uppercase tracking-[0.1em] text-white">Use this store</button>
                  </div>
                )}

                {bookingStep === 2 && (
                  <div>
                    <p className="mb-3 text-sm font-black uppercase tracking-[0.12em] text-slate-500">Available slots</p>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedStore.availableSlots.map((slot) => (
                        <button key={slot} type="button" onClick={() => setSelectedSlot(slot)} className={`rounded-md border px-3 py-3 text-sm font-black ${selectedSlot === slot ? 'border-teal-700 bg-teal-50 text-teal-800' : 'border-slate-200 bg-white text-slate-600'}`}>
                          {slot}
                        </button>
                      ))}
                    </div>
                    <button type="button" onClick={() => setBookingStep(3)} className="mt-4 rounded-md bg-slate-950 px-4 py-3 text-xs font-black uppercase tracking-[0.1em] text-white">Continue</button>
                  </div>
                )}

                {bookingStep === 3 && (
                  <div className="grid gap-3">
                    {[
                      ['name', 'Name'],
                      ['phone', 'Phone'],
                      ['email', 'Email'],
                    ].map(([field, label]) => (
                      <label key={field} className="grid gap-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                        {label}
                        <input
                          value={bookingDetails[field as keyof Pick<BookingDetails, 'name' | 'phone' | 'email'>]}
                          onChange={(event) => setBookingDetails({ ...bookingDetails, [field]: event.target.value })}
                          className="rounded-md border border-slate-200 px-3 py-3 text-sm font-bold normal-case tracking-normal text-slate-950 outline-none focus:border-teal-700"
                        />
                      </label>
                    ))}
                    <label className="grid gap-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                      Service
                      <select value={bookingDetails.serviceType} onChange={(event) => setBookingDetails({ ...bookingDetails, serviceType: event.target.value as Service })} className="rounded-md border border-slate-200 px-3 py-3 text-sm font-bold normal-case tracking-normal text-slate-950">
                        {services.map((service) => <option key={service} value={service}>{service}</option>)}
                      </select>
                    </label>
                    <button type="button" onClick={() => setBookingStep(4)} className="rounded-md bg-slate-950 px-4 py-3 text-xs font-black uppercase tracking-[0.1em] text-white">Review</button>
                  </div>
                )}

                {bookingStep === 4 && (
                  <div className="grid gap-3">
                    <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-7 text-slate-700">
                      <p>Store: {selectedStore.name}</p>
                      <p>Time: {selectedSlot || 'Not selected'}</p>
                      <p>Name: {bookingDetails.name || 'Missing'}</p>
                      <p>Email: {bookingDetails.email || 'Missing'}</p>
                      <p>Service: {bookingDetails.serviceType}</p>
                    </div>
                    {bookingErrors.length > 0 && (
                      <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm font-bold text-red-700">
                        {bookingErrors.map((error) => <p key={error}>{error}</p>)}
                      </div>
                    )}
                    <button type="submit" className="rounded-md bg-teal-700 px-4 py-3 text-xs font-black uppercase tracking-[0.1em] text-white">Confirm booking</button>
                  </div>
                )}

                {bookingStep === 5 && (
                  <div className="rounded-md border border-emerald-200 bg-emerald-50 p-5">
                    <CheckCircle2 className="mb-3 h-8 w-8 text-emerald-700" />
                    <h3 className="text-xl font-black text-slate-950">Booking confirmed in mock mode</h3>
                    <p className="mt-2 text-sm font-bold leading-6 text-slate-600">Your fictional appointment at {selectedStore.name} for {selectedSlot} is stored in local React state only.</p>
                  </div>
                )}
              </form>
            </section>

            <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-md border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <SectionHeader
                  eyebrow="Membership mock"
                  title="Account UI without real auth"
                  description="Frontend-only login state, member card, points, prescription preview, and purchase history."
                />
                <button type="button" onClick={() => setMemberLoggedIn(!memberLoggedIn)} className="mb-4 inline-flex items-center rounded-md bg-slate-950 px-4 py-3 text-xs font-black uppercase tracking-[0.1em] text-white">
                  <UserRound className="mr-2 h-4 w-4" />
                  {memberLoggedIn ? 'Reset mock state' : 'Use mock member'}
                </button>
                <div className="rounded-md border border-teal-200 bg-teal-50 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-teal-800">{memberLoggedIn ? 'Mock member active' : 'Guest preview'}</p>
                  <h3 className="mt-2 text-2xl font-black">Vision Lane Plus</h3>
                  <p className="mt-2 text-sm font-bold text-slate-600">1,240 fictional points · Saved prescription · SMS/email preferences</p>
                </div>
                <div className="mt-4 grid gap-3">
                  {['Prescription: SPH -1.25 / CYL -0.50', 'Last mock order: Clearview Daily 01', 'Preference: appointment reminders enabled'].map((item) => (
                    <div key={item} className="rounded-md border border-slate-200 bg-white p-3 text-sm font-bold text-slate-600">{item}</div>
                  ))}
                </div>
              </div>

              <div className="rounded-md border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <SectionHeader
                  eyebrow="FAQ guide"
                  title="Searchable buying support"
                  description="Category tabs and accordions for content-heavy retail guidance."
                />
                <label className="mb-3 flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                  <Search className="h-5 w-5 text-slate-400" />
                  <input value={faqQuery} onChange={(event) => setFaqQuery(event.target.value)} placeholder="Search FAQ" className="w-full bg-transparent text-sm font-bold outline-none" />
                </label>
                <div className="mb-4 flex flex-wrap gap-2">
                  <button type="button" onClick={() => setFaqCategory('all')} className={`rounded-md border px-3 py-2 text-xs font-black uppercase tracking-[0.1em] ${faqCategory === 'all' ? 'border-teal-700 bg-teal-50 text-teal-800' : 'border-slate-200 bg-white text-slate-600'}`}>
                    All
                  </button>
                  {categories.map((category) => (
                    <button key={category} type="button" onClick={() => setFaqCategory(category)} className={`rounded-md border px-3 py-2 text-xs font-black uppercase tracking-[0.1em] ${faqCategory === category ? 'border-teal-700 bg-teal-50 text-teal-800' : 'border-slate-200 bg-white text-slate-600'}`}>
                      {category}
                    </button>
                  ))}
                </div>
                <div className="grid gap-3">
                  {filteredFaqs.map((faq) => (
                    <article key={faq.id} className="rounded-md border border-slate-200 bg-white">
                      <button type="button" onClick={() => setOpenFaqId(openFaqId === faq.id ? '' : faq.id)} className="flex w-full items-center justify-between gap-3 p-4 text-left font-black">
                        {faq.question}
                        <ChevronDown className={`h-5 w-5 shrink-0 text-teal-700 transition ${openFaqId === faq.id ? 'rotate-180' : ''}`} />
                      </button>
                      {openFaqId === faq.id && <p className="border-t border-slate-200 p-4 text-sm font-semibold leading-7 text-slate-600">{faq.answer}</p>}
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-md border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_18px_50px_rgba(15,23,42,0.14)]">
              <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-teal-300" />
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-300">Proof summary</p>
                  </div>
                  <h2 className="text-2xl font-black">Retail UX, state management, validation, content IA, and responsive UI in one public-safe demo.</h2>
                  <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-slate-300">The workflow is API-ready in shape, but every interaction here runs locally with fictional records.</p>
                </div>
                <Link href="/work-with-me" className="inline-flex items-center justify-center rounded-md bg-teal-500 px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-slate-950 transition hover:bg-teal-300">
                  Scope a retail build
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-4">
                {[
                  [ShoppingBag, 'Catalog'],
                  [Store, 'Locator'],
                  [Clock3, 'Booking'],
                  [Eye, 'Guide'],
                ].map(([Icon, label]) => (
                  <div key={label as string} className="rounded-md border border-slate-700 bg-slate-900 p-4">
                    <Icon className="mb-3 h-5 w-5 text-teal-300" />
                    <p className="font-black">{label as string}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}
