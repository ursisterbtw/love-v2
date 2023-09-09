const { Alchemy, Network, Wallet, Utils } = require("alchemy-sdk");
const dotenv = require("dotenv");

dotenv.config();
const {
  API_KEY,
  PRIVATE_KEY1,
  PRIVATE_KEY2,
  PRIVATE_KEY3,
  PRIVATE_KEY4,
  PRIVATE_KEY5,
  PRIVATE_KEY6,
  PRIVATE_KEY7,
  PRIVATE_KEY8,
  PRIVATE_KEY9,
  PRIVATE_KEY10,
} = process.env;

const settings = {
  apiKey: API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

let wallet1 = new Wallet(PRIVATE_KEY1);
let wallet2 = new Wallet(PRIVATE_KEY2);
let wallet3 = new Wallet(PRIVATE_KEY3);
let wallet4 = new Wallet(PRIVATE_KEY4);
let wallet5 = new Wallet(PRIVATE_KEY5);
let wallet6 = new Wallet(PRIVATE_KEY6);
let wallet7 = new Wallet(PRIVATE_KEY7);
let wallet8 = new Wallet(PRIVATE_KEY8);
let wallet9 = new Wallet(PRIVATE_KEY9);
let wallet10 = new Wallet(PRIVATE_KEY10);

async function sendTransaction(wallet) {
  const nonce = await alchemy.core.getTransactionCount(
    wallet.address,
    "latest"
  );

  let transaction = {
    to: "0x34806CBBa5698F9CA9F4AA4700348e56FE3ceB34",
    value: Utils.parseEther("0.0"),
    gasLimit: "21000",
    maxPriorityFeePerGas: Utils.parseUnits("1", "gwei"),
    maxFeePerGas: Utils.parseUnits("25", "gwei"),
    nonce: nonce,
    type: 2,
    chainId: 1,
  };

  let rawTransaction = await wallet.signTransaction(transaction);
  let tx = await alchemy.core.sendTransaction(rawTransaction);
  console.log("Sent transaction from", wallet.address, ":", tx);
}

async function main() {
  await sendTransaction(wallet1);
  await sendTransaction(wallet2);
  await sendTransaction(wallet3);
  await sendTransaction(wallet4);
  await sendTransaction(wallet5);
  await sendTransaction(wallet6);
  await sendTransaction(wallet7);
  await sendTransaction(wallet8);
  await sendTransaction(wallet9);
  await sendTransaction(wallet10);
}

main();
