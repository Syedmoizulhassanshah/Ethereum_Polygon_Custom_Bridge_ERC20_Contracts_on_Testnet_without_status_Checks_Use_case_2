require('dotenv').config();
const ethers = require('ethers');
const INFURA_API_URL_GOERLI = process.env.INFURA_API_URL_GOERLI;
//const LOCALHOST_URL_ROOT = process.env.LOCALHOST_URL_ROOT;
const PRIVATE_KEY_ROOT = process.env.PRIVATE_KEY_ROOT;
const rootTokenAddress = process.env.ROOT_TOKEN_CONTRACT_ADDRESS;
const rootTokenBuild = require('../build/contracts/DummyERC20.json');

const customHttpProviderRoot = new ethers.providers.JsonRpcProvider(INFURA_API_URL_GOERLI);

async function approve(ERC20Predicate, tokenAmount) {

    try {
        const walletRoot = new ethers.Wallet(PRIVATE_KEY_ROOT, customHttpProviderRoot);
        const rootTokenContract = new ethers.Contract(rootTokenAddress, rootTokenBuild.abi, walletRoot);

        console.log("Approving ERC20Predicate Contract...");
        const result = await rootTokenContract.approve(ERC20Predicate, tokenAmount);
        console.log("Transaction Successfully Done");
        console.log("Tx Hash :", result.hash);
    }

    catch (err) {
        console.log(err);
    }
}

let weiAmount = ethers.utils.parseEther('10000');

approve(
    "0xbe30c3732d0e78F20382c378136E487E478a873f",
    weiAmount
);
