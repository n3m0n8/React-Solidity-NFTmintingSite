import { useState } from 'react';
import './App.css';
import MainMint from './components/MainMint';
import NavBar from './components/NavBar';


function App() {
  ////COMPILATION 
  // set these var values to be updated on the basis of their main memory state.
    const [accountsAppLvl, setAccountsAppLvl] = useState([]);

    /// RUNTIME
    return (
    <div className='overlay'>
      <div className="App">
        {/**here we a re 'prop-drilling' these vars as per their currently compied state above, presumably on the basis of some communication with the etherscan api which will update us on the accounts data? the prop-drilling means that at this app level we 'provide access' to the two componetns that are 'absorving their current state value into these components' declared props, similar but less elegant that the multi-story vue-js passing/tunneling of props/states' */}
        <NavBar accountsCmpntLvl={accountsAppLvl} setAccountsCmpntLvl={setAccountsAppLvl} />
        <MainMint accountsCmpntLvl={accountsAppLvl} setAccountsCmpntLvl={setAccountsAppLvl}/>
      </div>
      <div className='moving-background'></div>
    </div>
  );
}

export default App;
