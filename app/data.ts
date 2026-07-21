import type { IconName } from "./components/SiteChrome";

export type Destination = {
  slug: string;
  title: string;
  region: string;
  tagline: string;
  summary: string;
  image: string;
  secondaryImage: string;
  duration: string;
  bestTime: string;
  altitude: string;
  highlights: string[];
  itinerary: { day: string; title: string; copy: string }[];
};

export const destinations: Destination[] = [
  {
    slug: "swat-kalam-malam-jabba",
    title: "Swat, Kalam & Malam Jabba",
    region: "Khyber Pakhtunkhwa",
    tagline: "Rivers, forests and alpine adventure",
    summary: "A refreshing journey through Swat's green valleys, Kalam's riverside scenery and the mountain playground of Malam Jabba.",
    image: "/images/swat-malam.webp",
    secondaryImage: "/images/kalam-valley.webp",
    duration: "5–7 Days",
    bestTime: "April–October",
    altitude: "2,804 m",
    highlights: ["Malam Jabba chairlift", "Kalam riverside", "Ushu forest", "Mahodand Lake"],
    itinerary: [
      { day: "Day 01", title: "Arrival in Swat", copy: "Scenic drive, hotel check-in and an evening beside the Swat River." },
      { day: "Day 02", title: "Malam Jabba", copy: "Chairlift views, forest walks and mountain activities with your guide." },
      { day: "Day 03–04", title: "Kalam & Ushu", copy: "Continue toward Kalam, explore Ushu forest and enjoy a relaxed valley evening." },
    ],
  },
  {
    slug: "hunza-khunjerab-pass",
    title: "Hunza & Khunjerab Pass",
    region: "Gilgit-Baltistan",
    tagline: "Ancient culture beneath giant peaks",
    summary: "Discover Hunza's forts, welcoming villages and legendary mountain views before following the Karakoram Highway to Khunjerab Pass.",
    image: "/images/hunza-spring.webp",
    secondaryImage: "/images/pass-road.webp",
    duration: "7–9 Days",
    bestTime: "April–October",
    altitude: "4,693 m",
    highlights: ["Baltit & Altit forts", "Attabad Lake", "Passu cones", "Khunjerab Pass"],
    itinerary: [
      { day: "Day 01–02", title: "Journey to Hunza", copy: "Travel along the Karakoram Highway and settle into the heart of Hunza." },
      { day: "Day 03", title: "Karimabad Heritage", copy: "Explore historic forts, village lanes and panoramic viewpoints." },
      { day: "Day 04–05", title: "Upper Hunza", copy: "Visit Attabad Lake, Passu and the spectacular Khunjerab corridor." },
    ],
  },
  {
    slug: "mushkpuri-top",
    title: "Mushkpuri Top",
    region: "Galiyat",
    tagline: "A classic ridge walk above the clouds",
    summary: "A rewarding day trek through pine forest and open meadows to one of Galiyat's most beautiful panoramic ridges.",
    image: "/images/mushkpuri-trail.webp",
    secondaryImage: "/images/alpine-lake.webp",
    duration: "1–2 Days",
    bestTime: "March–November",
    altitude: "2,800 m",
    highlights: ["Dunga Gali trail", "Pine forest", "Cloud viewpoints", "Meadow picnic"],
    itinerary: [
      { day: "Morning", title: "Trail Briefing", copy: "Meet your guide, prepare essentials and begin through the pine forest." },
      { day: "Midday", title: "Mushkpuri Summit", copy: "Reach the ridge for open views, photography and a packed lunch." },
      { day: "Afternoon", title: "Return to Galiyat", copy: "Descend at an easy pace and stop for tea before departure." },
    ],
  },
  {
    slug: "kumrat-jahaz-banda",
    title: "Kumrat Valley & Jahaz Banda",
    region: "Upper Dir",
    tagline: "Wild forests and storybook meadows",
    summary: "A guided escape into Kumrat's deodar forest, tumbling rivers and the high green meadows of Jahaz Banda.",
    image: "/images/jahaz-banda.webp",
    secondaryImage: "/images/kumrat-waterfall.webp",
    duration: "4–6 Days",
    bestTime: "May–September",
    altitude: "3,100 m",
    highlights: ["Jahaz Banda meadow", "Katora Lake trail", "Kumrat waterfall", "Forest camping"],
    itinerary: [
      { day: "Day 01", title: "Enter Kumrat", copy: "Jeep transfer into the valley, riverside exploration and forest stay." },
      { day: "Day 02", title: "Jahaz Banda", copy: "Guided climb to the meadow, local lunch and sunset among the peaks." },
      { day: "Day 03", title: "Waterfalls & Forest", copy: "Discover Kumrat's forest trails and waterfalls before the return journey." },
    ],
  },
  {
    slug: "kalam-valley",
    title: "Kalam Valley",
    region: "Swat",
    tagline: "Turquoise rivers in a pine-lined valley",
    summary: "Slow down beside the river, explore mountain villages and take scenic day trips from the lively heart of Kalam.",
    image: "/images/kalam-valley.webp",
    secondaryImage: "/images/swat-malam.webp",
    duration: "3–5 Days",
    bestTime: "May–October",
    altitude: "2,001 m",
    highlights: ["Kalam bazaar", "Ushu forest", "Matiltan waterfall", "Mahodand Lake"],
    itinerary: [
      { day: "Day 01", title: "Welcome to Kalam", copy: "Arrive, settle in and enjoy a gentle riverside walk." },
      { day: "Day 02", title: "Ushu & Matiltan", copy: "Explore forest scenery and cascading water with a local guide." },
      { day: "Day 03", title: "Mahodand Adventure", copy: "A scenic jeep excursion toward one of the region's signature lakes." },
    ],
  },
  {
    slug: "khunjerab-pass",
    title: "Khunjerab Pass",
    region: "Upper Hunza",
    tagline: "A high road to the edge of the sky",
    summary: "Travel through the vast Khunjerab National Park on one of the world's most dramatic paved mountain routes.",
    image: "/images/pass-road.webp",
    secondaryImage: "/images/hunza-spring.webp",
    duration: "2–3 Days",
    bestTime: "May–October",
    altitude: "4,693 m",
    highlights: ["Karakoram Highway", "Passu cones", "National park", "High-altitude border"],
    itinerary: [
      { day: "Day 01", title: "Upper Hunza", copy: "Journey through Gulmit and Passu with carefully paced sightseeing." },
      { day: "Day 02", title: "Khunjerab Pass", copy: "Drive through the national park to the high mountain border." },
      { day: "Day 03", title: "Attabad Lake", copy: "Return via the lake for boating, views and a relaxed farewell lunch." },
    ],
  },
];

