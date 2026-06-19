import bs58 from "bs58";
import "dotenv/config";

const bytes = Uint8Array.from(JSON.parse(process.env.UINT_8_ARRAY));
const address = bs58.encode(bytes);
console.log(address);
