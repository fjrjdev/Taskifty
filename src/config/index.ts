import dotenv from "dotenv";
dotenv.config();

export default {
  jwtSecret: process.env.JWT_SECRET!,
  jwtExpirationTime: process.env.JWT_EXPIRATION_TIME!,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!,
  refreshTokenExpirationTime: process.env.REFRESH_TOKEN_EXPIRATION_TIME!,
  databaseURL: process.env.DATABASE_URL!
};
