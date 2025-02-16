import express from "express";
import taskRoutes from "./routes/taskRoutes";
import { AppDataSource } from "./database";
import { seedDatabase } from "./seeder";

const app = express();
app.use(express.json());

// Initialize database first, then start the server
AppDataSource.initialize()
  .then(async () => {
    console.log(" Database connected");
    
    await seedDatabase();
    //  Register routes after DB is ready
    app.use("/api/tasks", taskRoutes);

    // Start the server only after DB is ready
    app.listen(3000, () => console.log(" Server running on port 3000"));
  })
  .catch((err) => {
    console.error(" Database connection error:", err);
    process.exit(1); // Exit the process if the database fails to connect
  });
  export default app;
