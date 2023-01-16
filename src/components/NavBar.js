import { React, /*useEffect useState*/} from 'react';
import {Box, Button, Flex, Image, Link, Spacer } from '@chakra-ui/react';
import Facebook from "../assets/social-media-icons/facebook.png";
import Twitter from "../assets/social-media-icons/twitter.png";
import Email from "../assets/social-media-icons/email.png";
// prop drills from level above gets imported into the destructured args of navbar const function. 
const NavBar =  ({ accountsCmpntLvl, setAccountsCmpntLvl })=> {
    // this condition is forcing a Boolean state (t/f) on the accounts situation. If there is any value to the accounts[array] then is connected will be true. if accounts array is [0] it means not connected? The point is to use this detection in order to render specific componments on the front end for those people who have connected their account to the browser window, vs the 'public' non connected window.
    const isConnected = Boolean(accountsCmpntLvl[0]);
    // the connection to account is done using the metamask extension. we can detect this using a particular trait of metamask - the fact that it injects every application it encounters with a window.ethereum property.
    // the async function checks for this injection signal: 
    async function connectAccount(){
       if(window.ethereum){
        const accountsCmpntLvl = await window.ethereum.request({
            // this method fetches all of the metamask accounts on the ethereum blockchain networks upon having a successful hook of the window.ethereum request function.
            method: 'eth_requestAccounts',
        });
        //sends updated information via NavBar props of the setAccounts and accounts variable values as calculated on the basis of the foregoing connect acocunts method. i.e. it passes the value of the account as retrieved via metamask's eth_requestAccounts method and then passes the value of that account one level up using the also prop-defined setAccounts method. Note that once it reaches one level up to the app.js level, then the useState method there takes the value of the account and sets it as the value of the acocunt over there. 
        setAccountsCmpntLvl(accountsCmpntLvl);
       }; 
    };
    return (
        <Flex justify="space-between" align="center" padding="30px"> 
            {/**left side of nav bar */}
            <Flex justify="space-around" width="40%" padding="0 75px">
                <Link href="https://www.facebook.com">
                    <Image src={Facebook} boxSize="42px" margin="0 15px"></Image>
                </Link>
            </Flex>
            <Flex justify="space-around" width="40%" padding="0 75px">
                <Link href="https://www.twitter.com">
                    <Image src={Twitter} boxSize="42px" margin="0 15px"></Image>
                </Link>
            </Flex>
            <Flex justify="space-around" width="40%" padding="0 75px">
                <Link href="https://www.mail.google.com">
                    <Image src={Email} boxSize="42px" margin="0 15px"></Image>
                </Link>
            </Flex>
            {/**right side of nav bar */}
            <Flex justify="space-around" align="center" width="40%" padding="30px"> 
                <Box margin="0 15px">About</Box>
                <Spacer />
                <Box margin="0 15px">Mint</Box>
                <Spacer />
                <Box margin="0 15px">Team</Box>
                <Spacer />
                    {/**Connect account ternary test for connected or want to connect */}
                    {isConnected ? (
                    <Box margin="0 15px">Account Connected</Box>
                    ) : (
                    <Button backgroundColor="#D6517D" borderRadius="5px" boxShadow="0px 2px 2px 1px #0F0F0F" color="white" cursor="pointer" fontFamily="inherit" padding="15px" margin="0 15px" onClick={connectAccount}>Connect Account</Button>
                    )}
            </Flex>
        </Flex>
    );
};
export default NavBar;

