import { SQLite } from 'expo';

// Create the database 
const db = SQLite.openDatabase('db.db');

// Insert Task
function insertTask(data, isSync, isEdited) {
    return new Promise(function (resolve, reject) {
        db.transaction(tx => {
            //console.log(data);
            for (i = 0; i < data.length; i++) {
                let id_local = data[i].id_local;
                let id = data[i].id;
                let project_id = data[i].project;
                let project_id_local = data[i].project_local;
                let employee_id = data[i].employee;
                let title = data[i].title;
                let detail = data[i].detail;
                let due_date = data[i].due_date;
                let working_hours = data[i].working_hours;
                let file = data[i].file;
                let priority = data[i].priority;
                let status = data[i].status;
                let created_at = data[i].created_at;
                let isSynchronized = isSync;
                tx.executeSql("INSERT OR REPLACE INTO task (id_local, id, project_id, project_id_local, employee_id, title, detail, due_date, working_hours, file, priority, status, created_at, is_synchronized, is_edited) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id_local, id, project_id, project_id_local, employee_id, title, detail, due_date, working_hours, file, priority, status, created_at, isSynchronized, isEdited]);
            }
            tx.executeSql('SELECT * FROM task', [], (_, { rows }) => {
                //console.log("Tasks: ", JSON.stringify(rows))
                resolve(rows._array);
            });
        }, errorDB, successDB);
    });
}

// Transaction error callback
function errorDB(error) {
    console.log("Error processing InsertTask: " + error);
    //alert("Error processing SQL: " + error)
}
// Transaction success callback
function successDB() {
    console.log("InsertTask success!");
    //alert("SQL success!")
}

export { insertTask };