const {ethers}=require("hardhat");
const BlockCardFactoryJSON=require("../artifacts/contracts/BlockCardFactory.sol/BlockCardFactory.json");
const BlockCardJSON=require("../artifacts/contracts/BlockCard.sol/BlockCard.json");
async function main(){
  //FOR FACTORY
  const BlockCardFactoryabi=BlockCardFactoryJSON.abi
  const provider= new ethers.providers.InfuraProvider("rinkeby",process.env.projectid);
  const wallet= new ethers.Wallet(process.env.REACT_APP_key,provider)
  const signer=wallet.connect(provider);
  const blockcardFactoryContract= await new ethers.Contract(process.env.REACT_APP_blockcardfactory,BlockCardFactoryabi,signer)

  //FOR BLOCKCARD
  const BlockCardabi=BlockCardJSON.abi
  const provider_2= new ethers.providers.InfuraProvider("rinkeby",process.env.projectid);
  const wallet_2= new ethers.Wallet(process.env.REACT_APP_key,provider_2)
  const signer_2=wallet_2.connect(provider);


  console.log("Making clones");
  //making clones by calling the factory contract
  // await blockcardFactoryContract.createBlockCard({gasLimit:2000000});
  // await blockcardFactoryContract.createBlockCard({gasLimit:2000000});
  console.log("BEFORE FETCHING ADDRESS")
  const firstaddress=await blockcardFactoryContract.getAddress(0);
  const secondaddress=await blockcardFactoryContract.getAddress(1);
  console.log(firstaddress);
  console.log(secondaddress);
  console.log("BEFORE CALL");
  //calling the clone contract functions
  console.log("MAking first address instance")
  blockcardContractclone=await new ethers.Contract(firstaddress,BlockCardabi,signer_2);
  console.log("Setting name")
  // await blockcardContractclone.setName("Sukirat")
  console.log("Getting name")
  const FIRSTADDNAME=await blockcardContractclone.getname({gasLimit:200000});
  console.log(FIRSTADDNAME);

}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
