import { v4 as uuid } from "uuid";
import {WAREHOUSES} from "../db/db";



// Hilfsfunktion zum Erstellen einer neuen ID
function getNewId() {
    let newId = 1;

    // Durchlaufe alle Warenhaeuser
    WAREHOUSES.forEach(warehouse => {
        // Durchlaufe alle Waren des Warenhauses
        warehouse.goods.forEach(good => {
            // Wenn jeweilige Ware eine hoehere ID als newId hat, setze newId noch einen hoeher
            if (good.id > newId) newId = good.id + 1;
        });
    });

    // Gebe neue ID zurueck
    return newId;
}



// In dieser Datei könnte der Datensatz mit allen entsprechenden Hilfsfunktionen hinterlegt werden.

// DB Funktion zum Holen aller Warenhauseintraege in reduzierter Form
function getAllWarehouses() {
    // Erstelle neues Array der Warenhaeuser 
    // bei dem die Waren durch die Anzahl der Waren ersetzt sind
    let warehousesCopy = WAREHOUSES.map(warehouse => {
        warehouse.goods = warehouse.goods.length;
        return warehouse;
    });

    return warehousesCopy;
}

// DB Funktion zum Holen eines bestimmten Warenhauseintrags per Warenhaus-ID
export function getWarehouseById(id) {
    // Finde den gesuchten Warenhauseintrag per ID Vergleich
    let currWarehouse = WAREHOUSES.find(warehouse => {
        return warehouse.id === parseInt(id);
    });

    return (currWarehouse !== undefined) ? currWarehouse : null;
}

// DB Funktion zum Holen des Warenarrays eines bestimmten Warenhauseintrags per Warenhaus-ID
export function getGoodsByWareHouseId(id) {
    // Finde den gesuchten Warenhauseintrag per ID Vergleich
    let currWarehouse = WAREHOUSES.find(warehouse => {
        return warehouse.id === parseInt(id);
    });

    // Wenn Warenhauseintrag nicht gefunden, gebe null zurueck, sonst das Warenarray des Eintrags
    return (currWarehouse !== undefined) ? currWarehouse.goods : null;
}


export function addNewGoodToWarehouse(warehouseId, newGood) {
    // Finde den gesuchten Warenhauseintrag per ID Vergleich
    let currWarehouse = WAREHOUSES.find(warehouse => {
        return warehouse.id === parseInt(warehouseId);
    });

    // Wenn gesuchtes Warenhaus nicht vorhanden
    if (currWarehouse === undefined) {
        // Gebe null zurueck (Als Hinweis darauf, dass nicht hinzugefuegt werden konnte)
        return null;
    }

    // TODO BONUS pruefe Kapazitaet

    // Fuege dem neuen Eintrag eine ID hinzu
    newGood.id = getNewId();

    // Fuege den Eintrag in das entsprechende Warenhaus hinzu
    currWarehouse.goods.push(newGood);

    // Gebe neuen Eintrag inkl. der neuen ID zurueck
    return newGood;
}

// DB Funktion zum Loeschen einer Ware aus einem bestimmten Warenhaus per IDs
export function deleteGoodFromWarehouseById(warehouseId, goodId) {
    // Finde Warenhaus per ID
    let warehouse = WAREHOUSES.find(wh => {
        return wh.id === parseInt(warehouseId);
    });
    
    // pruefe, wurde warehouse gefunden
    if (!warehouse) { // warehouse === undefined
        // early return, wenn Warenhaus nich gefunden
        return {
            success: false,
            deletedElem: null,
            error: `Warehouse with ID ${warehouseId} not found`
        };
    }

    // Finde im Warenhaus Ware per ID
    let goodIndex = warehouse.goods.findIndex(good => {
        return good.id === parseInt(goodId);
    });

    // pruefe, wurde ware gefunden
    if (goodIndex < 0) {
        // early return, wenn Ware im Warenhaus nich gefunden
        return {
            success: false,
            deletedElem: null,
            error: `Good with ID ${goodId} not found in warehouse with ID ${warehouseId}`
        };
    }

    // Versuche Ware per Index zu loeschen
    let deletedElems = warehouse.goods.splice(goodIndex, 1);

    // Gebe Ergebnisobjekt zurueck
    return {
        success: true,
        deletedElem: deletedElems[0],
        error: null
    };
}