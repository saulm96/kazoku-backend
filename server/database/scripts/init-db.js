import mongoose from 'mongoose';
import Type from '../../src/models/typeModel.js';
import Style from '../../src/models/styleModel.js';
import Subject from '../../src/models/subjectModel.js';

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_DATABASE
} = process.env;

const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:27017/${MONGO_DATABASE}?authSource=admin`;

mongoose.set('strictQuery', true);

const styles = [
  { name: "Big Type", description: "Diseños que utilizan tipografía de gran tamaño como elemento principal" },
  { name: "Black & White", description: "Diseños que utilizan exclusivamente blanco y negro" },
  { name: "Colourful", description: "Diseños que hacen uso intensivo del color" },
  { name: "Corporate", description: "Diseños con estilo corporativo y profesional" },
  { name: "Editorial", description: "Diseños con enfoque en la presentación de contenido editorial" },
  { name: "Greyscale", description: "Diseños que utilizan diferentes tonos de gris" },
  { name: "Grid Layout", description: "Diseños basados en estructuras de cuadrícula" },
  { name: "Horizontal Layout", description: "Diseños con disposición horizontal predominante" },
  { name: "Illustrative", description: "Diseños con énfasis en ilustraciones" },
  { name: "Japanese", description: "Diseños inspirados en la estética japonesa" },
  { name: "Luxury", description: "Diseños con estética de lujo y elegancia" },
  { name: "Minimal", description: "Diseños minimalistas y simplificados" },
  { name: "Monochrome", description: "Diseños que utilizan variaciones de un solo color" },
  { name: "Pattern", description: "Diseños basados en patrones repetitivos" },
  { name: "Retro & Vintage", description: "Diseños con estética retro o vintage" },
  { name: "Typographic", description: "Diseños centrados en la tipografía" },
  { name: "Unusual Layout", description: "Diseños con disposiciones no convencionales" },
  { name: "Unusual Navigation", description: "Diseños con navegación innovadora" },
  { name: "Use of Animation", description: "Diseños que incorporan animaciones" },
  { name: "Use of Infographics", description: "Diseños que utilizan infografías" }
];

const types = [
  { name: "Agencies & Consultancies", description: "Sitios web para agencias y consultorías" },
  { name: "Annual Reports", description: "Informes anuales y reportes corporativos" },
  { name: "Awards", description: "Sitios de premios y reconocimientos" },
  { name: "Blog", description: "Blogs y plataformas de contenido" },
  { name: "Cafés, Bars & Restaurants", description: "Sitios para establecimientos de hostelería" },
  { name: "Community", description: "Plataformas y sitios comunitarios" },
  { name: "Conferences & Festivals", description: "Eventos, conferencias y festivales" },
  { name: "Creative Showcase", description: "Exhibición de trabajos creativos" },
  { name: "Dance & Theatre", description: "Sitios de danza y teatro" },
  { name: "E-Commerce", description: "Tiendas en línea" },
  { name: "Educational Resource", description: "Recursos educativos" },
  { name: "Event Calendar", description: "Calendarios de eventos" },
  { name: "Exhibitions", description: "Exposiciones y muestras" },
  { name: "Florists", description: "Sitios de floristerías" },
  { name: "Galleries & Museums", description: "Galerías y museos" },
  { name: "Hotels & Venues", description: "Hoteles y lugares de eventos" },
  { name: "Magazines", description: "Revistas digitales" },
  { name: "Medicine & Pharmaceutical", description: "Sitios médicos y farmacéuticos" },
  { name: "Mobile & Web Applications", description: "Aplicaciones móviles y web" },
  { name: "Music Artists & Bands", description: "Artistas musicales y bandas" },
  { name: "Music Network", description: "Redes de música" },
  { name: "Newspaper", description: "Periódicos digitales" },
  { name: "Non-profit & Charity", description: "Organizaciones sin fines de lucro" },
  { name: "Personal", description: "Sitios personales" },
  { name: "Portfolio", description: "Portafolios de trabajo" },
  { name: "Product Catalogues & Collections", description: "Catálogos de productos" },
  { name: "Property", description: "Sitios de propiedades" },
  { name: "Radio & Podcasts", description: "Radio y podcasts" },
  { name: "Recipes", description: "Sitios de recetas" },
  { name: "Record Labels", description: "Sellos discográficos" },
  { name: "Reference & Directories", description: "Referencias y directorios" },
  { name: "Schools, Colleges & Universities", description: "Instituciones educativas" },
  { name: "Tech Start-ups", description: "Startups tecnológicas" },
  { name: "Travel Agencies", description: "Agencias de viajes" },
  { name: "Type Foundry", description: "Fundiciones tipográficas" },
  { name: "Videos", description: "Plataformas de video" },
  { name: "Winery & Vineyard", description: "Bodegas y viñedos" }
];

const subjects = [
  { name: "Advertising", description: "Publicidad y marketing" },
  { name: "Animation & Moving Image", description: "Animación e imágenes en movimiento" },
  { name: "Architectural & Building Products", description: "Productos arquitectónicos y de construcción" },
  { name: "Architecture", description: "Arquitectura" },
  { name: "Art", description: "Arte" },
  { name: "Automotive", description: "Industria automotriz" },
  { name: "Books & Literature", description: "Libros y literatura" },
  { name: "Bridal & Weddings", description: "Bodas y eventos nupciales" },
  { name: "Building & Construction", description: "Construcción y edificación" },
  { name: "Business & Finance", description: "Negocios y finanzas" },
  { name: "Children", description: "Contenido infantil" },
  { name: "Consumer", description: "Productos de consumo" },
  { name: "Copywriting", description: "Redacción publicitaria" },
  { name: "Cosmetics & Skincare", description: "Cosméticos y cuidado de la piel" },
  { name: "Co-working", description: "Espacios de trabajo compartido" },
  { name: "Craft", description: "Artesanía" },
  { name: "Crypto & Web3", description: "Criptomonedas y Web3" },
  { name: "Culture", description: "Cultura" },
  { name: "Cycling", description: "Ciclismo" },
  { name: "Design & Art Direction", description: "Diseño y dirección de arte" },
  { name: "Education", description: "Educación" },
  { name: "Entertainment", description: "Entretenimiento" },
  { name: "Environment & Sustainability", description: "Medio ambiente y sostenibilidad" },
  { name: "Events", description: "Eventos" },
  { name: "Farming & Agriculture", description: "Agricultura y ganadería" },
  { name: "Fashion", description: "Moda" },
  { name: "Food & Drink", description: "Alimentación y bebidas" },
  { name: "Furniture", description: "Mobiliario" },
  { name: "Games & Gaming", description: "Juegos y gaming" },
  { name: "Government", description: "Gobierno" },
  { name: "Health & Fitness", description: "Salud y fitness" },
  { name: "History", description: "Historia" },
  { name: "Home & Garden", description: "Hogar y jardín" },
  { name: "Illustration", description: "Ilustración" },
  { name: "Industry & Energy", description: "Industria y energía" },
  { name: "Interior Design", description: "Diseño de interiores" },
  { name: "Journalism", description: "Periodismo" },
  { name: "Landscape Design", description: "Diseño de paisajes" },
  { name: "Legal", description: "Legal" },
  { name: "Marketing & Branding", description: "Marketing y branding" },
  { name: "Movies", description: "Películas" },
  { name: "Music", description: "Música" },
  { name: "News & Current Affairs", description: "Noticias y actualidad" },
  { name: "Photography", description: "Fotografía" },
  { name: "Politics & Government", description: "Política y gobierno" },
  { name: "PR", description: "Relaciones públicas" },
  { name: "Printing & Stationery", description: "Impresión y papelería" },
  { name: "Product Design", description: "Diseño de productos" },
  { name: "Property & Real Estate", description: "Propiedades y bienes raíces" },
  { name: "Publishing", description: "Publicación" },
  { name: "Religion", description: "Religión" },
  { name: "Science", description: "Ciencia" },
  { name: "Set Designer", description: "Diseño de escenografía" },
  { name: "Sports", description: "Deportes" },
  { name: "Technology", description: "Tecnología" },
  { name: "Television", description: "Televisión" },
  { name: "Transport & Shipping", description: "Transporte y envíos" },
  { name: "Travel", description: "Viajes" },
  { name: "Typography", description: "Tipografía" },
  { name: "Web & App Development", description: "Desarrollo web y de aplicaciones" },
  { name: "Web & Interactive Design", description: "Diseño web e interactivo" },
  { name: "Writing", description: "Escritura" }
];

async function initializeDatabase() {
  let connection;
  try {
    connection = await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('Conectado a MongoDB CodeOrbit');

    // Insertar estilos
    const stylesCount = await Style.countDocuments();
    if (stylesCount === 0) {
      console.log('Insertando estilos...');
      const insertedStyles = await Style.insertMany(styles);
      console.log(`${insertedStyles.length} estilos insertados exitosamente`);
    } else {
      console.log(`Ya existen ${stylesCount} estilos en la base de datos`);
    }

    // Insertar tipos
    const typesCount = await Type.countDocuments();
    if (typesCount === 0) {
      console.log('Insertando tipos...');
      const insertedTypes = await Type.insertMany(types);
      console.log(`${insertedTypes.length} tipos insertados exitosamente`);
    } else {
      console.log(`Ya existen ${typesCount} tipos en la base de datos`);
    }

    // Insertar subjects
    const subjectsCount = await Subject.countDocuments();
    if (subjectsCount === 0) {
      console.log('Insertando subjects...');
      const insertedSubjects = await Subject.insertMany(subjects);
      console.log(`${insertedSubjects.length} subjects insertados exitosamente`);
    } else {
      console.log(`Ya existen ${subjectsCount} subjects en la base de datos`);
    }

    console.log('Proceso de inicialización completado exitosamente');

  } catch (error) {
    console.error('Error durante la inicialización:', error);
    throw error;
  } finally {
    if (connection) {
      try {
        await mongoose.disconnect();
        console.log('Conexión a MongoDB cerrada');
      } catch (error) {
        console.error('Error al cerrar la conexión:', error);
      }
    }
    process.exit(0);
  }
}

// Ejecutar la inicialización
initializeDatabase().catch(error => {
  console.error('Error fatal:', error);
  process.exit(1);
});