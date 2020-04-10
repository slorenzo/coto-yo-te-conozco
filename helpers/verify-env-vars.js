import dotenv from 'dotenv';

dotenv.config();

const requiredEnv = ['SESSION_COOKIE', 'SUCURSAL_ID'];

const isSomeEnvEmpty =
  requiredEnv.filter(env => !(typeof process.env[env] !== 'undefined'))
    .length > 0;

if (isSomeEnvEmpty) {
  console.error('You should fill the environment variables');
  process.exit(1);
}
