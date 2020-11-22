import React, { useState, useEffect } from 'react';
import * as urlService from '../services/urls';

export default function RedirectPage({ slug }) {
  const [result, setResult] = useState({});

  useEffect(() => {
    const fetchUrl = async () => {
      const res = await urlService.getUrl(slug);
      if (res) setResult(res);
    };
    fetchUrl();
  }, [slug]);

  const infoCard = (message, url) => {
    return (
      <div
        className='bg-white p-5 rounded-md shadow-md 
                      lg:w-3/5 lg:mx-auto'
      >
        <div className='flex items-center mb-5'>
          {/* Spinning circle */}
          <svg
            className='animate-spin mr-3 h-6 w-6 text-indigo-600'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
          {message}
        </div>
        <p className='font-bold break-all'>{url}</p>
      </div>
    );
  };

  const renderRetrieving = () => {
    return infoCard(
      'Retrieving full link from server for',
      window.location.href
    );
  };

  const renderRedirect = () => {
    const data = result.data;

    window.location.href = data.fullUrl;

    return infoCard('Redirecting to', data.fullUrl);
  };

  const renderErrorMesage = () => {
    setTimeout(() => {
      window.location.href = window.location.origin;
    }, 3000);
    return (
      <div
        className=' w-full p-5 text-red-600 break-all bg-red-100 rounded-md shadow-md
                      lg:w-3/5 lg:mx-auto'
      >
        No valid Url found for <br />
        <p className='text-xl italic my-3'>{window.location.href}</p>
        <p className='animate-pulse text-lg text-black'>
          Redirecting to {window.location.origin} ...
        </p>
      </div>
    );
  };

  const renderStatus = () => {
    if (result.status === 404) return renderErrorMesage();
    else if (result.status === 200) return renderRedirect();
    else return renderRetrieving();
  };

  return (
    <div className='flex flex-col text-lg mx-10 p-2 lg:w-full'>
      {renderStatus()}
    </div>
  );
}
