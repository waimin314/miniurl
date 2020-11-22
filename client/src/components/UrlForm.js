import React, { useState } from 'react';
import urlService from './../services/urls';
import Alert from './Alert';

export default function UrlForm() {
  const [url, setUrl] = useState('');
  const [miniUrls, setMiniUrls] = useState([]);
  const [status, setStatus] = useState({});
  const [isSaving, setSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    const result = await urlService.minify(url);
    setSaving(false);
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
          className='block text-lg mb-2 py-1 px-2 bg-indigo-200 
                     rounded-md hover:shadow-md underline text-indigo-700
                     lg:flex lg:w-full '
          href={url}
          target='blank'
          key={index}
        >
          {url}
        </a>
      );
    });
  };

  const renderStatus = () => {
    return (
      <div className='h-20'>
        {isSaving && (
          <p className='animate-pulse text-xl font-semibold'>Minifying...</p>
        )}
        {status && <Alert type={status.type} text={status.text} />}
      </div>
    );
  };

  return (
    <div
      className='px-6 bg-white rounded-md shadow-lg py-5
                  md:px-10 lg:w-full lg:max-w-4xl'
    >
      {renderStatus()}
      <form className='my-5 lg:flex' onSubmit={(event) => handleSubmit(event)}>
        <input
          className='w-full my-5 p-2 text-xl  border border-gray-800 rounded-sm
                    focus:border-indigo-600 focus:outline-none
                    lg:max-w-2xl lg:mr-5'
          type='text'
          placeholder='Paste your full link here'
          value={url}
          onChange={(event) => {
            setUrl(event.target.value);
            setStatus({});
          }}
        />
        <input
          className='w-full p-2 mb-10 bg-indigo-600 rounded-md shadow-lg
                  text-white text-xl tracking-wider cursor-pointer
                  hover:bg-indigo-700 hover:shadow-outline 
                    lg:w-32 lg:my-5'
          type='submit'
          value='Minify'
        />
      </form>
      <div className='h-48 overflow-y-auto'>{renderMiniUrls()}</div>
    </div>
  );
}
