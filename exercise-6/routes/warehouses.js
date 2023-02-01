import { getAllWarehouses, getWarehouseById, getGoodsByWareHouseId, addNewGoodToWarehouse, deleteGoodFromWarehouseById } from "../service/warehouseDB.js";

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
    let targetWarehouse = getWarehouseById(id);

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

// Routenhandler zum Holen des Warenarrays eines bestimmten Warenhauseintrags per ID
export function getAllGoodsByWarehouseId(req, res) {
    // Extrahiere ID aus URL Parameter
    let id = req.params.id;

    // Speichere Ergebnis der entsprechenden DB Funktion zwischen
    let goods = getGoodsByWareHouseId(id);

    // Pruefe, ob Ergebnis ueberhaupt vorhanden ist
    if (goods === null) {
        // Sende Fehlernachricht mit HTTP Statuscode 404 (NOT FOUND) zurueck
        res.status(404).send({
            error: `Warehouse with ID ${id} not found`
        });

    } else {
        // Sende angefragten Eintrag zurueck
        res.send(goods);
    }
}

// Routenhandler zum Hinzufuegen eines neuen Wareneintrags in ein bestimmtes Warenhaus per ID
export function addNewGoodById(req, res) {
    // Extrahiere ID aus URL Parameter
    let warehouseId = req.params.id;

    // Im Body gelieferte Daten zwischenspeichern
    let newGood = req.body;

    // Lasse Validierung ueber den Body laufen
    let validationResult = validateGoodBody(newGood);

    // Wenn Validierung fehlgeschlagen
    if (validationResult.result === false) {
        // Sende entsprechenden Fehler zurueck
        res.status(400).send({
            errors: validationResult.errors
        });


    } else { // Validierung erfolgreich
        // Speichere Ergebnis der entsprechenden DB Funktion zwischen
        let newEntry = addNewGoodToWarehouse(warehouseId, newGood);

        // Wenn Ergebnis nicht da
        if (newEntry === null) {
            // Sende entsprechende Fehlermeldung zurueck (Warenhaus mit der ID nicht gefunden)
            res.status(404).send({
                error: `Warehouse with ID ${warehouseId} not found`
            });

        } else {
            // Hat geklappt -> Sende neuen Eintrag inkl. ID zurueck
            res.send(newEntry);
        }
    }
}

// Routenhandler zum Loeschen einer bestimmten Ware aus einem bestimmten Warenhaus anhand ihrer IDs
export function deleteGoodById(req, res) {
    // Extrahiere Warenhaus-ID aus URL Parameter
    let warehouseId = req.params.warehouseId;

    // Extrahiere Waren-ID aus URL Parameter
    let goodId = req.params.goodId;

    // Rufe DB Funktion zum Loeschen auf und speichere Ergebnis
    let deletionResult = deleteGoodFromWarehouseById(warehouseId, goodId);
    
    // Pruefe, ob geloescht wurde
    if (!deletionResult.success) {
        // Warenhaus oder Ware nicht gefunden
        res.status(404).send({
            error: deletionResult.error
        });

    } else {
        // Erfolgreich geloescht
        // Gebe geloeschten Eintrag zurueck
        res.send(deletionResult.deletedElem);
    }
}


// ------------------------------ HELPERS ------------------------------
// Hilfsfunktion zum Validieren eines goodBody
function validateGoodBody(goodBody) {
    // Erwartetes Body Schema
    let requiredKeys = {
        title: 'string', 
        manufacturer: 'string',
        yearOfProduction: 'number',
        price: 'number',
        capacityUsage: 'number',
        stock: 'number'
    };

    // Sammelarray fuer moegliche Validierungsfehler
    let errors = [];

    // Indikator ueber Gueltigkeit des Bodys
    let isValid = true;

    // Durchlaufe die Keys des Schemas
    for (const key in requiredKeys) {
        // Pruefe, ob key vorhanden ist und ob richtiger Datentyp
        if (!goodBody.hasOwnProperty(key) || (typeof goodBody[key] !== requiredKeys[key])) {
            // Setze Indikator auf false (Validierung gescheitert)
            isValid = false;

            // Fuege beschreibendes Fehlerobjekt zu Sammelarray hinzu
            errors.push({
                error: `Field ${key} is required and must be of type ${requiredKeys[key]}`
            });
        }
    }

    // Gebe Objekt mit Ergebnis und ggf. Fehlern zurueck
    return {
        result: isValid,
        errors: errors
    };
}