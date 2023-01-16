import { useState } from 'react';
// ethers library is like web3js but more favoured now. allows connection to blockhain. 
import { ethers, BigNumber } from 'ethers';
// import the NFT json that was compiled and verify previously. In particular the abi property of this json is what allows us to connect to the contract .
import roboPunksNFT from '../RoboPunksNFT.json';
import {Box, Button, Flex, Input, Text } from "@chakra-ui/react";

/// compilation\\\\
// note that this is the ORIGINALLY compiled address that was first compiled using hardhat... not the secondary address that was created upon running the hardhat verify function.
const roboPunksNFTaddress = '0x943d659a750BEc4852A299c2F95b7BDC9fa1A200';
// main mint compilation function encapsulated into the mainmint const . as with navbar with prop drill the values incoming from app into this function's block
const MainMint = ({ accountsCmpntLvl, setAccountsCmpntLvl })=>{
    // create two new vars that will hold the minted amount qunatityt that is chosen by the user and set that amount to the account? The 1 is a default value of how much to mint as presented to user.
    const [mintAmount, setMintAmount] = useState(1);
    // boolean check to see if an acocunt is connected. 0 state is false, any account value means it is connected.
    const isConnected = Boolean(accountsCmpntLvl[0]);

    async function handleMint(){
        if (window.ethereum){
            // provide is given the value of an inbuilt function that is imported from ethers package. This is basically an initial 'connection' hook to the ethereum blockchain
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner(); // signs the proposed minting transaction - a requirement for any interaction with blockchaing that has a crud functionality.
            // here we specifify the contract address on the ethereum network etherscan  tracker
            const contract = new ethers.Contract(
                roboPunksNFTaddress,
                //we also need to provide as arg2 the abi (application binary interface like an abi but at machine-language level)
                roboPunksNFT.abi, 
                //arg3 takes the signer hash for security
                signer
            );
            ////RUNTIME\\\\\
            // try catch block for erorry handling
            try {
                // response from the inputted human values mintAmount (brought in as a prop from app.js level and converted into a BigNumber format due to solidity requirements for calculations is awaited here. The contract.mint function is our roboPunksNFT contract's etherscan addres plus the abi and security hash as arg2 and 3. once that is parse, then solidity can call that robopunksNFT contract's mint() function which was previously defined/written in RoboPunksNFT.sol
                const response = await contract.mint(BigNumber.from(mintAmount), 
                //note that fter the big number passing, we also need to give an arg 2 to our mint() function which gives a value in ethers not simply our own token nft amounts(which can be between 1 to 3). remember that the robopunksnft.sol contract class instance specified an amount of 0.02 ethers for every unit, so here we use the passed in mintAmount that we recieved from the app-level and calculate that * the 0.02 ethere fixed unit value. We have to also return this arg2 within an inbuilt parseEther method of the ethers package's utils and this needs to be  a string so we deploy toString().
                {value: ethers.utils.parseEther((0.02*mintAmount).toString())
                });
                console.log('Response: ', response);
            }
            catch(error){
                console.log('Error : ', error)
            };
        };
    };
    // handle decrement  function to deal with user pressing - button on the amount to be minted.. In particular, if the mint amount reaches 1, stop any action. But any amount above 1 will see a decrement in amount to be minted.
    const handleDecrement = ()=>{
        if(mintAmount <= 1) return;
        // if above 1 then decrement by 1.
        setMintAmount(mintAmount -1);
    };
    // handle incremenet function - in this case, setting the max cieling of 3.
    const handleIncrement = ()=>{
        if(mintAmount >= 3) return;
        // if above 1 then decrement by 1.
        setMintAmount(mintAmount +1);
    };
    ///runtime return jsx render block\\\
    return (
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">
                <div>
                    <Text fontSize="48px" textShadow="0 5px #0000000">RoboPunks</Text>
                    <Text fontSize="30px" letterSpacing="-5.5%" textShadow="0 2px 2px #0000000" fontFamily="VT323" >It's the year 2069. Can the Robo Punks save the world from NFT minting bugs?</Text>
                </div>
            {/**ternary account connected check */}
            {isConnected? (
                <div>
                    <Flex align="center" justify="center">
                        <Button backgroundColor="#D6517D" borderRadius="5px" boxshadow="0px 2px 2px 1px #0F0F0F" color="white" cursor="pointer" fontFamily="inherit" padding="15px" marginTop="10px" onClick={handleDecrement}>-</Button>
                        <Button backgroundColor="#D6517D" borderRadius="5px" boxshadow="0px 2px 2px 1px #0F0F0F" color="white" cursor="pointer" fontFamily="inherit" padding="15px" marginTop="10px" onClick={handleIncrement}>+</Button>
                        <Input readOnly width="100px" height="40px" textAlign="center" paddingLeft="19px" marginTop="10px" type="number" value={mintAmount}/>
                    </Flex>
                    <Button backgroundColor="#D6517D" borderRadius="5px" boxshadow="0px 2px 2px 1px #0F0F0F" color="white" cursor="pointer" fontFamily="inherit" padding="15px" marginTop="10px" onClick={handleMint}>Mint Now!</Button>
                </div>    
            ) : (
                <Text marginTop="70px" fontSize="30px" letterSpacing="-5.5%" fontFamily="VT323" textShadow="0 3px #0000000"  color="#D6517D">Connect your account to be able to mint.</Text>
            )}
            </Box>
        </Flex>
    );
};
export default MainMint;

