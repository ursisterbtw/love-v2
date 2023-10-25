const { Alchemy, Network, Wallet, Utils } = require("alchemy-sdk");
const dotenv = require("dotenv");

dotenv.config();
const { API_KEY, PRIVATE_KEYS } = process.env;

const settings = {
  apiKey: API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

const wallets = PRIVATE_KEYS.split(",").map((key) => new Wallet(key.trim()));

async function sendTransaction(wallet) {
  const nonce = await alchemy.core.getTransactionCount(
    wallet.address,
    "latest"
  );

  let transaction = {
    to: "0x4A2d4601AC4348248cA6A5AcabC9cFFd57994DaE",
    value: Utils.parseEther("0.0"),
    gasLimit: "21000",
    maxPriorityFeePerGas: Utils.parseUnits("1", "gwei"),
    maxFeePerGas: Utils.parseUnits("20", "gwei"),
    nonce: nonce,
    type: 2,
    chainId: 1,
  };

  let rawTransaction = await wallet.signTransaction(transaction);
  let tx = await alchemy.core.sendTransaction(rawTransaction);
  console.log("Sent transaction from", wallet.address, ":", tx);
}

async function main() {
  for (let wallet of wallets) {
    await sendTransaction(wallet);
  }
}

main();
