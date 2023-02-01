
import express from 'express';
import cors from 'cors';

// Importiere alle exporten Funktionen aus todos.js
// unter dem Namen 'warehouses'
import {getAll, getById} from './routes/warehouses.js';

// ------------------------------------------------------------
const app = express();
const port = 8080;
// ------------------------------------------------------------

// Einbindung der Middleware zum parsen aller Request Bodies auf ALLE Routen
// parse alle bodies ins JSON format
app.use(express.json());

// Einbindung des CORS Pakets und Angabe der CORS Konfiguration
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Access-Control-Allow-Headers']
}));
// ------------------------------------------------------------

// -------------------- ROUTEN --------------------

// HIER KOMMEN ALLE ROUTEN DEFINITIONEN DER API HIN

// GET Route fuer das Holen aller Warenhaus Eintraege
app.get('/warehouses', getAll);

// GET Route fuer das Holen eines bestimmten Warenhaus Eintrags per uebergebener Warenhaus-ID
app.get('/warehouses/:houseId', getById);


// Routenhandler fuer alle nicht bereits definierten Routen
app.all('*', (req, res) => {
    // Sende HTTP-Status 403 (FORBIDDEN) zurueck
    res.sendStatus(403);
});
// ------------------------------------------------

// starte Server auf port 8080
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