export const packages = [
  { title: "Hunza Panorama", type: "Scenic Escape", duration: "7 Days", group: "2–12 Guests", image: "/images/hunza-spring.webp", price: "Custom Quote", slug: "hunza-khunjerab-pass" },
  { title: "Swat & Kalam Explorer", type: "Family Favorite", duration: "6 Days", group: "2–14 Guests", image: "/images/kalam-valley.webp", price: "Custom Quote", slug: "swat-kalam-malam-jabba" },
  { title: "Kumrat Wilderness", type: "Adventure", duration: "5 Days", group: "4–10 Guests", image: "/images/kumrat-waterfall.webp", price: "Custom Quote", slug: "kumrat-jahaz-banda" },
  { title: "Jahaz Banda Meadows", type: "Guided Trek", duration: "4 Days", group: "4–12 Guests", image: "/images/jahaz-banda.webp", price: "Custom Quote", slug: "kumrat-jahaz-banda" },
  { title: "Mushkpuri Weekend", type: "Short Escape", duration: "2 Days", group: "2–16 Guests", image: "/images/mushkpuri-trail.webp", price: "Custom Quote", slug: "mushkpuri-top" },
  { title: "Khunjerab High Road", type: "Road Journey", duration: "3 Days", group: "2–10 Guests", image: "/images/pass-road.webp", price: "Custom Quote", slug: "khunjerab-pass" },
];

