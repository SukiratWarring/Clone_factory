const {ethers}=require("hardhat");
const BlockCardFactoryJSON=require("../artifacts/contracts/BlockCardFactory.sol/BlockCardFactory.json");
async function main(){
  const BlockCard=await ethers.getContractFactory("BlockCard");
  const blockcard= await upgrades.deployProxy(BlockCard,["MAJOR CARD"],{kind:"uups"});
  await blockcard.deployed();
  blockcardcontractAddress=blockcard.address;
  console.log(`The BlockCard contract is depoyed at : ${blockcardcontractAddress}`)

  
  const BlockCardFactory=await ethers.getContractFactory("BlockCardFactory");
  const blockcardfactory= await upgrades.deployProxy(BlockCardFactory,[blockcardcontractAddress],{kind:"uups"});
  await blockcardfactory.deployed();
  const blockcardfactorycontract=blockcardfactory.address;
  console.log(`The BlockCardFactory contract is depoyed at : ${blockcardfactorycontract}`)

  const BlockCardFactoryabi=BlockCardFactoryJSON.abi
  const provider= new ethers.providers.InfuraProvider("rinkeby",process.env.projectid);
  const wallet= new ethers.Wallet(process.env.REACT_APP_key,provider)
  const signer=wallet.connect(provider);
  const blockcardFactoryContract= await new ethers.Contract(blockcardfactory,BlockCardFactoryabi,signer)
  console.log("Making clones");
  //making clones by calling the factory contract
  await blockcardFactoryContract.createBlockCard("Warring",{gasLimit:2000000});
  await blockcardFactoryContract.createBlockCard("Singh",{gasLimit:2000000});
  console.log("BEFORE FETCHING ADDRESS")
  const firstaddress=await blockcardFactoryContract.getAddress(0);
  const secondaddress=await blockcardFactoryContract.getAddress(1);
  console.log(firstaddress);
  console.log(secondaddress);
  console.log("BEFORE CALL");
  //calling the clone contract functions
  

console.log("BEFORE RES")
  const res= await blockcard(firstaddress).getname();
  console.log(res);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
