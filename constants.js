import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'https://www.cotodigital3.com.ar/sitios/cdigi/browse';
const SESSION_COOKIE = process.env.SESSION_COOKIE;
const SUCURSAL_ID = process.env.SUCURSAL_ID;

export { BASE_URL, SESSION_COOKIE, SUCURSAL_ID };
