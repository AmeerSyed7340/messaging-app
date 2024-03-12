import { useEffect, useState } from 'react'
import './App.css'
import '../src/assets/styles/Main.css'

function App() {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //Make API call with Fetch API 
      const response = await fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message })
      })
        .then((response) =>
          response.json()
        )
        .then(data => {
          console.log(data);
        });

      //Make sure response is okay
      // if(response.ok){

      //   setMessage('');
      // }
      // else{
      //   //HTTP error
      //   console.error('Failed to send message')
      // }
    }
    catch (error) {
      //handle network errors
      console.error('Network Error in submitting message: ', error)
    }
  }//handleSubmit

  return (
    <>
      <div className='full-content'>
        <div className='display'></div>
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
