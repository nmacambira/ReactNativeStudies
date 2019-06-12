import { SQLite } from 'expo';

// Create the database 
const db = SQLite.openDatabase('db.db');

// Insert Project
function insertProject(data, isSynchronized, isEdited) {
    return new Promise(function (resolve, reject) {
        db.transaction(tx => {
            //console.log(data);
            for (i = 0; i < data.length; i++) {
                let id_local = data[i].id_local;
                let id = data[i].id;
                let status = data[i].status;
                let title = data[i].title;
                let detail = data[i].detail;
                let file = data[i].file;
                let client_id = data[i].client_id;
                let department_id = data[i].department_id;
                let start_date = data[i].start_date;
                let end_date = data[i].end_date;
                let created_at = data[i].created_at;
                let start_date = data[i].start_date;
                tx.executeSql("INSERT OR REPLACE INTO project (id_local, id, status, title, detail, file, client_id, department_id, start_date, end_date, created_at, is_synchronized, is_edited) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id_local, id, status, title, detail, file, client_id, department_id, start_date, end_date, created_at, isSynchronized, isEdited]);
            }
            tx.executeSql('SELECT * FROM project', [], (_, { rows }) => {
                //console.log("Projects: ", JSON.stringify(rows))
                resolve(rows._array);
            });
        }, errorDB, successDB);
    });
}

// Transaction error callback
function errorDB(error) {
    console.log("Error processing InsertProject: " + error);
    //alert("Error processing SQL: " + error)
}
// Transaction success callback
function successDB() {
    console.log("InsertProject success!");
    //alert("SQL success!")
}

export { insertProject };