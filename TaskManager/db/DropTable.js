import { SQLite } from 'expo';

// Create the database 
const db = SQLite.openDatabase('db.db');

// Drop tables
const dropTables = () => {
    db.transaction(tx => {
        tx.executeSql('DROP TABLE IF EXISTS employee;');
        tx.executeSql('DROP TABLE IF EXISTS task;');
        tx.executeSql('DROP TABLE IF EXISTS project;');
        tx.executeSql('DROP TABLE IF EXISTS project_team;');
        tx.executeSql('DROP TABLE IF EXISTS client;');
        tx.executeSql('DROP TABLE IF EXISTS job;');
    }, errorDB, successDB);
}

// Transaction error callback
function errorDB(error) {
    console.log("Error processing DropTable: " + error);
    //alert("Error processing SQL: " + error)
}
// Transaction success callback
function successDB() {
    console.log("DropTable success!");
    //alert("SQL success!")
}

export { dropTables };