// index.js
import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "./config/passport.js"
import { createServer } from "http";
import connectDb from "./config/connectDb.js";
import router from "./routes/router.js";
import startSocket from "./config/socket.js";
import cors from "cors";

dotenv.config();

const PORT = 3000;  
const HOST = '0.0.0.0'; 

const app = express();

// Configurar CORS antes de inicializar Socket.IO
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"], 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const httpServer = createServer(app);

// Configurar el servidor HTTP para permitir WebSocket
httpServer.on('upgrade', (request, socket, head) => {
    const origin = request.headers.origin;
    if (origin === 'http://localhost:5173' || origin === 'http://127.0.0.1:5173') {
        socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
                    'Upgrade: WebSocket\r\n' +
                    'Connection: Upgrade\r\n' +
                    '\r\n');
        socket.pipe(socket);
    } else {
        socket.destroy();
    }
});

// Inicializar Socket.IO con opciones específicas
const { io, emitToUser } = startSocket(httpServer);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static('database/archives'));

// Routes
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // Cambiar a true en producción con HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    }
}));

app.use(passport.initialize());

app.use("", router);



// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        message: 'Something broke!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Start server
async function startServer() {
    try {
        await connectDb();
        console.log('Connected to database successfully');

        httpServer.listen(PORT, HOST, () => {
            console.log(`Server running on http://${HOST}:${PORT}`);
            console.log(`Socket.IO server is ready for connections`);
            console.log('Environment:', {
                NODE_ENV: process.env.NODE_ENV || 'development',
                MONGO_HOST: process.env.MONGO_HOST,
                MONGO_DATABASE: process.env.MONGO_DATABASE
            });
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    httpServer.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully');
    httpServer.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

startServer();