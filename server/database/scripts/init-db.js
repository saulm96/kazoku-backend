import mongoose from 'mongoose';
import Category from '../../src/models/categoryModel.js';

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_DATABASE
} = process.env;

const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:27017/${MONGO_DATABASE}?authSource=admin`;

mongoose.connect(MONGO_URL)
.then(async () => {
  console.log('Conectado a MongoDB CodeOrbit');

  try {
    const count = await Category.countDocuments();
    if (count === 0) {
      console.log('Base de datos vacía. Insertando categorías por defecto...');
      
      const categories = [
        { 
          name: "Desarrollo Web",
          description: "Tecnologías y frameworks para desarrollo web moderno",
          status: "active",
          types: ["Frontend", "Backend", "FullStack"],
          styles: ["Moderno", "Responsive", "Interactivo"],
          subjects: ["React", "Node.js", "MongoDB"]
        },
        {
          name: "Programación",
          description: "Fundamentos y conceptos avanzados de programación",
          status: "active",
          types: ["POO", "Funcional", "Estructurada"],
          styles: ["Práctico", "Teórico", "Proyecto"],
          subjects: ["JavaScript", "Python", "Java"]
        },
        {
          name: "Bases de Datos",
          description: "Gestión y diseño de bases de datos",
          status: "active",
          types: ["Relacional", "NoSQL", "GraphQL"],
          styles: ["Teórico", "Práctico", "Proyecto"],
          subjects: ["MySQL", "MongoDB", "PostgreSQL"]
        },
        {
          name: "DevOps",
          description: "Prácticas de desarrollo y operaciones",
          status: "active",
          types: ["CI/CD", "Cloud", "Contenedores"],
          styles: ["Técnico", "Práctico", "Colaborativo"],
          subjects: ["Docker", "AWS", "Jenkins"]
        },
        {
          name: "Seguridad",
          description: "Seguridad en aplicaciones y redes",
          status: "active",
          types: ["Web", "Red", "Aplicación"],
          styles: ["Técnico", "Práctico", "Investigación"],
          subjects: ["OAuth", "HTTPS", "Firewall"]
        },
        {
          name: "Mobile Development",
          description: "Desarrollo de aplicaciones móviles",
          status: "active",
          types: ["Android", "iOS", "Cross-platform"],
          styles: ["Práctico", "UI/UX", "Nativo"],
          subjects: ["React Native", "Flutter", "Swift"]
        },
        {
          name: "UI/UX Design",
          description: "Diseño de interfaces y experiencia de usuario",
          status: "active",
          types: ["UI", "UX", "Prototyping"],
          styles: ["Creativo", "User-Centered", "Minimalista"],
          subjects: ["Figma", "Adobe XD", "Sketch"]
        },
        {
          name: "Data Science",
          description: "Análisis y ciencia de datos",
          status: "active",
          types: ["Analytics", "Machine Learning", "Visualization"],
          styles: ["Analítico", "Investigación", "Práctico"],
          subjects: ["Python", "R", "Tableau"]
        },
        {
          name: "Cloud Computing",
          description: "Servicios y soluciones en la nube",
          status: "active",
          types: ["IaaS", "PaaS", "SaaS"],
          styles: ["Técnico", "Práctico", "Arquitectura"],
          subjects: ["AWS", "Azure", "GCP"]
        },
        {
          name: "Soft Skills",
          description: "Habilidades blandas para profesionales",
          status: "active",
          types: ["Comunicación", "Liderazgo", "Trabajo en Equipo"],
          styles: ["Interactivo", "Práctico", "Reflexivo"],
          subjects: ["Gestión", "Comunicación", "Liderazgo"]
        }
      ];

      await Category.insertMany(categories);
      console.log('Categorías insertadas exitosamente');
      
      // Verificar la inserción
      const insertedCount = await Category.countDocuments();
      console.log(`Total de categorías en la base de datos: ${insertedCount}`);
      
      // Mostrar nombres de las categorías insertadas
      const categoryNames = await Category.find({}, 'name');
      console.log('Categorías insertadas:', categoryNames.map(cat => cat.name).join(', '));
    } else {
      console.log('La base de datos ya contiene categorías.');
      
      // Mostrar categorías existentes
      const existingCategories = await Category.find({}, 'name');
      console.log('Categorías existentes:', existingCategories.map(cat => cat.name).join(', '));
    }

    console.log('Proceso de inicialización completado.');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error durante la inicialización:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
})
.catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
  process.exit(1);
});