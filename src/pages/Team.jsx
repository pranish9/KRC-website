import PageHero from '../components/PageHero'
import { SectionHead, Img, Seo, Button } from '../components/ui'
import { TechCard } from '../components/Cards'
import { CtaBand } from '../components/Layout'
import { leadership, technicians } from '../data/team'
import { IMG } from '../data/images'

export default function Team() {
  const [ceo, ...rest] = leadership
  return (
    <>
      <Seo title="Our Team" description="Meet the engineers and technicians of Kathmandu Repairing Center." />
      <PageHero eyebrow="Our team" title="The people behind every safe switch-on" crumbs={[{ label: 'About', to: '/about' }, { label: 'Team' }]} image={IMG.hardhatInstall} />

      <section className="section">
        <div className="container-site">
          <SectionHead eyebrow="Leadership" title="Management" />
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="card grid overflow-hidden p-3 md:grid-cols-2 lg:col-span-6">
              <Img src={ceo.photo} alt={ceo.name} className="h-80 w-full rounded-[20px] object-top md:h-full" />
              <div className="flex flex-col justify-center p-6">
                <p className="text-sm font-bold uppercase tracking-wider text-muted">{ceo.role}</p>
                <h3 className="mt-1 text-2xl">{ceo.name}</h3>
                <p className="mt-3">{ceo.bio}</p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-3 lg:col-span-6">
              {rest.map((m) => (
                <div key={m.name} className="card p-3">
                  <Img src={m.photo} alt={m.name} className="h-56 w-full rounded-[20px]" />
                  <div className="p-3">
                    <h3 className="text-lg leading-snug">{m.name}</h3>
                    <p className="text-sm">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site">
          <SectionHead eyebrow="Field team" title="Technicians you can book" action={<Button to="/technicians" variant="outline">All technicians</Button>} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {technicians.map((t) => <TechCard key={t.slug} t={t} />)}
          </div>
        </div>
      </section>
      <div className="pt-20"><CtaBand /></div>
    </>
  )
}
