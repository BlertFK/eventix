import mongoose from "mongoose";
import { config } from "dotenv";

config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI not found. Copy .env.example to .env.local and fill in your MongoDB connection string.");
  process.exit(1);
}

const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: String,
  time: String,
  venue: String,
  city: String,
  category: String,
  price: Number,
  tickets: Number,
  ticketsAvailable: Number,
  image: String,
  organizer: String,
  status: { type: String, default: "active" },
  ticketTypes: [{ name: String, price: Number, available: Number }],
}, { timestamps: true });

const events = [
  {
    name: "Neon Nights Music Festival",
    description: "A 3-day electronic music festival featuring world-class DJs, immersive light shows, and unforgettable performances under the stars. Experience cutting-edge sound systems and stunning visual productions.",
    date: "2025-07-15",
    time: "6:00 PM",
    venue: "Meridian Park Arena",
    city: "London",
    category: "music",
    price: 89,
    tickets: 5000,
    ticketsAvailable: 3420,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    organizer: "Eventix Live",
    ticketTypes: [
      { name: "General Admission", price: 89, available: 2500 },
      { name: "VIP", price: 199, available: 500 },
      { name: "Backstage Pass", price: 349, available: 420 },
    ],
  },
  {
    name: "Champions League Final Screening",
    description: "Watch the Champions League Final on a massive 4K LED screen with surround sound. Join thousands of passionate football fans for the ultimate matchday atmosphere with food trucks and pre-game entertainment.",
    date: "2025-06-28",
    time: "8:00 PM",
    venue: "Olympic Stadium",
    city: "Berlin",
    category: "sports",
    price: 35,
    tickets: 8000,
    ticketsAvailable: 2150,
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
    organizer: "Sports Live Events",
    ticketTypes: [
      { name: "Standard", price: 35, available: 1500 },
      { name: "Premium Seating", price: 75, available: 650 },
    ],
  },
  {
    name: "Tech Innovators Summit 2025",
    description: "The premier tech conference bringing together industry leaders, startups, and developers. Keynotes on AI, blockchain, and the future of computing. Networking sessions and hands-on workshops included.",
    date: "2025-09-10",
    time: "9:00 AM",
    venue: "Convention Center",
    city: "San Francisco",
    category: "tech",
    price: 299,
    tickets: 2000,
    ticketsAvailable: 890,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    organizer: "TechWorld Inc.",
    ticketTypes: [
      { name: "Standard Pass", price: 299, available: 500 },
      { name: "All-Access", price: 499, available: 300 },
      { name: "Speaker Dinner", price: 799, available: 90 },
    ],
  },
  {
    name: "Jazz & Wine Evening",
    description: "An intimate evening of smooth jazz performances paired with curated wines from local vineyards. Relax in a candlelit venue while enjoying world-class musicians and sommelier-selected tastings.",
    date: "2025-08-05",
    time: "7:30 PM",
    venue: "Blue Note Lounge",
    city: "New York",
    category: "music",
    price: 65,
    tickets: 300,
    ticketsAvailable: 124,
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80",
    organizer: "Jazz Collective",
    ticketTypes: [
      { name: "Standard", price: 65, available: 80 },
      { name: "Table for Two", price: 150, available: 44 },
    ],
  },
  {
    name: "Street Food World Tour",
    description: "Taste your way around the world with 50+ food vendors serving authentic street food from Asia, Latin America, Europe, and Africa. Live cooking demos, eating contests, and craft beer garden included.",
    date: "2025-07-22",
    time: "11:00 AM",
    venue: "Hyde Park",
    city: "London",
    category: "food",
    price: 15,
    tickets: 10000,
    ticketsAvailable: 7200,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    organizer: "Foodie Events UK",
    ticketTypes: [
      { name: "Day Pass", price: 15, available: 5000 },
      { name: "Weekend Pass", price: 35, available: 2200 },
    ],
  },
  {
    name: "Stand-Up Comedy Night",
    description: "An evening of non-stop laughs featuring 6 of the hottest comedians on the circuit. From observational humor to sharp political satire, this lineup promises something for everyone.",
    date: "2025-08-12",
    time: "8:30 PM",
    venue: "The Comedy Store",
    city: "Los Angeles",
    category: "comedy",
    price: 45,
    tickets: 500,
    ticketsAvailable: 180,
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&q=80",
    organizer: "Laugh Factory",
    ticketTypes: [
      { name: "General", price: 45, available: 120 },
      { name: "Front Row", price: 85, available: 60 },
    ],
  },
  {
    name: "Digital Art Exhibition",
    description: "Explore the intersection of technology and creativity in this immersive digital art experience. Featuring AI-generated art, interactive installations, and projection mapping across 10 themed rooms.",
    date: "2025-09-01",
    time: "10:00 AM",
    venue: "Modern Art Gallery",
    city: "Tokyo",
    category: "arts",
    price: 28,
    tickets: 1500,
    ticketsAvailable: 950,
    image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80",
    organizer: "ArtTech Collective",
    ticketTypes: [
      { name: "Single Entry", price: 28, available: 700 },
      { name: "Guided Tour", price: 55, available: 250 },
    ],
  },
  {
    name: "Sunrise Yoga & Wellness Retreat",
    description: "Start your morning with guided yoga sessions overlooking the ocean, followed by meditation workshops, sound healing, and organic smoothie bars. All levels welcome.",
    date: "2025-08-18",
    time: "5:30 AM",
    venue: "Bondi Beach Pavilion",
    city: "Sydney",
    category: "arts",
    price: 40,
    tickets: 200,
    ticketsAvailable: 85,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    organizer: "Zen Events",
    ticketTypes: [
      { name: "Single Session", price: 40, available: 50 },
      { name: "Full Day Pass", price: 95, available: 35 },
    ],
  },
  {
    name: "Indie Game Expo",
    description: "Play 100+ unreleased indie games, meet the developers, attend game design talks, and compete in tournaments. Prizes for best game voted by attendees. Cosplay welcome!",
    date: "2025-10-05",
    time: "10:00 AM",
    venue: "ExCeL Centre",
    city: "London",
    category: "tech",
    price: 22,
    tickets: 3000,
    ticketsAvailable: 2100,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
    organizer: "GameDev UK",
    ticketTypes: [
      { name: "Day Pass", price: 22, available: 1500 },
      { name: "2-Day Pass", price: 38, available: 600 },
    ],
  },
  {
    name: "Rooftop Cinema Under the Stars",
    description: "Watch classic and contemporary films on a giant outdoor screen from a stunning rooftop venue. Blankets, bean bags, and gourmet popcorn provided. A different film every Friday.",
    date: "2025-07-25",
    time: "9:00 PM",
    venue: "Skyline Terrace",
    city: "Barcelona",
    category: "arts",
    price: 18,
    tickets: 150,
    ticketsAvailable: 42,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
    organizer: "CineNights",
    ticketTypes: [
      { name: "Bean Bag", price: 18, available: 25 },
      { name: "Couch for Two", price: 40, available: 17 },
    ],
  },
  {
    name: "Marathon City Run 2025",
    description: "Join 20,000 runners for the annual city marathon through iconic landmarks. Categories for 5K, 10K, half marathon, and full marathon. Finisher medals and after-party included.",
    date: "2025-10-12",
    time: "7:00 AM",
    venue: "City Center Start Line",
    city: "Paris",
    category: "sports",
    price: 55,
    tickets: 20000,
    ticketsAvailable: 12500,
    image: "https://images.unsplash.com/photo-1452626038306-9aelc8deb868?w=800&q=80",
    organizer: "RunParis",
    ticketTypes: [
      { name: "5K Run", price: 25, available: 5000 },
      { name: "Half Marathon", price: 55, available: 4500 },
      { name: "Full Marathon", price: 75, available: 3000 },
    ],
  },
  {
    name: "Acoustic Sessions Live",
    description: "Intimate unplugged performances from rising singer-songwriters in a cozy candlelit venue. Limited seating ensures every seat feels like front row. BYOB welcome.",
    date: "2025-08-30",
    time: "7:00 PM",
    venue: "The Listening Room",
    city: "Nashville",
    category: "music",
    price: 30,
    tickets: 100,
    ticketsAvailable: 18,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    organizer: "Songbird Productions",
    ticketTypes: [
      { name: "General", price: 30, available: 18 },
    ],
  },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

  const count = await Event.countDocuments();
  if (count > 0) {
    console.log(`Database already has ${count} events. Skipping seed.`);
    await mongoose.disconnect();
    return;
  }

  await Event.insertMany(events);
  console.log(`Seeded ${events.length} events successfully!`);
  await mongoose.disconnect();
}

seed().catch(console.error);
