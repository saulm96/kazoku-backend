import mongoose from 'mongoose';
import Type from '../../src/models/typeModel.js';
import Style from '../../src/models/styleModel.js';
import Subject from '../../src/models/subjectModel.js';
import User from '../../src/models/userModel.js';
import Project from '../../src/models/projectModel.js';
import Image from '../../src/models/imageModel.js';

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_DATABASE
} = process.env;

const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:27017/${MONGO_DATABASE}?authSource=admin`;

mongoose.set('strictQuery', true);

const images = [
  {
    _id: "6787c6486a9f9dfa89c55aa6",
    name: "Code Orbit Showcase",
    url: "https://i.ibb.co/wYrqG72/Captura-de-Pantalla-2025-01-05-a-las-14-38-04.png",
    __v: 0
  },
  {
    _id: "6787c6486a9f9dfa89c55aa7",
    name: "The Bike Country Showcase",
    url: "https://i.ibb.co/BP1v1BX/Captura-de-Pantalla-2025-01-05-a-las-10-44-45.png",
    __v: 0
  },
  {
    _id: "6787c6486a9f9dfa89c55aa8",
    name: "Khroma Showcase",
    url: "https://i.ibb.co/RSYwyM7/Captura-de-Pantalla-2025-01-05-a-las-11-06-58.png",
    __v: 0
  },
  {
    _id: "6787c6486a9f9dfa89c55aa9",
    name: "Selene Showcase",
    url: "https://i.ibb.co/C5tLh1J/Captura-de-Pantalla-2025-01-15-a-las-10-29-12.png",
    __v: 0
  },
  {
    _id: "6787c6486a9f9dfa89c55aaa",
    name: "Rick & Morty Showcase",
    url: "https://i.ibb.co/tLDrTZD/Captura-de-Pantalla-2025-01-15-a-las-10-32-00.png",
    __v: 0
  },
  {
    _id: "6787c6486a9f9dfa89c55aab",
    name: "Byte Bites Showcase",
    url: "https://i.ibb.co/nBhSDLL/Captura-de-Pantalla-2025-01-15-a-las-10-33-18.png",
    __v: 0
  },
  {
    _id: "6787c6486a9f9dfa89c55aac",
    name: "Flas & Countries Showcase",
    url: "https://i.ibb.co/f81hGJh/Captura-de-Pantalla-2025-01-15-a-las-10-33-55.png",
    __v: 0
  },
  {
    _id: "6787c6486a9f9dfa89c55aad",
    name: "Subaru Showcase",
    url: "https://i.ibb.co/K0DYjSj/Captura-de-Pantalla-2025-01-15-a-las-10-35-45.png",
    __v: 0
  },
  {
    _id: "6787c6486a9f9dfa89c55aae",
    name: "Trafiko Showcase",
    url: "https://i.ibb.co/2t6m3fX/Captura-de-Pantalla-2025-01-15-a-las-10-36-02.png",
    __v: 0
  },
  {
    _id: "6787c6486a9f9dfa89c55aaf",
    name: "Sinverguenza Showcase",
    url: "https://i.ibb.co/mt63hzH/Captura-de-Pantalla-2025-01-15-a-las-10-36-35.png",
    __v: 0
  },
  {
    _id: "6787c6486a9f9dfa89c55ab0",
    name: "Platto Showcase",
    url: "https://i.ibb.co/HqHxY8d/Captura-de-Pantalla-2025-01-15-a-las-10-38-58.png",
    __v: 0
  },
  {
    _id: "6787c6486a9f9dfa89c55ab1",
    name: "Mangaburu Showcase",
    url: "https://i.ibb.co/SvPsSqq/Captura-de-Pantalla-2025-01-15-a-las-10-40-02.png",
    __v: 0
  }
];

const styles = [
  { _id: "6787a93d48205cf6a33b22e1", name: "Big Type", description: "Designs that use large typography as a main element" },
  { _id: "6787a93d48205cf6a33b22e2", name: "Black & White", description: "Designs that exclusively use black and white" },
  { _id: "6787a93d48205cf6a33b22e3", name: "Colourful", description: "Designs that make intensive use of color" },
  { name: "Corporate", description: "Designs with a corporate and professional style" },
  { name: "Editorial", description: "Designs focused on editorial content presentation" },
  { name: "Greyscale", description: "Designs that use different shades of grey" },
  { name: "Grid Layout", description: "Designs based on grid structures" },
  { name: "Horizontal Layout", description: "Designs with predominant horizontal layout" },
  { name: "Illustrative", description: "Designs with emphasis on illustrations" },
  { name: "Japanese", description: "Designs inspired by Japanese aesthetics" },
  { name: "Luxury", description: "Designs with luxury and elegance aesthetics" },
  { name: "Minimal", description: "Minimalist and simplified designs" },
  { name: "Monochrome", description: "Designs that use variations of a single color" },
  { name: "Pattern", description: "Designs based on repetitive patterns" },
  { name: "Retro & Vintage", description: "Designs with retro or vintage aesthetics" },
  { name: "Typographic", description: "Designs centered on typography" },
  { name: "Unusual Layout", description: "Designs with unconventional layouts" },
  { name: "Unusual Navigation", description: "Designs with innovative navigation" },
  { name: "Use of Animation", description: "Designs that incorporate animations" },
  { name: "Use of Infographics", description: "Designs that utilize infographics" }
];

const types = [
  { _id: "6787a93d48205cf6a33b22f7", name: "Agencies & Consultancies", description: "Websites for agencies and consultancies" },
  { _id: "6787a93d48205cf6a33b22f8", name: "Annual Reports", description: "Annual reports and corporate reporting" },
  { _id: "6787a93d48205cf6a33b22f9", name: "Awards", description: "Award and recognition websites" },
  { name: "Blog", description: "Blogs and content platforms" },
  { name: "Cafés, Bars & Restaurants", description: "Websites for hospitality establishments" },
  { name: "Community", description: "Community platforms and websites" },
  { name: "Conferences & Festivals", description: "Events, conferences, and festivals" },
  { name: "Creative Showcase", description: "Exhibition of creative works" },
  { name: "Dance & Theatre", description: "Dance and theatre websites" },
  { name: "E-Commerce", description: "Online stores" },
  { name: "Educational Resource", description: "Educational resources" },
  { name: "Event Calendar", description: "Event calendars" },
  { name: "Exhibitions", description: "Exhibitions and showcases" },
  { name: "Florists", description: "Florist websites" },
  { name: "Galleries & Museums", description: "Galleries and museums" },
  { name: "Hotels & Venues", description: "Hotels and event venues" },
  { name: "Magazines", description: "Digital magazines" },
  { name: "Medicine & Pharmaceutical", description: "Medical and pharmaceutical websites" },
  { name: "Mobile & Web Applications", description: "Mobile and web applications" },
  { name: "Music Artists & Bands", description: "Music artists and bands" },
  { name: "Music Network", description: "Music networks" },
  { name: "Newspaper", description: "Digital newspapers" },
  { name: "Non-profit & Charity", description: "Non-profit organizations" },
  { name: "Personal", description: "Personal websites" },
  { name: "Portfolio", description: "Work portfolios" },
  { name: "Product Catalogues & Collections", description: "Product catalogs" },
  { name: "Property", description: "Property websites" },
  { name: "Radio & Podcasts", description: "Radio and podcasts" },
  { name: "Recipes", description: "Recipe websites" },
  { name: "Record Labels", description: "Record labels" },
  { name: "Reference & Directories", description: "References and directories" },
  { name: "Schools, Colleges & Universities", description: "Educational institutions" },
  { name: "Tech Start-ups", description: "Technology startups" },
  { name: "Travel Agencies", description: "Travel agencies" },
  { name: "Type Foundry", description: "Type foundries" },
  { name: "Videos", description: "Video platforms" },
  { name: "Winery & Vineyard", description: "Wineries and vineyards" }
];

const subjects = [
  { _id: "6787a93d48205cf6a33b231e", name: "Advertising", description: "Advertising and marketing" },
  { _id: "6787a93d48205cf6a33b231f", name: "Art", description: "Art and creative expression" },
  { _id: "6787a93d48205cf6a33b2320", name: "Web & Interactive Design", description: "Web and interactive design focused on creating engaging digital experiences" },
  { name: "Animation & Moving Image", description: "Animation and moving images" },
  { name: "Architectural & Building Products", description: "Architectural and building products" },
  { name: "Architecture", description: "Architecture" },
  { name: "Automotive", description: "Automotive industry" },
  { name: "Books & Literature", description: "Books and literature" },
  { name: "Bridal & Weddings", description: "Weddings and bridal events" },
  { name: "Building & Construction", description: "Building and construction" },
  { name: "Business & Finance", description: "Business and finance" },
  { name: "Children", description: "Children's content" },
  { name: "Consumer", description: "Consumer products" },
  { name: "Copywriting", description: "Copywriting" },
  { name: "Cosmetics & Skincare", description: "Cosmetics and skincare" },
  { name: "Co-working", description: "Co-working spaces" },
  { name: "Craft", description: "Crafts" },
  { name: "Crypto & Web3", description: "Cryptocurrency and Web3" },
  { name: "Culture", description: "Culture" },
  { name: "Cycling", description: "Cycling" },
  { name: "Design & Art Direction", description: "Design and art direction" },
  { name: "Education", description: "Education" },
  { name: "Entertainment", description: "Entertainment" },
  { name: "Environment & Sustainability", description: "Environment and sustainability" },
  { name: "Events", description: "Events" },
  { name: "Farming & Agriculture", description: "Farming and agriculture" },
  { name: "Fashion", description: "Fashion" },
  { name: "Food & Drink", description: "Food and drink" },
  { name: "Furniture", description: "Furniture" },
  { name: "Games & Gaming", description: "Games and gaming" },
  { name: "Government", description: "Government" },
  { name: "Health & Fitness", description: "Health and fitness" },
  { name: "History", description: "History" },
  { name: "Home & Garden", description: "Home and garden" },
  { name: "Illustration", description: "Illustration" },
  { name: "Industry & Energy", description: "Industry and energy" },
  { name: "Interior Design", description: "Interior design" },
  { name: "Journalism", description: "Journalism" },
  { name: "Landscape Design", description: "Landscape design" },
  { name: "Legal", description: "Legal" },
  { name: "Marketing & Branding", description: "Marketing and branding" },
  { name: "Movies", description: "Movies" },
  { name: "Music", description: "Music" },
  { name: "News & Current Affairs", description: "News and current affairs" },
  { name: "Photography", description: "Photography" },
  { name: "Politics & Government", description: "Politics and government" },
  { name: "PR", description: "Public relations" },
  { name: "Printing & Stationery", description: "Printing and stationery" },
  { name: "Product Design", description: "Product design" },
  { name: "Property & Real Estate", description: "Property and real estate" },
  { name: "Publishing", description: "Publishing" },
  { name: "Religion", description: "Religion" },
  { name: "Science", description: "Science" },
  { name: "Set Designer", description: "Set design" },
  { name: "Sports", description: "Sports" },
  { name: "Technology", description: "Technology" },
  { name: "Television", description: "Television" },
  { name: "Transport & Shipping", description: "Transport and shipping" },
  { name: "Travel", description: "Travel" },
  { name: "Typography", description: "Typography" },
  { name: "Web & App Development", description: "Web and app development" },
  { name: "Writing", description: "Writing" }
];

const users = [
  {
    _id: "6787aff4ed35bca641f90e73",
    name: "Bill",
    lastname: "Urrutia",
    username: "izo",
    email: "izorrai@gmail.co",
    password: "$2a$10$du120xiAmKKgM6v0VWs0b.cO17E5RlNPCw2xXCRGF7Tmoj6DRT1ga",
    telephone: "123456789",
    specialization: "Frontend",
    website: ["www.izorrai.com"],
    github: "",
    linkedin: "www.izorrai.com",
    instagram: "www.izorrai.com",
    description: "Master of the Universe",
    privacy: true,
    country: "Italy",
    city: "Milan",
    projectlike: ["6787ca4b2a746a8a63a1d99e", "6787ca4b2a746a8a63a1d9a1"],
    followers: ["6787b01ded35bca641f90e76", "6787aff4ed35bca641f90e74"],
    following: ["6787b01ded35bca641f90e76"],
    avatar: "",
    isActivated: true,
    role: "user",
    createdAt: "2025-01-15T12:54:12.942Z",
    __v: 0
  },
  {
    _id: "67864e90aeb9f34e2a18bfc1",
    name: "Jonathan",
    lastname: "Grado",
    username: "JGrado",
    email: "jonathan.grado@gmail.com",
    password: "$2a$10$du120xiAmKKgM6v0VWs0b.cO17E5RlNPCw2xXCRGF7Tmoj6DRT1ga",
    telephone: "123456789",
    specialization: "Fullstack",
    website: [],
    github: "www.jonathangrado.com",
    linkedin: "www.JonathanGrado.com",
    instagram: "www.JonathanGrado.com",
    description: "Full Stack Developer & Coffee Lover",
    privacy: true,
    country: "España",
    city: "Barcelona",
    avatar: "",
    isActivated: true,
    projectlike: ["6787ca4b2a746a8a63a1d99e"],
    followers: ["6787b01ded35bca641f90e76", "6787aff4ed35bca641f90e74"],
    following: ["6787b01ded35bca641f90e76"],
    role: "user",
    createdAt: "2025-01-14T11:47:24.068Z",
    __v: 0
  },
  {
    _id: "6787b01ded35bca641f90e76",
    name: "Bill",
    lastname: "Urrutia",
    username: "izorrai",
    email: "izorrai2@gmail.com",
    password: "$2a$10$du120xiAmKKgM6v0VWs0b.cO17E5RlNPCw2xXCRGF7Tmoj6DRT1ga",
    telephone: "123456789",
    specialization: "Frontend",
    website: ["www.izorrai.com"],
    github: "",
    linkedin: "www.izorrai.com",
    instagram: "www.izorrai.com",
    description: "Master of the Universe",
    privacy: true,
    country: "Italy",
    city: "Milan",
    projectlike: ["6787ca4b2a746a8a63a1d99e"],
    followers: ["6787aff4ed35bca641f90e73", "6787aff4ed35bca641f90e74"],
    following: ["6787aff4ed35bca641f90e73"],
    avatar: "",
    isActivated: true,
    role: "user",
    createdAt: "2025-01-15T12:54:53.366Z",
    __v: 0
  },
  {
    _id: "6787aff4ed35bca641f90e74",
    name: "Another",
    lastname: "User",
    username: "anotheruser",
    email: "anotheruser@gmail.com",
    password: "$2a$10$du120xiAmKKgM6v0VWs0b.cO17E5RlNPCw2xXCRGF7Tmoj6DRT1ga",
    telephone: "123456789",
    specialization: "UX/UI",
    website: ["https://anotheruserportfolio.com"],
    github: "",
    linkedin: "https://linkedin.com/in/anotheruser",
    instagram: "https://instagram.com/anotheruser",
    description: "Passionate artist and designer",
    privacy: true,
    country: "Spain",
    city: "Barcelona",
    projectlike: [],
    followers: ["6787b01ded35bca641f90e76", "6787aff4ed35bca641f90e73"],
    following: ["6787b01ded35bca641f90e76"],
    avatar: "",
    isActivated: true,
    role: "user",
    createdAt: "2025-01-15T12:54:12.942Z",
    __v: 0
  },
  {
    _id: "6787aff4ed35bca641f90e75",
    name: "Emily",
    lastname: "Carter",
    username: "emilycarter",
    email: "emilycarter@gmail.com",
    password: "$2a$10$du120xiAmKKgM6v0VWs0b.cO17E5RlNPCw2xXCRGF7Tmoj6DRT1ga",
    telephone: "123456789",
    specialization: "UX/UI",
    website: ["https://emilycarterdesigns.com"],
    github: "",
    linkedin: "https://linkedin.com/in/emilycarter",
    instagram: "https://instagram.com/emilycarter",
    description: "Interactive designer and color expert",
    privacy: true,
    country: "USA",
    city: "New York",
    projectlike: ["6787ca4b2a746a8a63a1d99e"],
    followers: ["6787b01ded35bca641f90e76", "6787aff4ed35bca641f90e73"],
    following: ["6787b01ded35bca641f90e76"],
    avatar: "",
    isActivated: true,
    role: "user",
    createdAt: "2025-01-15T12:54:12.942Z",
    __v: 0
  },
  {
    _id: "6787aff4ed35bca641f90e77",
    name: "Samuel",
    lastname: "Correia",
    username: "samuelcorreia",
    email: "samuelcorreia@gmail.com",
    password: "$2a$10$du120xiAmKKgM6v0VWs0b.cO17E5RlNPCw2xXCRGF7Tmoj6DRT1ga",
    telephone: "123456789",
    specialization: "Fullstack",
    website: ["https://selene.com"],
    github: "",
    linkedin: "https://linkedin.com/in/samuelcorreia",
    instagram: "https://instagram.com/selene",
    description: "Cycling enthusiast and platform founder",
    privacy: true,
    country: "Spain",
    city: "Euskadi",
    projectlike: ["6787ca4b2a746a8a63a1d99e"],
    followers: ["6787b01ded35bca641f90e76", "6787aff4ed35bca641f90e73"],
    following: ["6787b01ded35bca641f90e76"],
    avatar: "",
    isActivated: true,
    role: "user",
    createdAt: "2025-01-15T12:54:12.942Z",
    __v: 0
  },
  {
    _id: "6787aff4ed35bca641f90e78",
    name: "Sophia",
    lastname: "Johnson",
    username: "sophiajohnson",
    email: "sophiajohnson@gmail.com",
    password: "$2a$10$du120xiAmKKgM6v0VWs0b.cO17E5RlNPCw2xXCRGF7Tmoj6DRT1ga",
    telephone: "123456789",
    specialization: "UX/UI",
    website: ["https://sophiajohnsondesigns.com"],
    github: "",
    linkedin: "https://linkedin.com/in/sophiajohnson",
    instagram: "https://instagram.com/sophiajohnson",
    description: "Creative designer and fan project curator",
    privacy: true,
    country: "USA",
    city: "Los Angeles",
    projectlike: [],
    followers: ["6787b01ded35bca641f90e76", "6787aff4ed35bca641f90e73"],
    following: ["6787b01ded35bca641f90e76"],
    isActivated: true,
    avatar: "",
    role: "user",
    createdAt: "2025-01-15T12:54:12.942Z",
    __v: 0
  },
  {
    _id: "6787aff4ed35bca641f90e79",
    name: "Daniel",
    lastname: "Lee",
    username: "daniellee",
    email: "daniellee@gmail.com",
    password: "$2a$10$du120xiAmKKgM6v0VWs0b.cO17E5RlNPCw2xXCRGF7Tmoj6DRT1ga",
    telephone: "123456789",
    specialization: "Frontend",
    website: ["https://bytebites.com"],
    github: "",
    linkedin: "https://linkedin.com/in/daniellee",
    instagram: "https://instagram.com/bytebites",
    description: "Recipe enthusiast and interactive platform developer",
    privacy: true,
    country: "Canada",
    city: "Toronto",
    projectlike: ["6787ca4b2a746a8a63a1d98d","6787ca4b2a746a8a63a1d99e"],
    followers: ["6787b01ded35bca641f90e76", "6787aff4ed35bca641f90e73"],
    following: ["6787b01ded35bca641f90e76"],
    isActivated: true,
    avatar: "",
    role: "user",
    createdAt: "2025-01-15T12:54:12.942Z",
    __v: 0
  },
  {
    _id: "6787aff4ed35bca641f90e80",
    name: "Isabella",
    lastname: "Martinez",
    username: "isabellam",
    email: "isabella.m@example.com",
    password: "$2a$10$du120xiAmKKgM6v0VWs0b.cO17E5RlNPCw2xXCRGF7Tmoj6DRT1ga",
    telephone: "123456789",
    specialization: "UX/UI",
    website: ["https://isabellam.com"],
    github: "",
    linkedin: "https://linkedin.com/in/isabellam",
    instagram: "https://instagram.com/isabellam",
    description: "Cultural researcher and developer",
    privacy: true,
    country: "Spain",
    city: "Madrid",
    projectlike: ["6787ca4b2a746a8a63a1d98d","6787ca4b2a746a8a63a1d99e"],
    followers: ["6787b01ded35bca641f90e76", "6787aff4ed35bca641f90e73"],
    following: ["6787b01ded35bca641f90e76"],
    avatar: "",
    isActivated: true,
    role: "user",
    createdAt: "2024-01-01T00:00:00.000Z",
    __v: 0
  },
  {
    _id: "6788efdce53f5c9fa687322b",
    name: "Saul",
    lastname: "Mora",
    username: "world-distroyer",
    email: "saul@gmail.com",
    password: "$2a$10$Pr40CabZ1m6W8D939Bz3rODad2XW1Jd0DjsYegRCNhy0xBdejJnMm",
    telephone: "123456789",
    specialization: "Frontend",
    website: [],
    github: "",
    linkedin: "",
    instagram: "",
    description: "",
    privacy: true,
    country: "Japan",
    city: "Tokyo",
    projectlike: [],
    followers: [],
    following: [],
    avatar: "",
    isActivated: true,
    createdAt: "2025-01-16T11:39:08.234Z",
    role: "admin",
    __v: 0
}
];

const projects = [
  {
    _id: "6787ca4b2a746a8a63a1d98d",
    name: "Code Orbit",
    date: "2025-08-12T00:00:00.000Z",
    description: "An innovative platform showcasing cutting-edge coding projects and creative solutions. Code Orbit is the go-to space for developers and designers to explore, collaborate, and share their passion for technology.",
    status: "active",
    likes: 4,
    url: "www.google.es",
    owner: "6787aff4ed35bca641f90e73",
    team_members: ["67865310f4b9825cde7c9a18", "6787b01ded35bca641f90e76"],
    types: ["6787a93d48205cf6a33b22f7"],
    styles: ["6787a93d48205cf6a33b231e"],
    subjects: ["6787a93d48205cf6a33b231e"],
    images: ["6787c6486a9f9dfa89c55aa6"],
    createdAt: "2025-01-15T14:46:35.355Z",
    updatedAt: "2025-01-15T14:46:35.355Z"
  },
  {
    _id: "6787ca4b2a746a8a63a1d99e",
    name: "The Bike Country",
    date: "2024-01-12T00:00:00.000Z",
    description: "The Bike Country is a captivating portfolio that embodies elegance and creativity. With a focus on design and artistry, it highlights unique projects that inspire and engage the audience.",
    status: "active",
    likes: 0,
    url: "https://enlace-externo.com",
    owner: "6787aff4ed35bca641f90e74",
    team_members: [],
    types: ["6787a93d48205cf6a33b22f8"],
    styles: ["6787a93d48205cf6a33b22e2"],
    subjects: ["6787a93d48205cf6a33b231f"],
    images: ["6787c6486a9f9dfa89c55aa7"],
    createdAt: "2025-01-15T14:46:35.355Z",
    updatedAt: "2025-01-15T14:46:35.355Z"
  },
  {
    _id: "6787ca4b2a746a8a63a1d99f",
    name: "Khroma",
    date: "2024-01-13T00:00:00.000Z",
    description: "Khroma is a vibrant and interactive portfolio showcasing dynamic color schemes and design explorations. It offers tools and inspiration for creative professionals to craft stunning visual experiences.",
    status: "active",
    likes: 0,
    url: "https://enlace-externo.com",
    owner: "6787aff4ed35bca641f90e75",
    team_members: [],
    types: ["6787a93d48205cf6a33b22f9"],
    styles: ["6787a93d48205cf6a33b22e3"],
    subjects: ["6787a93d48205cf6a33b2320"],
    images: ["6787c6486a9f9dfa89c55aa8"],
    createdAt: "2025-01-15T14:46:35.355Z",
    updatedAt: "2025-01-15T14:46:35.355Z"
  },
  {
    _id: "6787ca4b2a746a8a63a1d9a0",
    name: "Selene",
    date: "2024-01-11T00:00:00.000Z",
    description: "Selene is a premium platform dedicated to cycling tourism in the heart of Euskadi. Featuring tailored experiences, professional guides, and curated routes, it offers an unforgettable journey for cycling enthusiasts.",
    status: "active",
    likes: 0,
    url: "https://enlace-externo.com",
    owner: "6787aff4ed35bca641f90e77",
    team_members: [],
    types: ["6787a93d48205cf6a33b22f8"],
    styles: ["6787a93d48205cf6a33b22e2"],
    subjects: ["6787a93d48205cf6a33b2320"],
    images: ["6787c6486a9f9dfa89c55aa9"],
    createdAt: "2025-01-15T14:46:35.355Z",
    updatedAt: "2025-01-15T14:46:35.355Z"
  },
  {
    _id: "6787ca4b2a746a8a63a1d9a1",
    name: "Rick & Morty",
    date: "2024-01-15T00:00:00.000Z",
    description: "A fan project inspired by the wildly imaginative and adventurous universe of Rick and Morty, showcasing creative designs and interactive elements that bring the multiverse to life.",
    status: "active",
    likes: 0,
    url: "https://enlace-externo.com",
    owner: "6787aff4ed35bca641f90e78",
    team_members: [],
    types: ["6787a93d48205cf6a33b22f8"],
    styles: ["6787a93d48205cf6a33b22e2"],
    subjects: ["6787a93d48205cf6a33b2320"],
    images: ["6787c6486a9f9dfa89c55aaa"],
    createdAt: "2025-01-15T14:46:35.355Z",
    updatedAt: "2025-01-15T14:46:35.355Z"
  },
  {
    _id: "6787ca4b2a746a8a63a1d9a2",
    name: "Byte Bites",
    date: "2024-01-07T00:00:00.000Z",
    description: "An interactive platform for discovering and saving recipes, offering an intuitive search by ingredients, meal type, or diet.",
    status: "active",
    likes: 0,
    url: "https://enlace-externo.com",
    owner: "6787aff4ed35bca641f90e79",
    team_members: [],
    types: ["6787a93d48205cf6a33b22f8"],
    styles: ["6787a93d48205cf6a33b22e2"],
    subjects: ["6787a93d48205cf6a33b2320"],
    images: ["6787c6486a9f9dfa89c55aab"],
    createdAt: "2025-01-15T14:46:35.355Z",
    updatedAt: "2025-01-15T14:46:35.355Z"
  },
  {
    _id: "6787ca4b2a746a8a63a1d981",
    name: "Flas & Countries",
    date: "2024-01-10T00:00:00.000Z",
    description: "Explore world cultures and traditions through an interactive map, offering insights into history, customs, and curiosities.",
    status: "active",
    likes: 0,
    url: "https://enlace-externo.com",
    owner: "6787aff4ed35bca641f90e80",
    team_members: [],
    types: ["6787a93d48205cf6a33b22f7"],
    styles: ["6787a93d48205cf6a33b22e1"],
    subjects: ["6787a93d48205cf6a33b231e"],
    images: ["6787c6486a9f9dfa89c55aac"],
    createdAt: "2025-01-15T14:46:35.355Z",
    updatedAt: "2025-01-15T14:46:35.355Z"
  },
  {
    _id: "6787ca4b2a746a8a63a1d983",
    name: "Subaru",
    date: "2023-12-31T00:00:00.000Z",
    description: "A modern site dedicated to Subaru enthusiasts, featuring the latest models, technical specs, and brand news.",
    status: "active",
    likes: 0,
    url: "https://enlace-externo.com",
    owner: "6787aff4ed35bca641f90e73",
    team_members: [],
    types: ["6787a93d48205cf6a33b22f7"],
    styles: ["6787a93d48205cf6a33b22e1"],
    subjects: ["6787a93d48205cf6a33b231e"],
    images: ["6787c6486a9f9dfa89c55aad"],
    createdAt: "2023-12-31T00:00:00.000Z",
    updatedAt: "2023-12-31T00:00:00.000Z"
  },
  {
    _id: "6787ca4b2a746a8a63a1d984",
    name: "Trafiko",
    date: "2023-12-24T00:00:00.000Z",
    description: "Real-time traffic information platform with personalized alerts, interactive maps, and optimized routes.",
    status: "active",
    likes: 0,
    url: "https://enlace-externo.com",
    owner: "6787aff4ed35bca641f90e74",
    team_members: [],
    types: ["6787a93d48205cf6a33b22f7"],
    styles: ["6787a93d48205cf6a33b22e1"],
    subjects: ["6787a93d48205cf6a33b231e"],
    images: ["6787c6486a9f9dfa89c55aae"],
    createdAt: "2023-12-24T00:00:00.000Z",
    updatedAt: "2023-12-24T00:00:00.000Z"
  },
  {
    _id: "6787ca4b2a746a8a63a1d985",
    name: "Sinverguenza",
    date: "2024-01-14T00:00:00.000Z",
    description: "An online store offering bold, trendy fashion and accessories with a unique shopping experience.",
    status: "active",
    likes: 0,
    url: "https://enlace-externo.com",
    owner: "6787aff4ed35bca641f90e75",
    team_members: [],
    types: ["6787a93d48205cf6a33b22f7"],
    styles: ["6787a93d48205cf6a33b22e1"],
    subjects: ["6787a93d48205cf6a33b231e"],
    images: ["6787c6486a9f9dfa89c55aaf"],
    createdAt: "2024-01-14T00:00:00.000Z",
    updatedAt: "2024-01-14T00:00:00.000Z"
  },
  {
    _id: "6787ca4b2a746a8a63a1d986",
    name: "Platto",
    date: "2024-01-06T00:00:00.000Z",
    description: "A platform connecting chefs, restaurants, and food lovers, offering personalized dining experiences and innovative dishes.",
    status: "active",
    likes: 0,
    url: "https://enlace-externo.com",
    owner: "6787aff4ed35bca641f90e76",
    team_members: [],
    types: ["6787a93d48205cf6a33b22f7"],
    styles: ["6787a93d48205cf6a33b22e1"],
    subjects: ["6787a93d48205cf6a33b231e"],
    images: ["6787c6486a9f9dfa89c55ab0"],
    createdAt: "2024-01-06T00:00:00.000Z",
    updatedAt: "2024-01-06T00:00:00.000Z"
  },
  {
    _id: "6787ca4b2a746a8a63a1d987",
    name: "Mangaburu",
    date: "2024-01-08T00:00:00.000Z",
    description: "An interactive site for manga and anime fans, featuring reviews, news, and a vast library of titles.",
    status: "active",
    likes: 0,
    url: "https://enlace-externo.com",
    owner: "6787aff4ed35bca641f90e77",
    team_members: [],
    types: ["6787a93d48205cf6a33b22f7"],
    styles: ["6787a93d48205cf6a33b22e1"],
    subjects: ["6787a93d48205cf6a33b231e"],
    images: ["6787c6486a9f9dfa89c55ab1"],
    createdAt: "2024-01-08T00:00:00.000Z",
    updatedAt: "2024-01-08T00:00:00.000Z"
  }
];
async function initializeDatabase() {
  let connection;
  try {
    connection = await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('Connected to MongoDB CodeOrbit');

    // Insert images
    const imagesCount = await Image.countDocuments();
    if (imagesCount === 0) {
      console.log('Inserting images...');
      const insertedImages = await Image.insertMany(images);
      console.log(`${insertedImages.length} images successfully inserted`);
    } else {
      console.log(`${imagesCount} images already exist in the database`);
    }

    // Insert styles
    const stylesCount = await Style.countDocuments();
    if (stylesCount === 0) {
      console.log('Inserting styles...');
      const insertedStyles = await Style.insertMany(styles);
      console.log(`${insertedStyles.length} styles successfully inserted`);
    } else {
      console.log(`${stylesCount} styles already exist in the database`);
    }

    // Insert types
    const typesCount = await Type.countDocuments();
    if (typesCount === 0) {
      console.log('Inserting types...');
      const insertedTypes = await Type.insertMany(types);
      console.log(`${insertedTypes.length} types successfully inserted`);
    } else {
      console.log(`${typesCount} types already exist in the database`);
    }

    // Insert subjects
    const subjectsCount = await Subject.countDocuments();
    if (subjectsCount === 0) {
      console.log('Inserting subjects...');
      const insertedSubjects = await Subject.insertMany(subjects);
      console.log(`${insertedSubjects.length} subjects successfully inserted`);
    } else {
      console.log(`${subjectsCount} subjects already exist in the database`);
    }

    // Insert users
    const usersCount = await User.countDocuments();
    if (usersCount === 0) {
      console.log('Inserting users...');
      const insertedUsers = await User.insertMany(users);
      console.log(`${insertedUsers.length} users successfully inserted`);
    } else {
      console.log(`${usersCount} users already exist in the database`);
    }

    // Insert projects
    const projectsCount = await Project.countDocuments();
    if (projectsCount === 0) {
      console.log('Inserting projects...');
      const insertedProjects = await Project.insertMany(projects);
      console.log(`${insertedProjects.length} projects successfully inserted`);
    } else {
      console.log(`${projectsCount} projects already exist in the database`);
    }

    console.log('Initialization process completed successfully');

  } catch (error) {
    console.error('Error during initialization:', error);
    throw error;
  } finally {
    if (connection) {
      try {
        await mongoose.disconnect();
        console.log('MongoDB connection closed');
      } catch (error) {
        console.error('Error closing connection:', error);
      }
    }
    process.exit(0);
  }
}

// Execute initialization
initializeDatabase().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});