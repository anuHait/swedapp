import { useState, React } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Web3 from 'web3';

function Home() {
  const [name, setName] = useState('');
  const [donor, setDonor] = useState('');
  const [charity, setCharity] = useState('');
  const [walletAddress, setWalletAddress] = useState(null);
  const [reg, setReg] = useState(false);

  const handlename = (e) => {
    setName(e.target.value);
  };

  const handledonor = (e) => {
    setDonor(e.target.value);
  };

  const handlecharity = (e) => {
    setCharity(e.target.value);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log('meow');
    const data = await axios.post('http://localhost:4000/add', {
      name: name,
      donor: donor,
      charity: charity,
      wallet: walletAddress,
    });
    setReg(true)
    console.log(data);
  };

  const handleConnectWallet = async (e) => {
    e.preventDefault();
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const address = accounts[0];
        setWalletAddress(address);
        console.log('Wallet connected:', address);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      console.error('No wallet provider found');
    }
  };

  if (reg) {
    return (
      <div className='flex flex-row gap-6'>
      <Link to='/donate-money'>
        <button className='border-2 border-blue-900 p-3 text-3xl'>Donate Money</button>
      </Link>
      <Link to='/donate-items'>
        <button className='border-2 border-blue-900 p-3 text-3xl'>Donate Items</button>
      </Link>
      </div>
    );
  }else{
    if(walletAddress){
      return (
        <div className='flex flex-row gap-6'>
        
        <div className='border-2 border-blue-900 p-3 text-3xl'>
          <h1>Register</h1>
          <form>
            <input
              type='text'
              placeholder='Name'
              className='border-2 border-blue-900 p-3 text-3xl'
              onChange={handlename}
            />
            <label>
              Donor
              <input type='radio' name='gender' value='donor' onChange={handledonor} />
            </label>
            <label>
              Charity
              <input type='radio' name='gender' value='charity' onChange={handlecharity} />
            </label>
            <button className='border-2 border-blue-900 p-3 text-3xl' onClick={handlesubmit}>
              Submit
            </button>
          </form>
        </div>
        <h1 className='border-2 border-blue-900 p-3 text-3xl'>Wallet Address: {walletAddress}</h1>
      </div>
      
    );
    }else{
      return (
        <div className='flex flex-row gap-6'>
        <button className='border-2 border-blue-900 p-3 text-3xl' onClick={handleConnectWallet}>Connect Wallet</button>
      </div>
      
    );
    }
  }
}

export default Home;




