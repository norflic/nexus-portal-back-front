import {Sequelize} from "sequelize";

export default class ConnectionInstance {
    static connection: Sequelize;

    static getInstance(): Sequelize {

        const PG_USER = process.env.POSTGRES_USER;
        const PG_PASSWORD = process.env.POSTGRES_PASSWORD;
        const PG_DB_NAME = process.env.POSTGRES_DB;
        const PG_HOST = process.env.POSTGRES_HOST || 'database';
        const PG_PORT = 5432;

        if(ConnectionInstance.connection) {
            return ConnectionInstance.connection;
        } else {
            if(!PG_DB_NAME || !PG_USER || !PG_PASSWORD) {
                console.log("[ORM] Some env variables are incorrect or unset. Please check if they all exist according to the .env.example.");
                return new Sequelize(); // unset, won't work
            } else {

                const sequelize = new Sequelize(PG_DB_NAME, PG_USER, PG_PASSWORD, {
                    host: PG_HOST,
                    port: PG_PORT,
                    dialect: 'postgres',
                    logging: false,
                });

                (async () => {
                    try {
                        await sequelize.authenticate();
                        console.log("connection orm -> postgres successful");
                    } catch (error) {
                        console.log(`connection to DB failed\n---\n ${error}`);
                    }
                })();

                ConnectionInstance.connection = sequelize;

                return ConnectionInstance.connection;
            }
        }
    }
}