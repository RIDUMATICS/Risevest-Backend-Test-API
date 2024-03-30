import app from "./app";
import config from "./config";
import connectDB from "./database/connection";
import { log } from "./util";

const PORT = config.PORT;

(async () => {
  try {
    // Create connection with DB
    await connectDB.initialize();
    log.info(`Data Source has been initialized`);
  } catch (err) {
    log.error(`Data Source initialization error: ${err}`);
  }

  try {
    app.listen(PORT, () => {
      log.info(`Server started on port ${PORT}`);
    });
  } catch (err) {
    log.error(`Unable to start server: ${err}`);
    process.exit(1);
  }
})();
