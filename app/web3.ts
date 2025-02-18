
import {
    Keypair,
    PublicKey,
    sendAndConfirmTransaction,
    SystemProgram,
    Transaction,
    Connection,
    TransactionInstruction,
    TransactionMessage,
    VersionedTransaction,
    ParsedAccountData
} from "@solana/web3.js";
import base58 from "bs58";
import * as spl from "@solana/spl-token";
import dotenv from "dotenv";

dotenv.config();

const SOLANA_RPC = 'https://api.devnet.solana.com';
const SOLANA_CONNECTION = new Connection(SOLANA_RPC);

// Mint owner, Token holder
const walletKeypair = Keypair.fromSecretKey(
    base58.decode(
        process.env.TOKEN_MAIN_PRIVATE_KEY
    )
);

async function getNumberDecimals(mintAddress: string):Promise<number> {
    const info = await SOLANA_CONNECTION.getParsedAccountInfo(new PublicKey(mintAddress));
    const result = (info.value?.data as ParsedAccountData).parsed.info.decimals as number;
    return result;
}

export const sendToken = async (adressTo, amount) => {

    console.log(process.env.TOKEN_MINT_ADDRESS);
    const mint = new PublicKey(process.env.TOKEN_MINT_ADDRESS);
    const toAddress = new PublicKey(adressTo);

    const sourceAccount = await spl.getOrCreateAssociatedTokenAccount(
        SOLANA_CONNECTION, 
        walletKeypair,
        mint,
        walletKeypair.publicKey
    );
    // const dest = spl.getAssociatedTokenAddressSync(mint, toAddress);
    const destAccount = await spl.getOrCreateAssociatedTokenAccount(
        SOLANA_CONNECTION, 
        walletKeypair,
        mint,
        toAddress
    );

    const numberDecimals = await getNumberDecimals(process.env.TOKEN_MINT_ADDRESS);
    
    const transferInstruction = spl.createTransferInstruction(
        sourceAccount.address,
        destAccount.address,
        walletKeypair.publicKey,
        amount * Math.pow(10, numberDecimals)
    );

    const transaction = new Transaction().add(transferInstruction);
    const latestBlockHash = await SOLANA_CONNECTION.getLatestBlockhash('confirmed');
    transaction.recentBlockhash = await latestBlockHash.blockhash;    
    const txId = await sendAndConfirmTransaction(SOLANA_CONNECTION, transaction, [walletKeypair]);
    return `https://explorer.solana.com/tx/${txId}?cluster=devnet`;
}