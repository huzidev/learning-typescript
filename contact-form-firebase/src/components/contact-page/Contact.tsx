import React from 'react';

export default function Contact() {

  const [user, setUser] = React.useState({
    name: '',
    email: '',
    number: '',
    address: '',
    message: ''
  }); 

  function inputHandler() {
    
  }
  
  return (
    <div>
        <form method='POST'>
            <input 
                type='text'
                name='name'
                placeholder='Enter Yours Name'
                value={user.name}
                required
            />
            <input 
                type='email'
                name='email'
                placeholder='Enter Yours Email'
                value={user.email}
                required
            />
            <input 
                type='number'
                name='number'
                placeholder='Enter Yours Number'
                value={user.number}
                required
            />
            <input 
                type='text'
                name='address'
                placeholder='Enter Yours Address (Optional)'
                value={user.address}
            />
            <textarea 
                name='message'
                cols={30}
                rows={10}
                value={user.message}
            >
            </textarea>
            <button>
                Send Message
            </button>
        </form>
    </div>
  )
}
