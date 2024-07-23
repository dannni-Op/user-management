import { DataSource } from "typeorm";

export const Database = {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DBHOST,
        port: Number(process.env.DBPORT),
        username: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME,
        entities: [
            'dist/**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
}
