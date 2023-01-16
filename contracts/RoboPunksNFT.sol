// briefly, sol is short for solidity, a language written in tandem with the ethereum virtual machine/ethereum ecosystem. Solidy allows us to tap in ethereum's constructs for forging smart contracts.
// the spdx points to license type
//SPDX-License-Identifier: UNLICENSED
//version of the solidity . pragma is a solidity directive pointing to its version
pragma solidity ^0.8.4;
// import from open zep package the erc721 standing for ethereum request for comments 721 which defined a Non fungible tokens contract standard.
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
// this solidity class specifies functiosn that inherite the Ownable superclass' properties and functions which restricts the use of such functions to only the owner of the nft
import '@openzeppelin/contracts/access/Ownable.sol';

// now we compile a class template of our NFT contract (using contract reserved keyword) which explicilty inherits from ERC721 namespace and Ownable superclass:
contract RoboPunksNFT is ERC721, Ownable{
    // specify an unsigned (positive nums only) integer of 256 bits for mint price and other vars relating to the contract's value and transactions...NOTE It is important to think carefully about the size of these storage variables because the greater the storage, the more there is cost to their transaction. So we must assign the bare minimum possible memory space required for the purposes of each var.
    //note also access modifiers, the folllwing are public. Note convention is to have public, then restricted, then private in order
    uint256 public mintPrice; // price of minting one NFT
    uint256 public totalSupply; // current supply in circulation
    uint256 public maxSupply;  // max potential supply (cieling)
    uint256 public maxPerWallet; // maximum nfts that a particular wallet is allowed to mint
    // this boolean determines when the users can mint as per owner's rules 
    bool public isPublicMintEnabled;
    // relates to the URI allowing a tool like OpenSea (which is the largest NFT marketplace) can determine where the images of the nfts are located. note the use of internal -i.e. restricte access mod
    string internal baseTokenUri; 
    // here is the variable attached to a public wallet for transctions
    address payable public withdrawWallet;
    //the following map the address type to uint256??  and typecasting that as a declared walletMints var:
    mapping(address => uint256) public walletMints;

    // constructor function for instnatiation of an NFT object instance of the robobpunks class under the the ERC721 instance object meth:
    constructor() payable ERC721('RoboPunksNFT', 'RP'){
        mintPrice =  0.02 ether; //set base mint price
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
        // set withdraw wallet addrees withdrawWallet;
        // not covered in this tutorial
    }
    //function to specify whether public minting is enabled:
    // in solidity, external is an access mod which basically is like public but uses a lot less ethereum virtual machine work cost (about half of the 'gas' required) onlyOwner is another access mod which limits the call of the is function to only the specified owner of the NFT
    function setIsPublicMintEnabled(bool isPublicMintEnabled_Arg) external onlyOwner{
        isPublicMintEnabled = isPublicMintEnabled_Arg; // sets the global var's value to whatever boolean is passed arg1 value of the current function (which is only callable by the owner).
    }
    // this function sets the base token URI location:
    // similarly is only callable by NFT owner.
    // calldata is one of three memory management types used by the ethereum virtual machine. It is among the least expensive in terms of gas use.
    function setBaseTokenURI(string calldata baseTokenUri_Arg) external onlyOwner{
        baseTokenUri = baseTokenUri_Arg;
    }
    //function sets token uri :
    // not completely clear explanation on this by Ed Roh, come back when have better grasp on cryptoCurr and solidity
    //broadly though, the token here is just like a standard hashed URI token - for example if you subscribe to a newsletter and have a confirmation URI that has a ?query string followed by a one time use token (or for example an OTR token sent by sms). So basically this token URI is a locator of a particular NFT minting action? and then at the end we attahc .json because we are formatting the toString'd token value (i.e hash to string?) as a json object allowing the OpenSea marketplace to parse through the relevant NFT data?
    function tokenURI(uint256 tokenId_arg) public view override returns (string memory){
        require(_exists(tokenId_arg), 'Token Not Found!');
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_arg), ".json"));
    }
    // withdrawal of funds function. Limited only to owner of nft block of course
    function withdraw() external onlyOwner{
        // sett a boolean of withdrawl status. If there is a successful withdrawal- i.e. if success holds to a true value, then the value of the withdrawal on the wallet account's balance will be calculated using the withdrawWallet function defined just above and pass whatever $this particular instance object of the robopunksNFT class's balance property is being deployed into the class' withdrawwalwallet function's address property for calculation of new/remainined balance - which is what passes over to the right hand side of the (bool success, |here balance passes| )
        //the (variable, result) construct seems to be a solidity shorthand function somewhat like var1= ()=>{} in javascript, a shorthand anonymous function assignment but also similar to { destructuring an object array }
        (bool success, ) = withdrawWallet.call{ value: address(this).balance }('');
        // on this require check, if success holds to a false value, then we provide the msg withdrawal failed
        require (success, 'Withdrawal failed');
        // the following function puts a rate limiter on minting itself to avoid abuse of the minting process:
    }
        function mint(uint256 quantity_arg) public payable {
            //again deploying that shorthand boolean conditional/()=>fastfunction/destructure assignement with right hand side showing the output if our boolean conditional on the left is a false status.
            require(isPublicMintEnabled, 'Sorry, minting is not available.');
            // another check here making sure that the inputted minting value is correct as per the minting to quantity algo.
            require(msg.value == quantity_arg * mintPrice, 'Wrong mint value input.');
            // check that max supply is not breached when quantity being purchased is added to total existing supply.
            require(totalSupply + quantity_arg <= maxSupply, 'Sold out.'); 
            // another check against abusive minting beyond the maximum allowable per wallet. msg.sender seems to be inbuilt and refers to the wallet holder who is calling the relevant function of this robobpunksNFT class , in this case the walletMints funct.
            require(walletMints[msg.sender] + quantity_arg <= maxPerWallet, 'Exceeded maximum minting per wallet');
            //Minting algorithm function:
            for (uint256 i = 0; i < quantity_arg; i++){
                // newTokenId is adding a new token and this is adding to the totalSupply - i.e. it is whatever the new total supply(+1) value being attached as the uint256 value of this newly minted token. SO THIS IS ONLY ASSIGNMENT OF THE VALUE TO THE NEW TOKEN, THE TOTAL SUPPLY DOESNT CHANGE YET
                uint256 newTokenId = totalSupply + 1; 
                // doing the above, we also need to change the TOTAL SUPPLY WITH A +1 to reflect the change.
                totalSupply ++;
                // safe mint is an inbuilt ERC721 class function that is inherited here, takes arg1 of the msgSender i.e. the isntand object of the robobpunksNFT calling on the relevant function dfefined in the present RoboPunksNFT class. arg2 is the newTokenId which has been defined as whatever the new level of total supply is (the 'next block')
                // this is the interaction that basically runtimes' the minted changes compiled in the foregoing two declaration statements (i.e. the first statemetn that defined newTokenId and the second statemetn that adjusted the total suply level). Note for opsec, the compilation MUST COME BEFORE THIS FINAL RUNTIM'D declaration statement. In particualar the re-entrancy attack vuln which, if runtime is not clearly delineated from compilation, can allow for multiple actions to be undertaken on the compilation procss before runtiming (and therefore calling totalSupply ++ many times before runtiming safeMint and 'fixing' the new supplyCeiling).
                _safeMint(msg.sender, newTokenId);
            }
        }
    }