import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUND,
  jwt_access_token: process.env.JWT_ACCESS_TOKEN,
  jwt_access_token_expires: process.env.JWT_ACCESS_TOKEN_EXPIRES,
  jwt_refresh_token: process.env.JWT_REFRESH_TOKEN,
  jwt_refresh_token_expires: process.env.JWT_REFRESH_TOKEN_EXPIRES,
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
};
