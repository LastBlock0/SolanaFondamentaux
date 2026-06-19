import {
  createKeyPairSignerFromBytes,
  createSolanaRpc,
  createSolanaRpcSubscriptions,
  sendAndConfirmTransactionFactory,
} from "@solana/kit";
import { readFile } from "node:fs/promises";

// Charger clé privée à partir du fichier wallet.json

export async function loadSigner(path: string) {
  const file = await readFile(path, "utf-8");
  const bytes = new Uint8Array(JSON.parse(file));
  return createKeyPairSignerFromBytes(bytes);
}

// Connection RPC --> HTTP

const RPC_URL = process.env.RPC_URL;

if (!RPC_URL) {
  throw new Error("RPC_URL non défini dans .env");
}

export const rpc = createSolanaRpc(RPC_URL);

// Connection WS

const WS_URL = process.env.WS_URL;

if (!WS_URL) {
  throw new Error("WS_URL non défini dans .env");
}

export const rpcSubscriptions = createSolanaRpcSubscriptions(WS_URL);

// Obtenir dernier blockhash pour créer messages

export async function getLatestBlockhash() {
  const result = await rpc.getLatestBlockhash().send();
  return result.value;
}

// Créer fonction pour envoie de transaction et attente de la confirmation

export const sendAndConfirmTransaction = sendAndConfirmTransactionFactory({
  rpc,
  rpcSubscriptions,
});
