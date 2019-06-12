import { SQLite, FileSystem } from 'expo';

// Create the database 
const db = SQLite.openDatabase('db.db');

// Create tables
const createTables = () => {
    db.transaction(tx => {
        tx.executeSql(createEmployee);
        tx.executeSql(createTask);
        tx.executeSql(createProject);
        tx.executeSql(createProjectTeam);
        tx.executeSql(createClient);
        tx.executeSql(createJob);
    }, errorDB, successDB);

    showSQLiteLocation();
}

const createEmployee = `CREATE TABLE IF NOT EXISTS employee (
    id_local integer PRIMARY KEY NOT NULL, 
    id integer,
    email text,        
    first_name text,
    last_name text,
    phone_number text, 
    profile_photo text,        
    category text,         
    department_title integer,
    manager_id integer,
    job_title text,
    job_id integer,  
    is_synchronized integer DEFAULT 0,
    FOREIGN KEY(manager_id) REFERENCES employee(id) ON DELETE CASCADE ON UPDATE NO ACTION,
    FOREIGN KEY(job_id) REFERENCES job(id) ON DELETE CASCADE ON UPDATE NO ACTION
);`

const createTask = `CREATE TABLE IF NOT EXISTS task (
        id_local integer PRIMARY KEY NOT NULL, 
        id integer,
        project_id integer,
        project_id_local integer,
        employee_id integer,        
        title text,
        detail text,
        due_date text, 
        working_hours real,        
        file text,         
        priority integer,
        status text,
        created_at text,  
        is_synchronized integer DEFAULT 0,
        is_edited integer DEFAULT 0,
        FOREIGN KEY(project_id) REFERENCES project(id) ON DELETE CASCADE ON UPDATE NO ACTION,
        FOREIGN KEY(employee_id) REFERENCES employee(id) ON DELETE CASCADE ON UPDATE NO ACTION
    );`

const createProject = `CREATE TABLE IF NOT EXISTS project (
        id_local integer PRIMARY KEY NOT NULL, 
        id integer,
        status text,
        title text,
        detail text,
        file text,
        client_id integer,
        department_id integer,       
        start_date text,        
        end_date text,
        created_at text, 
        is_synchronized integer DEFAULT 0,
        is_edited integer DEFAULT 0,
        FOREIGN KEY(client_id) REFERENCES client(id) ON DELETE CASCADE ON UPDATE NO ACTION
    );`

const createProjectTeam = `CREATE TABLE IF NOT EXISTS project_team (
    id integer PRIMARY KEY NOT NULL, 
    project_id integer,
    employee_id integer,
    FOREIGN KEY(project_id) REFERENCES project(id),
    FOREIGN KEY(employee_id) REFERENCES employee(id),
);`

const createClient = `CREATE TABLE IF NOT EXISTS client (
        id integer PRIMARY KEY NOT NULL, 
        name text,         
        email text
    );`

const createJob = `CREATE TABLE IF NOT EXISTS job (
        id integer PRIMARY KEY NOT NULL, 
        title text
    );`

// Transaction error callback
function errorDB(error) {
    console.log("Error processing CreateTable: " + error);
    //alert("Error processing SQL: " + error)
}
// Transaction success callback
function successDB() {
    console.log("CreateTable success!");
    //alert("SQL success!")
}

function showSQLiteLocation() {
    FileSystem.getInfoAsync('SQLite/db.db')
        .then(({ uri }) => {
            console.log('SQLite location: ', uri);
        })
        .catch(error => {
            console.error(error);
        });
}

export { createTables };