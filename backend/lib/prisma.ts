import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const connectionString = `postgresql://neondb_owner:npg_hL5qmYZjH7Px@ep-floral-truth-avgs4rju-pooler.c-11.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };