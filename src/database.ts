import { Pool } from 'pg';

export const pool = new Pool({
	database: 'todo_db',
	user: 'todo_user',
	host: 'localhost',
	password: 'localdev',
	port: 5432
});
