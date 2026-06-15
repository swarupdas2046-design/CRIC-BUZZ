import createApp from "./app.js";
import env from "./config/env.js";
import logger from "./config/logger.js";
import connectDB from "./database/mongodb.js";
import seedSuperAdmin from "./seed/seedSuperAdmin.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { setSocket } from "./shared/utils/socket.js";

const app = createApp();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: env.CORS_ORIGIN.split(",").map((origin) => origin.trim()),
    credentials: true,
  },
});

setSocket(io);

async function startServer() {
  try {
    await connectDB();
    // Create SUPER_ADMIN if not exists
    await seedSuperAdmin();

    httpServer.listen(env.PORT, () => {
      logger.info({ port: env.PORT }, "server running");
    });
  }catch (err) {
    logger.error({ message: err.message, stack: err.stack,},"error while running server"
  );
}
}

startServer();
