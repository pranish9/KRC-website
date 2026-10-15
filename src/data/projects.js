import { IMG } from './images'

// Each project is a permanent record for the client:
// photos, videos, specs, documents and warranty in one place.
// videos: { title, youtubeId } for YouTube, or { title, src: '/videos/file.mp4' } for a local file.
// documents: put PDFs in /public/docs/ and link them as '/docs/file.pdf'.

export const projects = [
  {
    slug: 'abc-company-dc-panel-setup',
    number: '089',
    title: 'Complete DC & Panel Setup',
    client: 'ABC Company Pvt. Ltd.',
    sector: 'Industrial',
    service: 'electrical-design-execution',
    location: 'Bhaktapur',
    completed: 'March 2025',
    duration: '6 weeks',
    cover: IMG.controlPanel,
    photos: [IMG.controlPanel, IMG.breakers, IMG.wiresBox, IMG.panelTest, IMG.wiresClose, IMG.hardhatInstall],
    challenge:
      'ABC Company was moving production to a new factory floor. The existing supply had no proper distribution, machines tripped each other, and there was no room for future expansion.',
    solution:
      'We designed a new main panel with separate DBs for each production line, sized every cable for the real load, installed a DC supply section for control equipment and added proper earthing. Work was done in phases so production never fully stopped.',
    results: [
      { value: '0', label: 'Unplanned trips since hand-over' },
      { value: '30%', label: 'Spare capacity for expansion' },
      { value: '6 wks', label: 'Delivered on schedule' },
    ],
    specs: [
      { label: 'Main panel', value: '400 A TPN with MCCB incomer' },
      { label: 'Distribution boards', value: '6 × TPN DB, 2 × SPN DB' },
      { label: 'Cabling', value: '4-core armoured Cu, 35–95 sq.mm' },
      { label: 'Earthing', value: '3 chemical earth pits, < 1 Ω' },
      { label: 'DC section', value: '24 V / 48 V control supply' },
    ],
    videos: [],
    documents: [],
    warrantyUntil: 'March 2026',
    review: {
      quote: 'KRC planned everything around our production schedule. Not a single day was lost and the panel room is now the neatest part of the factory.',
      by: 'Plant Manager, ABC Company',
    },
  },
  {
    slug: 'caltex-station-canopy-lighting',
    number: '088',
    title: 'Caltex Station Canopy Lighting',
    client: 'Caltex Fuel Station',
    sector: 'Commercial',
    service: 'interior-aspects-design',
    location: 'Lalitpur',
    completed: 'January 2025',
    duration: '10 days',
    cover: IMG.bulb,
    photos: [IMG.bulb, IMG.electricPost, IMG.buildingWires, IMG.powerLines, IMG.switchBox],
    challenge:
      'The forecourt canopy had dim, failing lamps that made the station look closed at night and drew high electricity bills.',
    solution:
      'We replaced all fixtures with weather-proof LED canopy lights, rewired the canopy circuit in conduit, and added a timer and photocell so lights switch on at dusk automatically.',
    results: [
      { value: '55%', label: 'Lower lighting bill' },
      { value: '2×', label: 'Brighter forecourt' },
      { value: '10 days', label: 'Night-time work only' },
    ],
    specs: [
      { label: 'Fixtures', value: '24 × 150 W LED canopy lights, IP66' },
      { label: 'Control', value: 'Photocell + digital timer' },
      { label: 'Wiring', value: 'GI conduit, 2.5 sq.mm Cu' },
    ],
    videos: [],
    documents: [],
    warrantyUntil: 'January 2027',
    review: {
      quote: 'The station looks brand new at night and customers have noticed. The team worked only after closing hours, exactly as promised.',
      by: 'Station Owner, Caltex Lalitpur',
    },
  },
  {
    slug: 'xyz-company-headquarters',
    number: '087',
    title: 'XYZ Company Headquarters',
    client: 'XYZ Company',
    sector: 'Corporate',
    service: 'electrical-design-execution',
    location: 'Kathmandu',
    completed: 'November 2024',
    duration: '3 months',
    cover: IMG.buildingWires,
    photos: [IMG.buildingWires, IMG.hardhatTool, IMG.breakerBox, IMG.wallSwitch, IMG.digitalDevice, IMG.holdingWires],
    challenge:
      'A five-storey office needed complete electrical, data and CCTV infrastructure, ready before the company moved in.',
    solution:
      'We prepared the design and BOQ, then carried out complete wiring, floor-wise DBs, UPS circuits for computers, structured LAN cabling and a 32-camera CCTV system — coordinated with the civil contractor.',
    results: [
      { value: '5', label: 'Floors fully wired' },
      { value: '32', label: 'CCTV cameras' },
      { value: '3 mo', label: 'Ready for move-in' },
    ],
    specs: [
      { label: 'Floors', value: '5 floors + basement parking' },
      { label: 'Power', value: '250 kVA transformer, 125 kVA DG backup' },
      { label: 'UPS', value: 'Dedicated UPS circuits per floor' },
      { label: 'Security', value: '32 × IP cameras, 2 NVR, access control' },
    ],
    videos: [],
    documents: [],
    warrantyUntil: 'November 2025',
    review: {
      quote: 'One team handled power, CCTV and network. It saved us a lot of coordination headaches.',
      by: 'Admin Head, XYZ Company',
    },
  },
  {
    slug: 'trisara-restaurant-wiring',
    number: '086',
    title: 'Trisara Restaurant Wiring',
    client: 'Trisara Restaurant',
    sector: 'Hospitality',
    service: 'interior-aspects-design',
    location: 'Jhamsikhel, Lalitpur',
    completed: 'August 2024',
    duration: '4 weeks',
    cover: IMG.vintageBulbs,
    photos: [IMG.vintageBulbs, IMG.bulb, IMG.wallSwitch, IMG.wiresColor, IMG.screwdriverPanel],
    challenge:
      'A busy restaurant with indoor and garden seating wanted warm ambience lighting and a kitchen supply that would not trip during rush hour.',
    solution:
      'We separated the kitchen onto its own DB, added dimmable warm-white scenes for dining areas and festoon lighting for the garden, all with concealed wiring to match the interior.',
    results: [
      { value: '4', label: 'Lighting scenes' },
      { value: '0', label: 'Kitchen trips at peak hour' },
      { value: '4 wks', label: 'Completed during renovation' },
    ],
    specs: [
      { label: 'Kitchen', value: 'Dedicated TPN DB, RCCB protected' },
      { label: 'Lighting', value: 'Dimmable LED, festoon & pendant' },
      { label: 'Control', value: 'Scene switches at counter' },
    ],
    videos: [],
    documents: [],
    warrantyUntil: 'August 2025',
    review: {
      quote: 'The lighting is exactly the mood we wanted, and our kitchen finally runs without tripping.',
      by: 'Owner, Trisara',
    },
  },
  {
    slug: 'buddha-bar-fit-out',
    number: '085',
    title: 'Buddha Bar Fit-out',
    client: 'Buddha Bar',
    sector: 'Hospitality',
    service: 'interior-aspects-design',
    location: 'Kathmandu',
    completed: 'May 2023',
    duration: '5 weeks',
    cover: IMG.wiresColor,
    photos: [IMG.wiresColor, IMG.vintageBulbs, IMG.controlPanel, IMG.holdingWires, IMG.bulb],
    challenge:
      'A new bar needed stage power, sound-system supply and dramatic accent lighting inside a tight fit-out schedule.',
    solution:
      'We worked with the interior team to install concealed accent lighting, a clean isolated supply for the sound system, stage outlets and a separate emergency lighting circuit.',
    results: [
      { value: '5 wks', label: 'Fit-out completed' },
      { value: '120+', label: 'Light points' },
      { value: '1', label: 'Isolated audio supply' },
    ],
    specs: [
      { label: 'Lighting', value: 'Cove, accent & RGB strip lighting' },
      { label: 'Audio', value: 'Isolated earth & dedicated circuits' },
      { label: 'Safety', value: 'Emergency lights and exit signs' },
    ],
    videos: [],
    documents: [],
    warrantyUntil: 'May 2024',
    review: {
      quote: 'Opening night went perfectly. No hum in the speakers, no flicker, nothing.',
      by: 'Manager, Buddha Bar',
    },
  },
  {
    slug: 'boutique-hotel-facade-lighting',
    number: '084',
    title: 'Boutique Hotel Façade Lighting',
    client: 'Boutique Hotel, Thamel',
    sector: 'Hospitality',
    service: 'interior-aspects-design',
    location: 'Thamel, Kathmandu',
    completed: 'March 2024',
    duration: '3 weeks',
    cover: IMG.electricPost,
    photos: [IMG.electricPost, IMG.bulb, IMG.buildingWires, IMG.switchBox, IMG.hardhatInstall],
    challenge:
      'The hotel was hard to spot on a crowded Thamel street after dark.',
    solution:
      'We designed warm façade washers, window up-lights and an illuminated sign on an automatic timer — all weather-proof and easy to maintain.',
    results: [
      { value: '+40%', label: 'Walk-in enquiries' },
      { value: 'IP66', label: 'Weather-proof fittings' },
      { value: 'Auto', label: 'Timer controlled' },
    ],
    specs: [
      { label: 'Fixtures', value: 'LED wall washers and up-lights' },
      { label: 'Control', value: 'Astronomical timer' },
      { label: 'Wiring', value: 'UV-resistant conduit' },
    ],
    videos: [],
    documents: [],
    warrantyUntil: 'March 2026',
    review: {
      quote: 'Guests tell us they found us because of the lights. Worth every rupee.',
      by: 'Owner, Boutique Hotel',
    },
  },
  {
    slug: 'banquet-hall-lighting-db',
    number: '083',
    title: 'Banquet Hall Lighting & DB',
    client: 'Banquet Hall, Lalitpur',
    sector: 'Events',
    service: 'standby-technician-after-sales',
    location: 'Lalitpur',
    completed: 'December 2023',
    duration: '4 weeks',
    cover: IMG.breakers,
    photos: [IMG.breakers, IMG.bulb, IMG.breakerBox, IMG.fixingCable, IMG.wiresBox],
    challenge:
      'Wedding season loads were overloading an old DB, causing blackouts mid-event.',
    solution:
      'We installed a new TPN distribution board, balanced loads across phases, added chandelier dimming and a changeover to the generator — plus standby technicians during the season.',
    results: [
      { value: '0', label: 'Blackouts last season' },
      { value: '3-phase', label: 'Balanced load' },
      { value: '40+', label: 'Events with standby tech' },
    ],
    specs: [
      { label: 'DB', value: 'TPN 125 A with RCCB' },
      { label: 'Changeover', value: 'ATS to 62.5 kVA generator' },
      { label: 'Lighting', value: 'Dimmable chandeliers' },
    ],
    videos: [],
    documents: [],
    warrantyUntil: 'December 2024',
    review: {
      quote: 'Having a KRC technician on site during weddings gives us real peace of mind.',
      by: 'Manager, Banquet Hall',
    },
  },
  {
    slug: 'city-hospital-standby-power',
    number: '082',
    title: 'City Hospital Standby Power',
    client: 'City Hospital',
    sector: 'Healthcare',
    service: 'system-repair-maintenance',
    location: 'Maharajgunj, Kathmandu',
    completed: 'October 2023',
    duration: '2 weeks',
    cover: IMG.grayMachine,
    photos: [IMG.grayMachine, IMG.machine, IMG.transformer, IMG.switchBox, IMG.clampMeter],
    challenge:
      'Critical areas (ICU and OT) experienced a gap of several seconds when the mains failed.',
    solution:
      'We installed an automatic transfer switch, separated critical loads onto a UPS-backed panel and set up a monthly generator test schedule.',
    results: [
      { value: '< 10 s', label: 'Generator changeover' },
      { value: '0 s', label: 'Gap on critical loads' },
      { value: 'Monthly', label: 'Test & maintenance' },
    ],
    specs: [
      { label: 'ATS', value: '400 A automatic transfer switch' },
      { label: 'Critical panel', value: 'UPS-backed ICU/OT panel' },
      { label: 'Maintenance', value: 'Annual maintenance contract' },
    ],
    videos: [],
    documents: [],
    warrantyUntil: 'October 2024',
    review: {
      quote: 'Power reliability in our ICU is no longer a worry. KRC also maintains it every month.',
      by: 'Facility Manager, City Hospital',
    },
  },
  {
    slug: 'bank-branch-cctv-electrical',
    number: '081',
    title: 'Bank Branch CCTV & Electrical',
    client: 'Bank Branch, Baneshwor',
    sector: 'Banking',
    service: 'security-electrical-products',
    location: 'Baneshwor, Kathmandu',
    completed: 'June 2022',
    duration: '2 weeks',
    cover: IMG.digitalDevice,
    photos: [IMG.digitalDevice, IMG.circuitTester, IMG.wallSwitch, IMG.breakerBox, IMG.holdingWires],
    challenge:
      'A new branch needed bank-grade CCTV, alarms and clean power for ATMs and servers within two weeks.',
    solution:
      'We installed 16 HD cameras with 60-day recording, an intrusion alarm, dedicated UPS circuits for ATMs and the server rack, and a neat DB with labelled circuits.',
    results: [
      { value: '16', label: 'HD cameras' },
      { value: '60 days', label: 'Recording storage' },
      { value: '2 wks', label: 'Ready for opening' },
    ],
    specs: [
      { label: 'CCTV', value: '16 × 4 MP IP cameras, NVR with 8 TB' },
      { label: 'Alarm', value: 'Intrusion alarm with panic buttons' },
      { label: 'Power', value: 'Dedicated UPS circuits for ATM/server' },
    ],
    videos: [],
    documents: [],
    warrantyUntil: 'June 2023',
    review: {
      quote: 'Fast, neat and fully compliant with our security audit.',
      by: 'Branch Manager',
    },
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)
export const sectors = ['All', ...new Set(projects.map((p) => p.sector))]
