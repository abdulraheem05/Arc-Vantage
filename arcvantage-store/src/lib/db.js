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
    // ADD THESE THREE LINES:
    max: 10, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
    connectionTimeoutMillis: 2000, // How long to wait for a connection slot to become available
  });

if (process.env.NODE_ENV !== "production") {
  globalForPg.pool = pool;
}