const {ethers,upgrades}=require("hardhat");
async function main(){
    // const BlockCard=await ethers.getContractFactory("BlockCard");
    // const blockcard= await upgrades.deployProxy(BlockCard,{kind:"uups"});
    // await blockcard.deployed();
    // console.log(`The BlockCard contract is depoyed at : ${blockcard.address}`)

    const BlockCardFactory=await ethers.getContractFactory("BlockCardFactory");
    const blockcardfactory= await upgrades.deployProxy(BlockCardFactory,[process.env.REACT_APP_blockcardcontract_implementation],{kind:"uups"});
    await blockcardfactory.deployed();
    console.log(`The BlockCardFactory contract is depoyed at : ${blockcardfactory.address}`)
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });