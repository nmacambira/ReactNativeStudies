import { SQLite } from 'expo';

// Create the database 
const db = SQLite.openDatabase('db.db');

// Insert clients
const insertClient = (data) => {
    db.transaction(tx => {
        //console.log(data);
        tx.executeSql('DELETE FROM client', [], () =>
            console.log("DeleteClients success!")
        );
        for (i = 0; i < data.length; i++) {
            let id = data[i].id;
            let name = data[i].name;
            let email = data[i].email;
            tx.executeSql("INSERT OR REPLACE INTO client (id, name, email) VALUES(?, ?, ?)", [id, name, email]);
        }
        tx.executeSql('SELECT * FROM client', [], (_, { rows }) =>
            console.log(JSON.stringify(rows))
        );
    }, errorDB, successDB);
}

// Transaction error callback
function errorDB(error) {
    console.log("Error processing InsertClients: " + error);
    //alert("Error processing SQL: " + error)
}
// Transaction success callback
function successDB() {
    console.log("InsertClients success!");
    //alert("SQL success!")
}

export { insertClient };