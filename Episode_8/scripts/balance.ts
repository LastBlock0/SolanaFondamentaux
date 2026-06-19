import { address, lamports } from "@solana/kit";
import { rpc } from "./lib/rpc.ts";
import { LAMPORT_PER_SOL } from "./lib/solana.ts";

export async function getBalance(publicKey: string) {
  const addr = address(publicKey);
  const getBalanceResult = await rpc.getBalance(addr).send();
  console.log({
    address: addr,
    lamports: getBalanceResult.value,
    sol: Number(getBalanceResult.value) / LAMPORT_PER_SOL,
  });
}

await getBalance("HTUdqPgsN1d6GmpriHh1JPqxXUMADTP87vaQEUSpWKAG");
