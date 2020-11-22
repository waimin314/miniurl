import React, { useState, useEffect } from 'react';

export default function Alert({ type, text }) {
  const [visilibility, setVisibility] = useState(false);

  const constructCSS = () => {
    let className = '';

    className += visilibility ? 'opacity-100 ' : 'opacity-0 ';

    if (type === 'Success')
      className +=
        'bg-green-100 border-l-4 border-green-500 text-green-700 p-4 ';
    else if (type === 'Error') {
      className +=
        'bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 ';
    }
    return className;
  };

  useEffect(() => {
    setVisibility(true);
    setTimeout(() => {
      setVisibility(false);
    }, 5000);
    return () => {
      setVisibility(false);
    };
  }, [text]);

  return (
    <div className={`${constructCSS()}`} role='alert'>
      <p className='font-bold'>{type}</p>
      <p>{text}</p>
    </div>
  );
}
