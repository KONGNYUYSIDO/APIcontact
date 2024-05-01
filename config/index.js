import * as dotenv from "dotenv";

dotenv.config();

const { URI, PORT } = process.env;

export { URI, PORT };