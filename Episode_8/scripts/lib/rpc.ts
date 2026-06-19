import {
  createSolanaRpc,
  createSolanaRpcSubscriptions,
  sendAndConfirmTransactionFactory,
} from "@solana/kit";
import "dotenv/config";

// Connection HTTP

const RPC_URL_HTTP = process.env.DEVNET_RPC_HTTPS;
if (!RPC_URL_HTTP) {
  throw new Error("RPC_URL_HTTP is undefined");
}
export const rpc = createSolanaRpc(RPC_URL_HTTP);

// Connection Websocket

const RPC_URL_WS = process.env.DEVNET_RPC_WS;
if (!RPC_URL_WS) {
  throw new Error("RPC_URL_WS is undefined");
}
export const rpcSubscriptions = createSolanaRpcSubscriptions(RPC_URL_WS);

export const sendAndConfirmTransaction = sendAndConfirmTransactionFactory({
  rpc,
  rpcSubscriptions,
});
