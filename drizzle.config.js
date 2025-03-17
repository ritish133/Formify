import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./configs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_N2JyRSMezU8b@ep-white-cloud-a5oyk0e8-pooler.us-east-2.aws.neon.tech/AI-Form-Builder?sslmode=require',
  }
});