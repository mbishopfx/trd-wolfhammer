// Business Information
export const BUSINESS_INFO = {
  name: "Emergency Plumbing Services",
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '540-123-4567',
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'info@example.com',
  sms: process.env.NEXT_PUBLIC_BUSINESS_SMS || '5401234567',
  hours: '24/7 Emergency Service Available',
  address: 'Cave Spring, VA',
  yearEstablished: '2008',
  experience: '16+ years',
};

// Services Data
export const SERVICES = [
  {
    slug: 'emergency-plumbing',
    title: 'Emergency Plumbing',
    shortDescription: 'Burst pipes, overflowing toilets, and urgent plumbing issues - we respond fast, 24/7.',
    icon: 'emergency',
    featured: true,
  },
  {
    slug: 'water-heater-repair-installation',
    title: 'Water Heater Repair & Installation',
    shortDescription: '40-50 gallon tank replacement, repairs, and expansion tank installations.',
    icon: 'waterHeater',
    featured: true,
  },
  {
    slug: 'drain-cleaning-sewer-services',
    title: 'Drain Cleaning & Sewer Services',
    shortDescription: 'Professional drain clearing and sewer backup solutions for your home.',
    icon: 'drain',
    featured: true,
  },
  {
    slug: 'leak-detection',
    title: 'Leak Detection & Repair',
    shortDescription: 'Advanced leak detection and pipe repair, especially for older Roanoke homes (1950s-1980s).',
    icon: 'leak',
    featured: true,
  },
  {
    slug: 'toilet-fixture-repairs',
    title: 'Toilet & Fixture Repairs',
    shortDescription: 'Faucet changes, toilet repairs and replacements, and all fixture services.',
    icon: 'toilet',
    featured: false,
  },
  {
    slug: 'bathroom-kitchen-remodels',
    title: 'Bathroom & Kitchen Remodels',
    shortDescription: 'Complete plumbing for bathroom and kitchen renovation projects.',
    icon: 'remodel',
    featured: false,
  },
  {
    slug: 'sump-pump-basement-waterproofing',
    title: 'Sump Pump & Basement Waterproofing',
    shortDescription: 'Protect your basement from flooding with professional sump pump installation.',
    icon: 'sumpPump',
    featured: false,
  },
  {
    slug: 'home-protection-plan',
    title: 'Home Protection Plan',
    shortDescription: 'Monthly service plan with priority service, inspections, and discounted rates.',
    icon: 'protection',
    featured: true,
  },
];

// Service Areas / Locations
export const LOCATIONS = [
  {
    slug: 'cave-spring',
    name: 'Cave Spring',
    state: 'VA',
    coordinates: { lat: 37.2296, lng: -79.9842 },
    description: 'Serving Cave Spring with fast, reliable plumbing services.',
    neighborhoods: ['Cave Spring Corners', 'Hunting Hills'],
  },
  {
    slug: 'roanoke',
    name: 'Roanoke',
    state: 'VA',
    coordinates: { lat: 37.2710, lng: -79.9414 },
    description: 'Expert plumbing for Roanoke homes, including older 1950s-1980s builds with pipe issues.',
    neighborhoods: ['Old Southwest', 'South Roanoke', 'Grandin Village'],
  },
  {
    slug: 'salem',
    name: 'Salem',
    state: 'VA',
    coordinates: { lat: 37.2935, lng: -80.0548 },
    description: 'Professional plumbing services throughout Salem and surrounding areas.',
    neighborhoods: ['East Salem', 'West Salem'],
  },
  {
    slug: 'hollins',
    name: 'Hollins',
    state: 'VA',
    coordinates: { lat: 37.3451, lng: -79.9514 },
    description: 'Reliable plumbing solutions for Hollins residents.',
    neighborhoods: ['Hollins community'],
  },
  {
    slug: 'vinton',
    name: 'Vinton',
    state: 'VA',
    coordinates: { lat: 37.2793, lng: -79.8978 },
    description: 'Fast emergency and scheduled plumbing for Vinton homes and businesses.',
    neighborhoods: ['Downtown Vinton', 'Vinton Heights'],
  },
];

// Emergency Problems
export const EMERGENCY_PROBLEMS = [
  {
    id: 'burst-pipe',
    title: 'Burst Pipes',
    description: 'Winter freeze damage or sudden pipe breaks',
    icon: 'burstPipe',
    urgency: 'emergency',
    serviceLink: '/services/emergency-plumbing',
  },
  {
    id: 'no-hot-water',
    title: 'No Hot Water',
    description: 'Water heater failure or malfunction',
    icon: 'waterHeater',
    urgency: 'urgent',
    serviceLink: '/services/water-heater-repair-installation',
  },
  {
    id: 'overflowing-toilet',
    title: 'Overflowing Toilet',
    description: 'Toilet backup or overflow emergency',
    icon: 'toilet',
    urgency: 'emergency',
    serviceLink: '/services/toilet-fixture-repairs',
  },
  {
    id: 'clogged-drain',
    title: 'Clogged Drains',
    description: 'Severe drain or sewer backup',
    icon: 'drain',
    urgency: 'urgent',
    serviceLink: '/services/drain-cleaning-sewer-services',
  },
  {
    id: 'water-leak',
    title: 'Water Leaks',
    description: 'Hidden or visible water leaks',
    icon: 'leak',
    urgency: 'urgent',
    serviceLink: '/services/leak-detection',
  },
  {
    id: 'sewer-backup',
    title: 'Sewer Backup',
    description: 'Sewage backing up into home',
    icon: 'drain',
    urgency: 'emergency',
    serviceLink: '/services/drain-cleaning-sewer-services',
  },
];

// Greg's Credentials
export const CREDENTIALS = [
  '16+ years plumbing experience',
  'State licensed master plumber',
  'Experienced pipe fitter/steam fitter',
  'Boiler troubleshooting and installation (Hydronic and steam)',
  'State Backflow Inspector including RPZ\'s',
  'Master licensed Gas fitter',
  'Experienced residential and commercial pump installation (Taco, Armstrong, Bell and Gossett, Grundfos, Honeywell)',
  'Master LP Gas fitter',
];

// Why Choose Us
export const WHY_CHOOSE_US = [
  {
    title: 'Fastest Emergency Response',
    description: 'We respond quickly to emergency calls in Cave Spring and surrounding areas',
    icon: 'emergency',
  },
  {
    title: 'Upfront Pricing',
    description: 'No surprises - we provide clear pricing before we start any work',
    icon: 'pricing',
  },
  {
    title: 'Family-Owned & Local',
    description: 'Locally owned business serving our community with pride',
    icon: 'local',
  },
  {
    title: 'Licensed & Insured',
    description: 'Fully licensed master plumber with comprehensive insurance',
    icon: 'shield',
  },
  {
    title: '1-Year Labor Guarantee',
    description: 'We stand behind our work with a full year warranty on labor',
    icon: 'guarantee',
  },
  {
    title: 'Veteran Discounts',
    description: 'Special discounts for veterans and first responders',
    icon: 'veteran',
  },
];

