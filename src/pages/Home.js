import { useState, React } from 'react';
import { useNavigate , Link} from "react-router-dom"
import axios from 'axios';
import Web3 from 'web3';
import { FaWallet } from "react-icons/fa6";
import donate from '../assets/donate.jpg'
function Home() {
  const [name, setName] = useState('');
  const [donor, setDonor] = useState('');
  const [charity, setCharity] = useState('');
  const [walletAddress, setWalletAddress] = useState(null);
  const [reg, setReg] = useState(false);
  const Navigate = useNavigate();

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
        const data = await axios.get(`http://localhost:4000/wallet/${address}`)
        console.log(data)
        if(data.data!=""){
          Navigate('/donate')
        }
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      console.error('No wallet provider found');
    }
  };

  if (reg) {
   Navigate('/donate')
  }else{
    if(walletAddress){
      return (
        <div className='flex flex-row gap-4'>
        <div className='flex flex-col m-10 gap-6 justify-center items-center'>
        
        <div className='border-2 border-blue-900 rounded-xl p-4 text-2xl w-[75%] '>
          <h1 className='font-semibold mb-2'>Register</h1>
          <form className='flex flex-col gap-2'>
            <input
              type='text'
              placeholder='Name'
              className='border-2 border-blue-900 p-3 text-3xl rounded-xl'
              onChange={handlename}
            />
            <h1 className='font-semibold'>Are you a donor or a charity?</h1>
            <label>
              
              <input type='radio' name='gender' value='donor' onChange={handledonor} className='mr-2' />Donor
            </label>
            <label>
              
              <input type='radio' name='gender' value='charity' onChange={handlecharity} className='mr-2'/>Charity
            </label>
            <br/>
            <button className='border-2 border-blue-900 p-3 text-3xl rounded-xl hover:bg-blue-800 hover:text-white font-semibold' onClick={handlesubmit}>
              Submit
            </button>
          </form>
        </div>
        <h1 className='border-2 border-blue-900 p-3 rounded-xl text-xl font-semibold flex flex-row gap-2 items-center w-[85%] '>
          <FaWallet className='inline-block text-lg text-gray-700' />
          Wallet Address: {walletAddress}</h1>
      </div>
      <div className='w-[58%] h-[85%] mt-20'>
      <img src={donate} alt="donate" className=' rounded-xl'/></div>
      </div>
    );
    }else{
      return (
        <div className='flex flex-row gap-6' >
        <button className='border-2 border-blue-900 p-3 text-3xl w-[65%] ' onClick={handleConnectWallet}>Connect Wallet</button>
      </div>
      
    );
    }
  }
}

export default Home;




