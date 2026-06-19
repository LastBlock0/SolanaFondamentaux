import { createKeyPairSignerFromBytes } from "@solana/kit";
import { readFile } from "node:fs/promises";

export async function loadSigner(path: string) {
  const file = await readFile(path, "utf-8");
  const bytes = new Uint8Array(JSON.parse(file));
  return createKeyPairSignerFromBytes(bytes);
}
