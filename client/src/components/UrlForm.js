import React, { useState } from 'react';
import urlService from './../services/urls';
import Alert from './Alert';

export default function UrlForm() {
  const [url, setUrl] = useState('');
  const [miniUrls, setMiniUrls] = useState([]);
  const [status, setStatus] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await urlService.minify(url);
    console.log('handleSubmit -> res', result);
    if (result.statusText === 'Created') {
      setMiniUrls(miniUrls.concat(result.data.miniUrl));
      setUrl('');
    }
    updateStatus(result);
  };

  const updateStatus = (result) => {
    if (result.statusText === 'Created') {
      setStatus({ type: 'Success', text: 'MiniUrl created successfully' });
    } else if (result.statusText === 'Bad Request') {
      setStatus({ type: 'Error', text: 'Invalid url' });
    }
  };

  const renderMiniUrls = () => {
    return miniUrls.map((url, index) => {
      return (
        <a
          className='block text-lg mb-2 py-1 px-2 bg-indigo-200 rounded-md hover:shadow-md'
          href={url}
          key={index}
        >
          {url}
        </a>
      );
    });
  };

  return (
    <div className='px-10'>
      {status && <Alert type={status.type} text={status.text} />}
      <form className='my-5' onSubmit={(event) => handleSubmit(event)}>
        <input
          className='w-full my-5 p-2 text-xl  border border-gray-800 rounded-sm
                    focus:border-indigo-600 focus:outline-none'
          type='text'
          placeholder='Paste your full link here'
          value={url}
          onChange={(event) => {
            setUrl(event.target.value);
            setStatus({});
          }}
        />
        <input
          className='w-full p-2 mb-10 bg-indigo-600 text-white text-xl tracking-wider rounded-md shadow-lg'
          type='submit'
          value='Minify'
        />
      </form>
      <div className='h-48 overflow-y-scroll'>{renderMiniUrls()}</div>
    </div>
  );
}
