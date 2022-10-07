import React from 'react';

export default function Contact(): JSX.Element {

  const [user, setUser] = React.useState({
    name: '',
    email: '',
    number: '',
    address: '',
    message: ''
  }); 

  function inputHandler(e: React.FormEvent) {
    name: e.target.name;
    value: e.target.value;

    setUser({
        ...user,
        [name]: value
    })
  }

  return (
    <div>
        <form method='POST'>
            <input 
                type='text'
                name='name'
                placeholder='Enter Yours Name'
                value={user.name}
                onChange={inputHandler}
                required
            />
            <input 
                type='email'
                name='email'
                placeholder='Enter Yours Email'
                value={user.email}
                onChange={inputHandler}
                required
            />
            <input 
                type='number'
                name='number'
                placeholder='Enter Yours Number'
                value={user.number}
                onChange={inputHandler}
                required
            />
            <input 
                type='text'
                name='address'
                placeholder='Enter Yours Address (Optional)'
                value={user.address}
                onChange={inputHandler}
            />
            <textarea 
                name='message'
                cols={30}
                rows={10}
                value={user.message}
                onChange={inputHandler}
            >
            </textarea>
            <button>
                Send Message
            </button>
        </form>
    </div>
  )
}
