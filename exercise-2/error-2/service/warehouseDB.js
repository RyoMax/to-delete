import { v4 as uuid } from "uuid";


const WAREHOUSES = [
    {
        id: 1,
        name: 'WH-DU',
        city: 'Duisburg',
        capacity: 130,
        goods: [
            {
                id: 12,
                title: 'Super TV 3000',
                manufacturer: 'Super',
                yearOfProduction: 2009,
                price: 3000,
                capacityUsage: 12,
                stock: 2
            },
            {
                id: 33,
                title: 'Mega Fridge 1024',
                manufacturer: 'Mega',
                yearOfProduction: 1994,
                price: 500,
                capacityUsage: 20,
                stock: 1
            },
            {
                id: 1,
                title: 'Cozy Hairbrush',
                manufacturer: 'Cozy',
                yearOfProduction: 2011,
                price: 12,
                capacityUsage: 2,
                stock: 40
            }
        ]
    },
    {
        id: 2,
        name: 'WH-M',
        city: 'Munich',
        capacity: 400,
        goods: [
            {
                id: 77,
                title: 'Contactless Toothbrush',
                manufacturer: 'Stressless',
                yearOfProduction: 2055,
                price: 5000,
                capacityUsage: 5,
                stock: 10
            },
            {
                id: 46,
                title: 'Smart-Looking Glasses',
                manufacturer: 'FakeIT',
                yearOfProduction: 2018,
                price: 3500,
                capacityUsage: 6,
                stock: 12
            },
            {
                id: 11,
                title: 'Prefilled Notebook',
                manufacturer: 'Stressless',
                yearOfProduction: 2019,
                price: 20,
                capacityUsage: 4,
                stock: 50
            }
        ]
    },
    {
        id: 3,
        name: 'WH-F',
        city: 'Frankfurt Main',
        capacity: 100,
        goods: [
            {
                id: 19,
                title: 'Best Smartphone Ever',
                manufacturer: 'Best',
                yearOfProduction: 2999,
                price: 9999,
                capacityUsage: 5,
                stock: 1
            },
            {
                id: 17,
                title: 'Super Computer 4000',
                manufacturer: 'Super',
                yearOfProduction: 2022,
                price: 5555,
                capacityUsage: 35,
                stock: 2
            },
            {
                id: 78,
                title: 'Self-heating coffee mug',
                manufacturer: 'Mega',
                yearOfProduction: 2016,
                price: 50,
                capacityUsage: 3,
                stock: 5
            }
        ]
    },
    {
        id: 4,
        name: 'WH-HH',
        city: 'Hamburg',
        capacity: 1000,
        goods: [
            
        ]
    }
];

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



// In dieser Datei k??nnte der Datensatz mit allen entsprechenden Hilfsfunktionen hinterlegt werden.

// DB Funktion zum Holen aller Warenhauseintraege in reduzierter Form
export function getAllWarehouses() {
    // Erstelle neues Array der Warenhaeuser 
    // bei dem die Waren durch die Anzahl der Waren ersetzt sind
    let warehousesCopy = WAREHOUSES.map(warehouse => {
        warehouse.goods = warehouse.goods.length;
        return warehouses;
    });
    //console.log(warehousesCopy)
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
