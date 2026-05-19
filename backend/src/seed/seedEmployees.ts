import { PrismaClient } from "@prisma/client";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createSeedEmployees, readNamesFromFile } from "./seedData.js";

const prisma = new PrismaClient();

const totalEmployees = Number(process.env.SEED_EMPLOYEE_COUNT ?? 10000);
const batchSize = Number(process.env.SEED_BATCH_SIZE ?? 1000);

async function main() {
  const seedFolder = dirname(fileURLToPath(import.meta.url));
  const firstNamesPath = join(seedFolder, "first_names.txt");
  const lastNamesPath = join(seedFolder, "last_names.txt");

  const firstNames = await readNamesFromFile(firstNamesPath);
  const lastNames = await readNamesFromFile(lastNamesPath);

  await prisma.employee.deleteMany();

  for (let start = 1; start <= totalEmployees; start += batchSize) {
    const remainingEmployees = totalEmployees - start + 1;
    const currentBatchSize = Math.min(batchSize, remainingEmployees);
    const employees = createSeedEmployees(firstNames, lastNames, currentBatchSize, start);

    await prisma.employee.createMany({ data: employees });
    console.log(`Seeded ${start + currentBatchSize - 1}/${totalEmployees} employees`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
