import React from 'react';

export default function UrlForm() {
  return (
    <form className='mx-10 my-5'>
      <input
        className='w-full my-5 p-2 text-xl  border border-gray-800 rounded-sm
                    focus:border-indigo-600 focus:outline-none'
        type='text'
        placeholder='Paste your full link here'
      />
      <input
        className='w-full p-2 bg-indigo-600 text-white text-xl tracking-wider rounded-md shadow-lg'
        type='submit'
        value='Minify'
      />
    </form>
  );
}
