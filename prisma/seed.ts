import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter } as Parameters<typeof PrismaClient>[0]);

async function main() {
  const keys = [
    process.env.AUTH_SECRET,
    process.env.AUTH_SECRET_SECOND,
    // Add more keys here for additional users, e.g.: "another-secret-key"
  ].filter(Boolean) as string[];

  for (const key of keys) {
    const user = await prisma.user.upsert({
      where: { key },
      update: {},
      create: { key },
    });
    console.log(`User ready: ${user.id}`);
  }

  // Assign any existing (unowned) applications to the first user
  const firstUser = await prisma.user.findFirst({ orderBy: { createdAt: "asc" } });
  if (firstUser) {
    const updated = await prisma.application.updateMany({
      where: { userId: null },
      data: { userId: firstUser.id },
    });
    if (updated.count > 0) {
      console.log(`Assigned ${updated.count} existing application(s) to user ${firstUser.id}`);
    }
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
