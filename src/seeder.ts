import "reflect-metadata";
import { AppDataSource } from "./database";
import { Task } from "./entity/Task";

export const seedDatabase = async () => {
  console.log("🌱 Running database seeder...");

  // ✅ Use the existing connection if already initialized
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log("✅ Database connected");
  }

  const taskRepository = AppDataSource.getRepository(Task);

  // Check if database already has data
  const count = await taskRepository.count();
  if (count > 0) {
    console.log("✅ Database already seeded. Skipping...");
    return;
  }

  const tasks = [
    { name: "Complete Node.js API", startDate: "2024-02-10", endDate: "2024-02-12" },
    { name: "Write Swagger Docs", startDate: "2024-02-11", endDate: "2024-02-13" },
    { name: "Fix database issues", startDate: "2024-02-12" },
    { name: "Refactor TypeScript models", startDate: "2024-02-13", endDate: "2024-02-14" },
    { name: "Add authentication" },
  ];

  await taskRepository.insert(tasks);
  console.log("✅ Sample tasks inserted successfully!");
};
