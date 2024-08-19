import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/user";
import { todo } from "./entity/todo";

const AppDataSource = new DataSource({
  type: "postgres",
  //host: "localhost",
  host: "aws-0-eu-central-1.pooler.supabase.com",
  port: 5432,
  //username: process.env.db_username || "postgres",
  username: 'postgres.stadtgfuumeeqtkhzfzk',
  //password: process.env.db_password || "root",
  password: "8nB_Ys7U6KEbjdz",
  
 // database: process.env.db_database || "todo",
  database:  'postgres',
  synchronize: true,
  logging: false,
  entities: [User, todo],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(async () => {
    "connected";
  })
  .catch((error: any) => console.log(error));

export default AppDataSource;
