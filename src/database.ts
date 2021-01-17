import { createPool } from 'mysql2/promise'



export async function connect() {

    // const connection = createPool({
    //     host: 'localhost',
    //     user: 'root',
    //     password: '',
    //     // database: 'node_mysql_ts',
    //     database: 'webpcoriente',
    //     connectionLimit: 10
    // })

    const connection = createPool({
        host: 'mysql.pcoriente.com.mx',
        user: 'useroriente',
        password: 'Oriente65',
        // database: 'node_mysql_ts',
        database: 'webpcoriente',
        connectionLimit: 10
    })

    return connection
}