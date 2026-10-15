import { IMG } from './images'

export const services = [
  {
    slug: 'electrical-design-execution',
    icon: 'Zap',
    title: 'Electrical Design & Execution',
    short: 'Load calculation, single-line diagrams, panel design and complete site installation.',
    image: IMG.hardhatInstall,
    intro:
      'From the first load calculation to the final switch-on, our engineers design and build electrical systems that are safe, efficient and ready for growth. We handle homes, offices, restaurants, hotels, hospitals and industrial sites.',
    includes: [
      'Site survey and load calculation',
      'Single-line diagrams (SLD) and wiring layouts',
      'Main panel, distribution board (DB) and sub-DB design',
      'Cable sizing, earthing and lightning protection',
      'Complete installation, testing and commissioning',
      'As-built drawings handed over for future reference',
    ],
    process: [
      { title: 'Survey', text: 'We visit the site, check the load and listen to what you need.' },
      { title: 'Design', text: 'You receive drawings, a materials list and a clear quotation.' },
      { title: 'Execute', text: 'Our team installs to code with quality materials.' },
      { title: 'Hand over', text: 'Testing report, drawings and warranty are handed over.' },
    ],
    priceFrom: 'Quotation after site visit',
  },
  {
    slug: 'interior-aspects-design',
    icon: 'Lamp',
    title: 'Interior Aspects Design',
    short: 'Lighting design, concealed wiring and fit-out electrics for beautiful spaces.',
    image: IMG.vintageBulbs,
    intro:
      'Good light changes how a space feels. We plan lighting scenes, concealed wiring, switch positions and decorative fixtures for restaurants, bars, hotels, showrooms and homes — working alongside your interior designer.',
    includes: [
      'Lighting layout and mood/scene planning',
      'Concealed and surface conduit wiring',
      'Decorative, cove, façade and landscape lighting',
      'Dimmers, smart switches and automation',
      'Coordination with interior designers and contractors',
    ],
    process: [
      { title: 'Concept', text: 'We study the interior concept and the mood you want.' },
      { title: 'Layout', text: 'Fixture positions, circuits and switching are planned.' },
      { title: 'Install', text: 'Neat concealed wiring and fixture installation.' },
      { title: 'Tune', text: 'Scenes and dimming are adjusted on site with you.' },
    ],
    priceFrom: 'Quotation after site visit',
  },
  {
    slug: 'system-repair-maintenance',
    icon: 'Wrench',
    title: 'System Repair & Maintenance',
    short: 'Fault finding, rewiring, panel servicing and annual maintenance contracts.',
    image: IMG.screwdriverPanel,
    intro:
      'Tripping breakers, burning smells, flickering lights or a dead panel — our technicians find the fault quickly and fix it properly. Businesses can sign an annual maintenance contract (AMC) for scheduled checks and priority service.',
    includes: [
      'Fault finding and short-circuit repair',
      'Panel and DB servicing, tightening and thermal check',
      'Rewiring of old or damaged installations',
      'Generator, UPS and inverter servicing',
      'Annual maintenance contracts with priority response',
    ],
    process: [
      { title: 'Call', text: 'Call or book online — tell us what is happening.' },
      { title: 'Diagnose', text: 'A technician visits and finds the real cause.' },
      { title: 'Repair', text: 'We fix it with genuine parts after your approval.' },
      { title: 'Report', text: 'You get a short service report for your records.' },
    ],
    priceFrom: 'Visit charge from Rs 500',
  },
  {
    slug: 'security-electrical-products',
    icon: 'ShieldCheck',
    title: 'Security & Electrical Products',
    short: 'CCTV, access control, fire alarm and genuine electrical products — supplied and installed.',
    image: IMG.breakerBox,
    intro:
      'We supply and install CCTV cameras, NVR/DVR systems, access control, alarms and a full range of electrical products from trusted brands. Every product comes with warranty and installation support.',
    includes: [
      'CCTV (IP and analogue), NVR/DVR and remote viewing',
      'Access control and video door phones',
      'Fire and intrusion alarms',
      'Switchgear, breakers, isolators, cables and meters',
      'Generators, stabilisers and tools',
    ],
    process: [
      { title: 'Choose', text: 'Browse products or tell us what you need protected.' },
      { title: 'Plan', text: 'We suggest the right brand, quantity and positions.' },
      { title: 'Install', text: 'Neat installation and configuration on your phone.' },
      { title: 'Support', text: 'Warranty and after-sales support from KRC.' },
    ],
    priceFrom: 'See product prices',
  },
  {
    slug: 'sales-consultancy',
    icon: 'Lightbulb',
    title: 'Sales & Consultancy',
    short: 'Independent advice, BOQ preparation, energy audits and procurement support.',
    image: IMG.panelTest,
    intro:
      'Not sure what you need? Our engineers give honest, independent advice — from preparing a bill of quantities (BOQ) for a new building to an energy audit that lowers your monthly bill.',
    includes: [
      'BOQ and cost estimation for new buildings',
      'Energy audits and power-factor correction',
      'Third-party inspection of electrical work',
      'Product selection and procurement support',
      'NEA load application guidance',
    ],
    process: [
      { title: 'Brief', text: 'Tell us about the building or problem.' },
      { title: 'Study', text: 'We inspect, measure and review drawings.' },
      { title: 'Advise', text: 'You receive a clear written recommendation.' },
      { title: 'Follow-up', text: 'We help you carry it out if you wish.' },
    ],
    priceFrom: 'Consultation from Rs 1,500',
  },
  {
    slug: 'standby-technician-after-sales',
    icon: 'Headset',
    title: 'Standby Technician & After-Sales',
    short: 'A technician on standby for events and sites, plus 24/7 emergency response.',
    image: IMG.fixingCable,
    intro:
      'For weddings, events, hotels and factories that cannot afford a blackout, we provide a standby technician on site. Our after-sales team also keeps every system we install running long after hand-over.',
    includes: [
      'Standby technician for events and functions',
      'Shift-based technician for hotels and factories',
      '24/7 emergency call-out',
      'Warranty service for KRC-installed systems',
      'Spare-parts support',
    ],
    process: [
      { title: 'Book', text: 'Share the date, time and location.' },
      { title: 'Prepare', text: 'We check the site and power sources in advance.' },
      { title: 'Stand by', text: 'Our technician stays on site the whole time.' },
      { title: 'Review', text: 'A short report and fixes list after the event.' },
    ],
    priceFrom: 'From Rs 2,500 / shift',
  },
]

export const getService = (slug) => services.find((s) => s.slug === slug)
