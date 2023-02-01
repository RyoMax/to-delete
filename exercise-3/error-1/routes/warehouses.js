import { getAllWarehouses, getWarehouseById, getFirstFiveWarehouses} from "../service/warehouseDB.js";

// ------------------------------ ROUTE HANDLERS ------------------------------
// Routenhandler zum Holen aller Warenhauseintraege
export function getAll(req, res) {
    // Sende Ergebnis der entsprechenden DB Funktion zurueck
    res.send(getAllWarehouses());
}

// Routenhandler zum Holen eines bestimmten Warenhauseintrags per ID
export function getById(req, res) {
    // Extrahiere ID aus URL Parameter
    let id = req.params.id;

    // Speichere Ergebnis der entsprechenden DB Funktion zwischen
    let targetWarehouse = getWarehouseByIds(id);

    // Pruefe, ob Ergebnis ueberhaupt vorhanden ist
    if (targetWarehouse === null) {
        // Sende Fehlernachricht mit HTTP Statuscode 404 (NOT FOUND) zurueck
        res.status(404).send({
            error: `Warehouse with ID ${id} not found`
        });

    } else {
        // Sende angefragten Eintrag zurueck
        res.send(targetWarehouse);
    }
}

