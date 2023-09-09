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

let wallets = [
  new Wallet(PRIVATE_KEY1),
  new Wallet(PRIVATE_KEY2),
  new Wallet(PRIVATE_KEY3),
  new Wallet(PRIVATE_KEY4),
  new Wallet(PRIVATE_KEY5),
  new Wallet(PRIVATE_KEY6),
  new Wallet(PRIVATE_KEY7),
  new Wallet(PRIVATE_KEY8),
  new Wallet(PRIVATE_KEY9),
  new Wallet(PRIVATE_KEY10),
];

async function transfer(wallet, to, amount) {
  const nonce = await alchemy.core.getTransactionCount(
    wallet.address,
    "latest"
  );

  let data = alchemy.core.abi.encodeFunctionCall(
    {
      name: "transfer",
      type: "function",
      inputs: [
        {
          type: "address",
          name: "to",
        },
        {
          type: "uint256",
          name: "value",
        },
      ],
    },
    [to, amount]
  );

  let transaction = {
    to: "0x36d7aa5c67efd83992fc5cbc488cc2f9ba7689b8",
    data: data,
    gasLimit: "21000",
    maxPriorityFeePerGas: Utils.parseUnits("1", "gwei"),
    maxFeePerGas: Utils.parseUnits("25", "gwei"),
    nonce: nonce,
    type: 2,
    chainId: 1,
  };

  let rawTransaction = await wallet.signTransaction(transaction);
  let tx = await alchemy.core.sendTransaction(rawTransaction);

  console.log("Sent transfer transaction from", wallet.address, ":", tx);
}

async function main() {
  for (let wallet of wallets) {
    await transfer(
      wallet,
      "0xYourAddressHere",
      Utils.parseEther("AmountToSendHere")
    );
  }
}

main();
