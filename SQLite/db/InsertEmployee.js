import { SQLite } from 'expo';

// Create the database 
const db = SQLite.openDatabase('db.db');

// Insert Employee
function insertEmployee(data, isSynchronized) {
    return new Promise(function (resolve, reject) {
        db.transaction(tx => {
            //console.log(data);
            for (i = 0; i < data.length; i++) {
                let id_local = data[i].id_local;
                let id = data[i].id;
                let email = data[i].email;
                let first_name = data[i].first_name;
                let last_name = data[i].last_name;
                let phone_number = data[i].phone_number;
                let profile_photo = data[i].profile_photo;
                let category = data[i].category;
                let department_title = data[i].department_title;
                let manager_id = data[i].manager_id;
                let job_title = data[i].job_title;
                let job_id = data[i].job_id;
                tx.executeSql("INSERT OR REPLACE INTO employee (id_local, id, email, first_name, last_name, phone_number, profile_photo, category, department_title, manager_id, job_title, job_id, is_synchronized) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id_local, id, email, first_name, last_name, phone_number, profile_photo, category, department_title, manager_id, job_title, job_id, isSynchronized]);
            }
            tx.executeSql('SELECT * FROM employee', [], (_, { rows }) => {
                //console.log("Employees: ", JSON.stringify(rows))
                resolve(rows._array);
            });
        }, errorDB, successDB);
    });
}

// Transaction error callback
function errorDB(error) {
    console.log("Error processing InsertEmployee: " + error);
    //alert("Error processing SQL: " + error)
}
// Transaction success callback
function successDB() {
    console.log("InsertEmployee success!");
    //alert("SQL success!")
}

export { insertEmployee };