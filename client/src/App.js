import React from 'react';
import RedirectPage from './components/RedirectPage';
import UrlFrom from './components/UrlForm';

function App() {
  // Get pathname without '/' character
  const slug = window.location.pathname.substring(1);
  return (
    <div
      className='h-screen flex flex-col justify-center items-center px-5 
          bg-gradient-to-b from-indigo-400 to-indigo-300'
    >
      {slug.length > 0 && <RedirectPage slug={slug} />}
      {slug.length === 0 && <UrlFrom />}
    </div>
  );
}

export default App;
