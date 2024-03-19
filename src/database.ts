import { Pool } from 'pg';

export const pool = new Pool({
	database: process.env.POSTGRES_DB || 'postgres',
	user: process.env.POSTGRES_USER || 'postgres',
	host: process.env.POSTGRES_HOST || 'localhost',
	port: parseInt(process.env.POSTGRES_PORT || '5432'),
	password: process.env.POSTGRES_PASSWORD || 'localdev',
});
