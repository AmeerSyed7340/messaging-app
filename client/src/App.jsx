import { useEffect, useState } from 'react'
import '../src/assets/styles/Main.css'


function App() {
  const [message, setMessage] = useState('');
  const [allMsg, setAllMsg] = useState([]);

  //retrieve existing messages on mount
  useEffect(()=>{
    fetch('http://localhost:3000')
    .then(response => {
      if(response.ok){
        return response.json();
      }else{
        throw new Error('Response error in UseEffect');
      }
    })
    .then(data => {
      console.log(data);
      setAllMsg(data.allMsg);
    })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message })
    })
    .then(response => {
      if(response.ok) {        
        return response.json();          
      } else {
        throw new Error('Response error in handleSubmit'); // Will be caught by the .catch() block
      }
    })
    .then(data => {
      setAllMsg(prev => [...prev, data.newMsg]);
      console.log(data); // Process your data here
      setMessage(''); // Clear message or handle success
    })
    .catch(error => {
      console.error('Error in submitting message:', error); // Handle any errors from the fetch or processing
    });
  };
  
  //format date function
  const formatDate = (dateString) => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <>
      <div className='full-content'>
        <div className='display'>
          {allMsg.map((msg, index) => (
            <li key={index}><p>{msg.message}</p> <p>{formatDate(msg.createdAt)}</p></li>
          ))}
        </div>
        <div className="input-text">
          <form onSubmit={handleSubmit}>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} cols="100" rows="1"></textarea>
            <button className='btn' type='submit'>Send</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
