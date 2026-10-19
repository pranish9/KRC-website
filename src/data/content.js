import { IMG, PERSON } from './images'

export const testimonials = [
  { quote: 'KRC planned everything around our production schedule. Not a single day was lost.', name: 'Ramesh Shrestha', role: 'Plant Manager, ABC Company', rating: 5, photo: PERSON },
  { quote: 'Called at 11 PM with a burning smell from our DB — a technician was here in 40 minutes.', name: 'Anita Joshi', role: 'Homeowner, Jhamsikhel', rating: 5, photo: PERSON },
  { quote: 'The lighting is exactly the mood we wanted, and our kitchen finally runs without tripping.', name: 'Prakash Karki', role: 'Owner, Trisara', rating: 5, photo: PERSON },
  { quote: 'Having a KRC technician on site during weddings gives us real peace of mind.', name: 'Sunita Rai', role: 'Manager, Banquet Hall', rating: 5, photo: PERSON },
  { quote: 'Fast, neat and fully compliant with our security audit.', name: 'Bikram Thapa', role: 'Branch Manager', rating: 5, photo: PERSON },
  { quote: 'Honest advice. They told us we did not need the expensive panel another company quoted.', name: 'Hari Gurung', role: 'Building Owner, Patan', rating: 4, photo: PERSON },
]

// Clients shown in "Trusted by businesses" on the home page.
// To show a logo: put the file in /public/images/clients/ (SVG or transparent PNG works best)
// and set `logo`, e.g. logo: 'images/clients/caltex.svg'. Without a logo a monogram is shown.
// `project` is the slug of the KRC project record the logo links to.
export const clients = [
  { name: 'Caltex', logo: null, project: 'caltex-station-canopy-lighting' },
  { name: 'Trisara', logo: null, project: 'trisara-restaurant-wiring' },
  { name: 'Buddha Bar', logo: null, project: 'buddha-bar-fit-out' },
  { name: 'City Hospital', logo: null, project: 'city-hospital-standby-power' },
  { name: 'ABC Company', logo: null, project: 'abc-company-dc-panel-setup' },
  { name: 'XYZ Company', logo: null, project: 'xyz-company-headquarters' },
  { name: 'Hotel Thamel', logo: null, project: 'boutique-hotel-facade-lighting' },
  { name: 'Banquet Hall', logo: null, project: 'banquet-hall-lighting-db' },
]

export const faqs = [
  { cat: 'General', q: 'Which areas do you serve?', a: 'We serve the whole Kathmandu Valley — Kathmandu, Lalitpur and Bhaktapur. For larger projects we also travel outside the valley.' },
  { cat: 'General', q: 'Are you really available 24/7?', a: 'Yes. Our emergency hotline (+977 985-1082575) is answered day and night, every day of the year, including festivals.' },
  { cat: 'Pricing', q: 'How much does a site visit cost?', a: 'A normal repair visit starts from Rs 500. For new projects, the first site survey for quotation is free inside the valley.' },
  { cat: 'Pricing', q: 'Do you give a written quotation?', a: 'Always. You receive a written quotation with materials and labour listed separately before any work starts.' },
  { cat: 'Service', q: 'Do you give a warranty on your work?', a: 'Yes. Installation work has a 12-month workmanship warranty, and products carry the manufacturer warranty. Every project record on this website shows its warranty date.' },
  { cat: 'Service', q: 'Can I see the details of my old project?', a: 'Yes. Every major project has its own record page with photos, videos, specifications and documents for future reference. Ask us for your project link.' },
  { cat: 'Products', q: 'Can I buy products without installation?', a: 'Yes. Send an enquiry from the product page or visit our office at Gusingal. Installation is optional.' },
  { cat: 'Products', q: 'How do I pay?', a: 'We accept cash, bank transfer, eSewa, Khalti and cheques for companies.' },
]

export const posts = [
  {
    slug: 'signs-your-wiring-needs-attention',
    title: '7 warning signs your home wiring needs attention',
    cat: 'Safety',
    date: 'September 12, 2025',
    read: '5 min read',
    image: IMG.wiresBox,
    excerpt: 'Flickering lights, warm switches and frequent trips are not just annoying — they are early warnings.',
    body: [
      ['p', 'Most electrical fires start with small warning signs that people ignore for months. Here are seven to watch for in any home or office in Nepal.'],
      ['h2', '1. Breakers that trip often'],
      ['p', 'A breaker trips to protect you. If it trips again and again, a circuit is overloaded or a fault is present. Do not replace it with a bigger breaker — find the cause.'],
      ['h2', '2. Warm switches or sockets'],
      ['p', 'A switch plate that feels warm means a loose connection or an overloaded point. Switch it off and call a technician.'],
      ['h2', '3. Burning smell'],
      ['p', 'Turn off the main switch immediately and call our 24/7 hotline.'],
      ['h2', '4–7. Flickering, buzzing, shocks and old wiring'],
      ['ul', ['Lights that flicker when appliances start', 'Buzzing sounds from the DB', 'Small shocks from appliances', 'Wiring older than 20 years']],
      ['p', 'If you notice any of these, book an inspection — it is much cheaper than a repair after damage.'],
    ],
  },
  {
    slug: 'choosing-a-generator-for-home',
    title: 'How to choose the right generator size for your home',
    cat: 'Guides',
    date: 'August 3, 2025',
    read: '4 min read',
    image: IMG.machine,
    excerpt: 'Too small and it trips; too big and you waste fuel. A simple way to size your backup.',
    body: [
      ['p', 'Add up the watts of everything you want to run at the same time during a power cut, then add 25% for starting current.'],
      ['h2', 'A quick example'],
      ['ul', ['Lights: 200 W', 'Fridge: 300 W (starts at ~900 W)', 'TV and Wi-Fi: 150 W', 'Water pump: 750 W (starts at ~2,000 W)']],
      ['p', 'For this home a 3.5 kVA generator is a comfortable choice. Ask us for a free load calculation.'],
    ],
  },
  {
    slug: 'cctv-buying-guide-nepal',
    title: 'CCTV buying guide for shops and homes in Nepal',
    cat: 'Security',
    date: 'June 18, 2025',
    read: '6 min read',
    image: IMG.circuitTester,
    excerpt: 'IP or analogue? How many days of recording? What actually matters when you buy CCTV.',
    body: [
      ['p', 'A good CCTV system is not about the number of cameras, but about covering the right spots with clear night-time images.'],
      ['h2', 'What to look for'],
      ['ul', ['At least 2–4 MP resolution', 'Good night vision (IR range)', '30+ days of recording', 'Mobile app viewing', 'Local after-sales support']],
      ['p', 'Our team will visit, suggest camera positions and give you a free quotation.'],
    ],
  },
]

export const getPost = (slug) => posts.find((p) => p.slug === slug)
