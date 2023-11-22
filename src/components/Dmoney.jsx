import {useState , React} from 'react'
import Web3 from 'web3';
import axios from 'axios';
function Dmoney() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [amount, setAmount] = useState(0)
  const [charity, setCharity] = useState('')
  const submit = async (e) => {
    e.preventDefault()
    const data = await axios.get(`http://localhost:4000/get-charity/${charity}`)
    console.log(data.data.wallet)


    if (!walletAddress) {
      console.error('Wallet not connected');
      return;
    }

    if (!amount || !charity) {
      console.error('Please enter the amount and charity');
      return;
    }

    try {
      const web3 = new Web3(window.ethereum);

      // Create a transaction object
      const transactionObject = {
        from: walletAddress,
        to: data.data.wallet, // Replace with the receiver's wallet address
        value: web3.utils.toWei(amount.toString(), 'ether'),
        gas: 21000,
      };

      // Send the transaction using MetaMask popup
      await web3.eth.sendTransaction(transactionObject);

      alert('Transaction sent successfully');
    } catch (error) {
      alert('Failed to send transaction:', error);
    }





  }
  const set = (e) => {
    setAmount(e.target.value)
    console.log(amount)
  }
  const setcharity = (e) => {
    setCharity(e.target.value)
    console.log(charity)
  }
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
  }
  if(!walletAddress){
    return (
      <div>
        <form>
          <label>Enter amount in MATIC</label>
          <input className="border-2 border-blue-800" type="number" value={amount} onChange={set}/>
          <label>Charity Name</label>
          <input className="border-2 border-blue-800" type="text" value={charity} onChange={setcharity}/>
          <button className="bg-blue-800 text-white px-4 py-2 rounded-md" onClick={submit} >Send</button>
        </form>
        <button className="bg-blue-800 text-white px-4 py-2 rounded-md" onClick={handleConnectWallet} >Connect Wallet</button>
      </div>
    )
  }else{
    return (
      <div>
        <form>
          <label>Enter amount in MATIC</label>
          <input className="border-2 border-blue-800" type="number" value={amount} onChange={set}/>
          <label>Charity Name</label>
          <input className="border-2 border-blue-800" type="text" value={charity} onChange={setcharity}/>
          <button className="bg-blue-800 text-white px-4 py-2 rounded-md" onClick={submit} >Send</button>
        </form>
        <h1>Wallet Adress: {walletAddress}</h1>
      </div>
    )
  }
}

export default Dmoney
