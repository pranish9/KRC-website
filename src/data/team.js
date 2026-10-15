import { PERSON, CEO } from './images'

export const leadership = [
  {
    name: 'Jinesh Raj Tuladhar',
    role: 'Founder & CEO',
    photo: CEO,
    bio: 'Jinesh founded Kathmandu Repairing Center with one simple promise — honest, safe electrical work that clients can rely on at any hour. He still reviews every major project personally.',
  },
  { name: 'Er. Roshan Kumar Yadav', role: 'Lead Electrical Engineer', photo: PERSON },
  { name: 'Bikash Shrestha', role: 'Site Supervisor', photo: PERSON },
  { name: 'Sita Maharjan', role: 'Accounts & Customer Care', photo: PERSON },
]

export const technicians = [
  {
    slug: 'roshan-kumar-yadav',
    name: 'Er. Roshan Kumar Yadav',
    role: 'Electrical Engineer',
    photo: PERSON,
    experience: 8,
    rating: 4.9,
    reviews: 126,
    jobs: 410,
    distance: '1.2 km',
    available: true,
    languages: ['Nepali', 'English', 'Hindi'],
    skills: ['Electrical design', 'Panel & DB', 'Load calculation', 'Inspection'],
    about:
      'Roshan leads KRC’s design and inspection work. He prepares drawings and BOQs, supervises large installations and is the person to call for a second opinion on any electrical problem.',
    certifications: ['B.E. Electrical, Tribhuvan University', 'Nepal Engineering Council licensed'],
  },
  {
    slug: 'suman-maharjan',
    name: 'Suman Maharjan',
    role: 'CCTV & Security Specialist',
    photo: PERSON,
    experience: 6,
    rating: 4.8,
    reviews: 94,
    jobs: 350,
    distance: '2.4 km',
    available: true,
    languages: ['Nepali', 'Newar', 'English'],
    skills: ['CCTV', 'NVR/DVR setup', 'Access control', 'Networking'],
    about:
      'Suman installs and configures CCTV, alarms and access control — and sets up remote viewing on your phone before he leaves.',
    certifications: ['Hikvision certified installer'],
  },
  {
    slug: 'bikash-shrestha',
    name: 'Bikash Shrestha',
    role: 'Panel & DB Specialist',
    photo: PERSON,
    experience: 10,
    rating: 4.9,
    reviews: 152,
    jobs: 520,
    distance: '3.1 km',
    available: false,
    languages: ['Nepali', 'English'],
    skills: ['Panel wiring', 'Changeover / ATS', 'Generator', 'Fault finding'],
    about:
      'With ten years on panels and generators, Bikash is our go-to for industrial work, changeovers and difficult faults.',
    certifications: ['CTEVT Electrical, Level 2'],
  },
  {
    slug: 'anil-tamang',
    name: 'Anil Tamang',
    role: 'Electrician',
    photo: PERSON,
    experience: 5,
    rating: 4.7,
    reviews: 81,
    jobs: 290,
    distance: '1.8 km',
    available: true,
    languages: ['Nepali', 'Tamang', 'Hindi'],
    skills: ['House wiring', 'Lighting', 'Repairs', 'Fan & appliance fitting'],
    about:
      'Anil handles home and shop wiring, lighting and day-to-day repairs — quick, tidy and friendly.',
    certifications: ['CTEVT Electrical, Level 1'],
  },
]

export const getTechnician = (slug) => technicians.find((t) => t.slug === slug)