export type DayTour = {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  overviewTitle: string;
  overview: string[];
  date?: string;
  weekday?: string;
  price?: string;
  altitude: string;
  route: string;
  image: string;
  secondaryImage?: string;
  bookingPhone: string;
  bookingPhoneHref: string;
  confirmBy?: string;
  bookingNote?: string;
  details: { label: string; value: string; icon: IconName }[];
  highlights?: string[];
  inclusions: string[];
  exclusions?: { title: string; note: string }[];
  itinerary?: { time: string; title: string }[];
  thingsToCarry: string[];
  notes?: string[];
};

export const dayTours: DayTour[] = [
  {
    slug: "mushkpuri-top-1-day",
    title: "Mushkpuri Top",
    subtitle: "1 Day Tour",
    tagline: "Whether you're chasing snowy mountains, peaceful lakes, colorful valleys or thrilling adventures, we're here to make your dream trip simple, safe and unforgettable.",
    overviewTitle: "Mushkpuri Top 1 Day Tour from Islamabad",
    overview: [
      "Whether you're chasing snowy mountains, peaceful lakes, colorful valleys or thrilling adventures, we're here to make your dream trip simple, safe and unforgettable.",
      "Book your seat today and explore the majestic beauty of Mushkpuri with Koh Peaks — an unforgettable day trek away from the city stress.",
    ],
    price: "Rs. 5,000 / Person",
    altitude: "2,800 m",
    route: "via Dunga Gali",
    image: "/images/mushkpuri-trail.webp",
    bookingPhone: "+92 320 7538028",
    bookingPhoneHref: "tel:+923207538028",
    bookingNote: "Limited seats available — reserve your spot now!",
    details: [
      { label: "Departure Time", value: "6:00 AM Sharp — from G9 Markaz", icon: "clock" },
      { label: "Destination", value: "Mushkpuri Top via Dunga Gali", icon: "map" },
      { label: "Return", value: "8:00 PM — back to G9 Markaz", icon: "compass" },
      { label: "Duration", value: "1 Day Tour", icon: "star" },
      { label: "Ticket Price", value: "Rs. 5,000 / Person", icon: "badge" },
      { label: "Lunch", value: "Included", icon: "shield" },
    ],
    highlights: [
      "Trek to the stunning 2,800-meter-high Mushkpuri Top",
      "Walk through beautiful pine forests",
      "Enjoy spectacular mountain landscapes",
      "Capture Instagram-worthy views",
      "Experience cool weather even during summer",
      "Relax away from the city stress",
      "Meet fellow travel enthusiasts",
      "Enjoy a hassle-free guided adventure",
    ],
    inclusions: [
      "Luxury AC transport",
      "Lunch",
      "Mineral water & snacks",
      "Park entry ticket",
      "Professional tour guide",
      "Complete tour management",
    ],
    exclusions: [
      { title: "Jeep Charges", note: "Jeep ride to the top (optional) — Rs. 800–1000 extra" },
      { title: "Personal Expenses", note: "Shopping, photography and anything personal" },
      { title: "Breakfast", note: "Please have your own breakfast before departure" },
    ],
    itinerary: [
      { time: "6:00 AM", title: "Departure from G9 Markaz" },
      { time: "8:30 AM", title: "Arrival at Dunga Gali — short break" },
      { time: "9:00 AM", title: "Trek start — 4 KM hike to Mushkpuri Top" },
      { time: "12:00 PM", title: "Arrive at Mushkpuri Top — photos & enjoy" },
      { time: "1:00 PM", title: "Lunch at the top + rest" },
      { time: "2:00 PM", title: "Trek start (return)" },
      { time: "4:30 PM", title: "Dunga Gali — tea break" },
      { time: "5:00 PM", title: "Leave for Islamabad" },
      { time: "8:00 PM", title: "Drop at G9 Markaz" },
    ],
    thingsToCarry: [
      "Original CNIC",
      "Trekking shoes",
      "Comfortable joggers",
      "Light jacket",
      "Warm clothes (weather dependent)",
      "Sunglasses",
      "Sunscreen",
      "Water bottle",
      "Power bank",
      "Personal cash",
    ],
    notes: [
      "Be on time — 6:00 AM sharp departure.",
      "The trek is moderate. Stay fit & healthy.",
      "Keep the environment clean.",
      "Confirm your booking in advance to reserve your seat.",
    ],
  },
  {
    slug: "kumrat-jahaz-banda-4-days",
    title: "Kumrat Valley & Jahaz Banda",
    subtitle: "4 Days Tour",
    tagline: "Discover Pakistan's hidden paradise — untouched meadows, alpine lakes and the famous Jahaz Banda trek, all in one unforgettable trip from Islamabad.",
    overviewTitle: "Discover Pakistan's Hidden Paradise",
    overview: [
      "Experience the untouched beauty of Kumrat Valley, one of Pakistan's most breathtaking destinations, where lush green meadows, crystal-clear rivers, towering pine forests and majestic mountains create a true paradise for nature lovers.",
      "Take your adventure to the next level with the iconic Jahaz Banda Trek, famous for its alpine meadows, peaceful landscapes and an unforgettable camping experience beneath the stars.",
      "Whether you're an adventure enthusiast, a hiking lover, a photographer or simply looking to escape the city's hustle, this tour offers the perfect blend of relaxation, exploration and adventure. Join us and create memories that will stay with you forever.",
    ],
    altitude: "3,100 m",
    route: "from Islamabad",
    image: "/images/jahaz-banda.webp",
    secondaryImage: "/images/kumrat-waterfall.webp",
    bookingPhone: "+92 320 7538028",
    bookingPhoneHref: "tel:+923207538028",
    details: [
      { label: "Duration", value: "4 Days Tour", icon: "star" },
      { label: "Departure", value: "From Islamabad", icon: "compass" },
      { label: "Destination", value: "Kumrat Valley & Jahaz Banda", icon: "map" },
      { label: "Accommodation", value: "Resort stay + camping", icon: "shield" },
      { label: "Tour Guide", value: "Professional guide included", icon: "users" },
    ],
    highlights: [
      "Explore the breathtaking beauty of Kumrat Valley",
      "Visit the stunning Panjkora Lake and picturesque waterfalls",
      "Experience the famous Jahaz Banda Trek",
      "Camp under a sky full of stars surrounded by majestic mountains",
      "Travel through lush forests, rivers and scenic valleys",
      "Perfect for families, friends, couples and solo travelers",
    ],
    inclusions: [
      "Comfortable transport",
      "Resort accommodation",
      "Camping experience",
      "Professional tour guide",
      "Bonfire night",
      "Complete tour management",
      "Basic first aid support",
    ],
    thingsToCarry: [
      "Original CNIC",
      "Comfortable trekking shoes",
      "Warm jacket & extra clothes",
      "Raincoat (weather dependent)",
      "Sunglasses & sunscreen",
      "Personal medicines",
      "Water bottle",
      "Power bank",
      "Camera for beautiful memories",
    ],
  },
];

