import React, { useState } from 'react';
import * as urlService from './../services/urls';
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

    if (result.statusText === 'Created') {
      setMiniUrls([result.data.miniUrl, ...miniUrls]);
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

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    setStatus({ type: 'Success', text: 'Copied successfully' });
  };

  const renderMiniUrls = () => {
    return miniUrls.map((url, index) => {
      return (
        <div
          className='flex items-center bg-indigo-200 my-2 p-2 rounded-md 
                        lg:p-5'
          key={index}
        >
          <button
            className='w-10 p-2 bg-indigo-600 rounded-md shadow-lg
                  text-white text-xl tracking-wider cursor-pointer
                  hover:bg-indigo-700 hover:shadow-outline 
                    lg:w-12'
            onClick={() => {
              copyToClipboard(url);
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3'
              />
            </svg>
          </button>
          <a
            className='text-lg py-1 px-2
                     rounded-md underline text-indigo-700
                     '
            href={url}
            target='blank'
          >
            {url}
          </a>
        </div>
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
          className='w-full p-2 mb-5 bg-indigo-600 rounded-md shadow-lg
                  text-white text-xl tracking-wider cursor-pointer
                  hover:bg-indigo-700 hover:shadow-outline 
                    lg:w-32 lg:my-5'
          type='submit'
          value='Minify'
        />
      </form>
      <div className='h-56 overflow-y-auto lg:h-64'>{renderMiniUrls()}</div>
    </div>
  );
}
