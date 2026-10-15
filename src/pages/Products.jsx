import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Search, CheckCircle2, Truck, ShieldCheck, Wrench, Phone } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Seo, Img, Button } from '../components/ui'
import { ProductCard } from '../components/Cards'
import { CtaBand, NotFoundInline } from '../components/Layout'
import { products, productCategories, getProduct, npr } from '../data/products'
import { SITE } from '../data/site'
import { IMG } from '../data/images'

export function Products() {
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('featured')

  const list = useMemo(() => {
    let l = products.filter((p) => (cat === 'All' || p.category === cat) && (p.name + p.brand).toLowerCase().includes(q.toLowerCase()))
    if (sort === 'low') l = [...l].sort((a, b) => a.price - b.price)
    if (sort === 'high') l = [...l].sort((a, b) => b.price - a.price)
    return l
  }, [cat, q, sort])

  return (
    <>
      <Seo title="Products" description="Genuine switchgear, meters, CCTV, generators, tools and lighting with warranty and installation." />
      <PageHero eyebrow="Products" title="Genuine products, with installation if you need it" text="Prices in Nepali rupees. Send an enquiry and we’ll confirm stock and delivery." crumbs={[{ label: 'Products' }]} image={IMG.electronicsShop} />
      <section className="section">
        <div className="container-site">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {productCategories.map((c) => (
                <button key={c} onClick={() => setCat(c)} className={`chip ${cat === c ? 'chip-active' : ''}`}>{c}</button>
              ))}
            </div>
            <div className="flex gap-3">
              <label className="relative flex-1 lg:w-64">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" className="input pl-11" aria-label="Search products" />
              </label>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="input w-auto" aria-label="Sort">
                <option value="featured">Featured</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
            </div>
          </div>
          <p className="mb-6 text-sm font-semibold">{list.length} products</p>
          {list.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {list.map((p) => <ProductCard key={p.slug} p={p} />)}
            </div>
          ) : (
            <p className="rounded-3xl bg-white p-10 text-center">No products match. Try another search, or <Link to="/enquiry" className="font-bold underline">ask us</Link> — we can source it.</p>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  )
}

export function ProductDetail() {
  const { slug } = useParams()
  const p = getProduct(slug)
  const [img, setImg] = useState(0)
  if (!p) return <NotFoundInline what="product" back="/products" />
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4)

  return (
    <>
      <Seo title={p.name} description={p.summary} image={p.image} />
      <section className="container-site pt-8">
        <nav className="mb-6 text-sm"><Link to="/" className="hover:text-navy">Home</Link> / <Link to="/products" className="hover:text-navy">Products</Link> / <span className="font-semibold text-navy">{p.name}</span></nav>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Img src={p.gallery[img] || p.image} alt={p.name} className="h-[460px] w-full rounded-[32px] bg-white" />
            {p.gallery.length > 1 && (
              <div className="mt-4 flex gap-3">
                {p.gallery.map((g, i) => (
                  <button key={i} onClick={() => setImg(i)} className={`h-20 w-24 overflow-hidden rounded-2xl ring-2 ${i === img ? 'ring-navy' : 'ring-transparent opacity-60'}`}>
                    <Img src={g} alt="" className="h-full w-full" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-muted">{p.brand} · {p.category}</p>
            <h1 className="mt-2 text-3xl leading-tight md:text-5xl">{p.name}</h1>
            <p className="mt-4 text-lg">{p.summary}</p>
            <div className="mt-6 flex items-center gap-4">
              <span className="text-4xl font-extrabold text-navy">{npr(p.price)}</span>
              <span className={`rounded-full px-3 py-1 text-sm font-bold ${p.inStock ? 'bg-ok/10 text-ok' : 'bg-bg text-body'}`}>{p.inStock ? 'In stock' : 'On order (3–7 days)'}</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to={`/enquiry?product=${p.slug}`}>Enquire / order</Button>
              <Button href={SITE.hotlineHref} variant="outline" icon="phone">Call to order</Button>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[[Truck, 'Valley delivery'], [ShieldCheck, 'Genuine + warranty'], [Wrench, 'Installation available']].map(([I, t]) => (
                <div key={t} className="flex items-center gap-2 rounded-2xl bg-white p-4 text-sm font-bold text-navy"><I size={18} className="text-ok" /> {t}</div>
              ))}
            </div>
            <div className="card mt-8 p-6">
              <h2 className="text-xl">Specifications</h2>
              <dl className="mt-3 divide-y divide-line">
                {p.specs.map((s) => (
                  <div key={s.label} className="flex justify-between gap-4 py-3">
                    <dt className="font-semibold">{s.label}</dt><dd className="text-right font-bold text-navy">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="container-site">
            <h2 className="mb-8 text-3xl">Related products</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{related.map((x) => <ProductCard key={x.slug} p={x} />)}</div>
          </div>
        </section>
      )}
      <div className={related.length ? '' : 'pt-20'}><CtaBand /></div>
    </>
  )
}