export const galleryImages = [
  ["/images/swat-malam.webp", "Swat and Malam Jabba mountain landscape", "Swat & Malam Jabba"],
  ["/images/kalam-valley.webp", "Turquoise river through Kalam Valley", "Kalam Valley"],
  ["/images/hunza-spring.webp", "Spring blossom season in Hunza", "Hunza Valley"],
  ["/images/pass-road.webp", "Winding road through Khunjerab Pass", "Khunjerab Pass"],
  ["/images/mushkpuri-trail.webp", "Green ridge trail at Mushkpuri Top", "Mushkpuri Top"],
  ["/images/jahaz-banda.webp", "Golden light over Jahaz Banda meadow", "Jahaz Banda"],
  ["/images/kumrat-waterfall.webp", "Forest waterfall in Kumrat Valley", "Kumrat Valley"],
  ["/images/alpine-lake.webp", "Pristine alpine lake and snowy mountains", "Alpine Lakes"],
  ["/images/boat-lake.webp", "Travelers boating on a turquoise lake", "Lake Experience"],
  ["/images/family.webp", "Family overlooking a mountain lake", "Family Journey"],
  ["/images/valley.webp", "Mountain village beside a blue river", "Northern Valleys"],
  ["/images/hero.webp", "Trekker overlooking the Karakoram", "Karakoram Trails"],
];
