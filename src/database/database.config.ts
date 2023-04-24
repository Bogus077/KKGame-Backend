import { Options, Sequelize } from 'sequelize';
import { dbconn } from '../config/config';
export const sequelize = new Sequelize(dbconn as {database: string, username: string, password?: string, options?: Options});

// db sync
// async function syncTable() {
//   await sequelize.sync();
//   console.log('All models were synchronized successfully.');
// }

// syncTable();
