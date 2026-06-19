import {
  address,
  appendTransactionMessageInstruction,
  assertIsTransactionWithBlockhashLifetime,
  createTransactionMessage,
  getSignatureFromTransaction,
  lamports,
  pipe,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  signTransactionMessageWithSigners,
} from "@solana/kit";
import { loadSigner } from "./lib/wallets.ts";
import { LAMPORT_PER_SOL } from "./lib/solana.ts";
import { rpc, sendAndConfirmTransaction } from "./lib/rpc.ts";
import { getTransferSolInstruction } from "@solana-program/system";

export async function sendSol(
  senderPath: string,
  recipientPublicKey: string,
  amountSol: number,
) {
  const sender = await loadSigner(senderPath);
  const recipient = address(recipientPublicKey);
  const amountLamport = BigInt(Math.round(amountSol * LAMPORT_PER_SOL));

  const getLatestBlockhashResult = await rpc.getLatestBlockhash().send();

  const transferInstruction = getTransferSolInstruction({
    source: sender,
    destination: recipient,
    amount: lamports(amountLamport),
  });

  const message = pipe(
    createTransactionMessage({ version: 0 }),
    (tx) => setTransactionMessageFeePayerSigner(sender, tx),
    (tx) =>
      setTransactionMessageLifetimeUsingBlockhash(
        getLatestBlockhashResult.value,
        tx,
      ),
    (tx) => appendTransactionMessageInstruction(transferInstruction, tx),
  );

  const signedTransaction = await signTransactionMessageWithSigners(message);
  assertIsTransactionWithBlockhashLifetime(signedTransaction);

  await sendAndConfirmTransaction(signedTransaction, {
    commitment: "confirmed",
  });

  console.log("Transaction terminée");
  console.log("Signature : " + getSignatureFromTransaction(signedTransaction));
}

try {
  console.time("SendSol");
  await sendSol(
    "wallets/wallet1.json",
    "6GEGL2ghhhPu5Kic1hEPfDjpEdHmFYEyrK9u7Xbpogeh",
    0.1,
  );
  console.timeEnd("SendSol");
} catch (e) {
  throw new Error("Erreur: " + e);
}
