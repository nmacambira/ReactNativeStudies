import { SQLite } from 'expo';

// Create the database 
const db = SQLite.openDatabase('db.db');

function selectAllWithConditionFromDB(table_name, condition) {
    return new Promise(function (resolve, reject) {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM ' + table_name + ' WHERE ' + condition, [], (_, { rows }) => {
                const data = rows;
                resolve(data._array);
            });
        }, errorDB, successDB);
    });
}

// Transaction error callback
function errorDB(error) {
    console.log("Error processing SelectAllWithConditionFromDB: " + error);
}
// Transaction success callback
function successDB() {
    console.log("SelectAllWithConditionFromDB success!");
}

export { selectAllWithConditionFromDB };