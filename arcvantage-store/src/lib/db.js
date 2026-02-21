import { Pool } from "pg";
import fs from "fs";
import path from "path";

const globalForPg = globalThis;

const sslCert = fs.readFileSync(
  path.join(process.cwd(), "certs", "ca-certificate.crt")
).toString();

export const pool =
  globalForPg.pool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      ca: sslCert,
      rejectUnauthorized: true,
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPg.pool = pool;
}