import { SQLite } from 'expo';

// Create the database 
const db = SQLite.openDatabase('db.db');

// Insert Job
const insertJob = (data) => {
    db.transaction(tx => {
        //console.log(data);
        tx.executeSql('DELETE FROM job', [], () =>
            console.log("DeleteJobs success!")
        );
        for (i = 0; i < data.length; i++) {
            let id = data[i].id;
            let title = data[i].title;
            tx.executeSql("INSERT OR REPLACE INTO job (id, title) VALUES(?, ?, ?)", [id, title]);
        }
        tx.executeSql('SELECT * FROM job', [], (_, { rows }) =>
            console.log(JSON.stringify(rows))
        );
    }, errorDB, successDB);
}

// Transaction error callback
function errorDB(error) {
    console.log("Error processing InsertJobs: " + error);
    //alert("Error processing SQL: " + error)
}
// Transaction success callback
function successDB() {
    console.log("InsertJobs success!");
    //alert("SQL success!")
}

export { insertJob };