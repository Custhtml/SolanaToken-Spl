import { 
    Keypair, 
    Connection, 
    LAMPORTS_PER_SOL,
    SystemProgram, 
    Transaction, 
    sendAndConfirmTransaction, 
    PublicKey 
} from "@solana/web3.js";


import wallet from "./test.json";


const connection = new Connection("https://api.devnet.solana.com", "finalized");


const from = Keypair.fromSecretKey(new Uint8Array(wallet));


const to = new PublicKey("GpJStoGBQtiyYrQSqTNhZBkwBtbQL2B4a3qeyb9zSpt3");

(async () => {
    try {
        
        const transferInstruction  = SystemProgram.transfer({
            fromPubkey: from.publicKey,             
            toPubkey: to,                          
            lamports: 0.5 * LAMPORTS_PER_SOL        
        });

        // Creiamo una nuova transazione e aggiungiamo l'istruzione di trasferimento
        const transaction = new Transaction().add(transferInstruction);

        // Definiamo l'account che paga
        transaction.feePayer = from.publicKey;

        // Firmiamo la transazione con la chiave privata del nostro wallet e inviamo la transazione
        const txHash = await sendAndConfirmTransaction(connection, transaction, [from], { commitment: "finalized", skipPreflight: false });

        // Attendiamo la conferma della transazione e poi logghiamao il link alla transazione sull'explorer di Solana
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txHash}?cluster=devnet`);
    } catch (error) {
        console.error(error);
    }
})();