export const SITE = {
  name: 'Kathmandu Repairing Center Pvt. Ltd.',
  short: 'KRC',
  // Public address of the live site. Used for the sitemap, share previews and Google listing data.
  url: 'https://krc.com.np',
  tagline: 'Electrical engineering you can count on — day or night.',
  founder: 'Jinesh Raj Tuladhar',
  founded: 2009,
  hotline: '+977 985-1082575',
  hotlineHref: 'tel:+9779851082575',
  office: '01-5454739',
  officeHref: 'tel:015454739',
  email: 'krc@gmail.com',
  whatsapp: 'https://wa.me/9779851082575',
  address: 'Gusingal, Lalitpur, Nepal',
  mapEmbed:
    'https://www.google.com/maps?q=Gusingal,+Lalitpur,+Nepal&output=embed',
  mapLink: 'https://maps.google.com/?q=Gusingal,+Lalitpur,+Nepal',
  hours: [
    { day: 'Sunday – Friday', time: '10:00 AM – 5:00 PM' },
    { day: 'Saturday', time: '10:00 AM – 3:00 PM' },
    { day: 'Emergency line', time: '24 / 7, every day' },
  ],
  social: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    linkedin: 'https://linkedin.com/',
  },
  stats: [
    { value: '15+', label: 'Years of experience' },
    { value: '850+', label: 'Projects completed' },
    { value: '24/7', label: 'Emergency support' },
    { value: '98%', label: 'Clients who return' },
  ],
}

export const NAV = [
  { label: 'Home', to: '/' },
  {
    label: 'About',
    to: '/about',
    children: [
      { label: 'About KRC', to: '/about' },
      { label: 'Our Team', to: '/team' },
      { label: 'Testimonials', to: '/testimonials' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
  { label: 'Services', to: '/services', mega: true },
  { label: 'Projects', to: '/projects' },
  { label: 'Products', to: '/products' },
  { label: 'Technicians', to: '/technicians' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]
