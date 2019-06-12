import { SQLite } from 'expo';

// Create the database 
const db = SQLite.openDatabase('db.db');

function selectAllFromTable(table_name) {
    return new Promise(function (resolve, reject) {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM ' + table_name, [], (_, { rows }) => {
                //console.log(JSON.stringify(rows));
                //console.log(rows);
                //const data = JSON.parse(JSON.stringify(rows));               
                const data = rows;
                resolve(data._array);
            });
        }, errorDB, successDB);
    });
}

// Transaction error callback
function errorDB(error) {
    console.log("Error processing selectAllFromTable: " + error);
    //alert("Error processing SQL: " + error)
}
// Transaction success callback
function successDB() {
    console.log("selectAllFromTable success!");
    //alert("SQL success!")
}

export { selectAllFromTable };