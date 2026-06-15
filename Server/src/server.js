import createApp from "./app.js";
import env from "./config/env.js";
import logger from "./config/logger.js";
import connectDB from "./database/mongodb.js";
import seedSuperAdmin from "./seed/seedSuperAdmin.js";

const app = createApp();

async function startServer() {
  try {
    await connectDB();
    // Create SUPER_ADMIN if not exists
    await seedSuperAdmin();

    app.listen(env.PORT, () => {
      logger.info({ port: env.PORT }, "server running");
    });
  }catch (err) {
    logger.error({ message: err.message, stack: err.stack,},"error while running server"
  );
}
}

startServer();