import React from 'react';

export default function Contact() {
  return (
    <div>
        <form method='POST'>
            <input 
                type='text'
                name='name'
                placeholder='Enter Yours Name'
                required
            />
            <input 
                type='email'
                name='email'
                placeholder='Enter Yours Email'
                required
            />
            <input 
                type='text'
                name='name'
                placeholder='Enter Yours Number'
                required
            />
            <input 
                type='text'
                name='name'
                placeholder='Enter Yours Address (Optional)'
            />
            <textarea 
                name='message'
                cols='30' 
                rows='10'
            >
            </textarea>
        </form>
    </div>
  )
}
