import React from 'react';
import RedirectPage from './components/RedirectPage';
import UrlFrom from './components/UrlForm';

function App() {
  // Get pathname without '/' character
  const slug = window.location.pathname.substring(1);
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      {slug.length > 0 && <RedirectPage slug={slug} />}
      <UrlFrom />
    </div>
  );
}

export default App;
