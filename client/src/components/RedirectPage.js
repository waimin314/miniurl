import React, { useState, useEffect } from 'react';
import urlService from '../services/urls';

export default function RedirectPage({ slug }) {
  const [result, setResult] = useState({});

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const res = await urlService.getUrl(slug);
        setResult(res);
      } catch (error) {}
    };
    fetchUrl();
  }, []);

  const renderRedirect = () => {
    const data = result.data;

    if (!data) return;

    window.location.href = data.fullUrl;

    return (
      <div>
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
          Redirecting to
        </div>
        <p className='font-bold'>{data.fullUrl}</p>
      </div>
    );
  };

  const renderErrorMesage = () => {
    return (
      <div className='text-red-600 break-all'>
        No valid Url found for <br />
        <strong>{window.location.href}</strong>
      </div>
    );
  };

  return (
    <div className='flex flex-col text-lg mx-10 p-2'>
      {result.status === 404 ? renderErrorMesage() : renderRedirect()}
    </div>
  );
}
