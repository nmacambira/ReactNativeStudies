import { SQLite } from 'expo';

// Create the database 
const db = SQLite.openDatabase('db.db');

function selectLastIdFromTable(table_name) {
    return new Promise(function (resolve, reject) {
        db.transaction(tx => {
            tx.executeSql('SELECT MAX(id_local) FROM ' + table_name, [], (_, { rows }) => {
                const object = rows._array[0];
                const lastId = Object.values(object)[0];
                console.log('lastId: ', lastId);
                resolve(lastId);
            });
        }, errorDB, successDB);
    });
}

// Transaction error callback
function errorDB(error) {
    console.log("Error processing SelectLastIdFromTable(: " + error);
    //alert("Error processing SQL: " + error)
}
// Transaction success callback
function successDB() {
    console.log("SelectLastIdFromTable( success!");
    //alert("SQL success!")
}

export { selectLastIdFromTable };