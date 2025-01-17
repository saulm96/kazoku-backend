// index.js
import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import connectDb from "./config/connectDb.js";
import router from "./routes/router.js";
import startSocket from "./config/socket.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const httpServer = createServer(app);

// Inicializar Socket.IO
const { io, emitToUser } = startSocket(httpServer);

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use('/database/archives', express.static('database/archives'));

// Routes
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("", router);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
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

        httpServer.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Socket.IO server is ready for connections`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}

// Handle uncaught errors
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    // Close server & exit process
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