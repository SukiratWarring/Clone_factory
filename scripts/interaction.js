const {ethers}=require("hardhat");
const BlockCardFactoryJSON=require("../artifacts/contracts/BlockCardFactory.sol/BlockCardFactory.json");
async function main(){
  const BlockCardFactoryabi=BlockCardFactoryJSON.abi
  const provider= new ethers.providers.InfuraProvider("rinkeby",process.env.projectid);
  const wallet= new ethers.Wallet(process.env.REACT_APP_key,provider)
  const signer=wallet.connect(provider);
  const blockcardFactoryContract= await new ethers.Contract(process.env.REACT_APP_blockcardfactory,BlockCardFactoryabi,signer)
  //making clones by calling the factory contract
  // await blockcardFactoryContract.createBlockCard("Warring",{gasLimit:2000000});
  // await blockcardFactoryContract.createBlockCard("Singh",{gasLimit:2000000});
  console.log("BEFORE FETCHING ADDRESS")
  const firstaddress=await blockcardFactoryContract.getAddress(0);
  const secondaddress=await blockcardFactoryContract.getAddress(1);
  console.log(firstaddress);
  console.log(secondaddress);

}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
