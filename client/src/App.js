import React from 'react';
import RedirectPage from './components/RedirectPage';
import UrlFrom from './components/UrlForm';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  // Get pathname without '/' character
  const slug = window.location.pathname.substring(1);
  return (
    <div
      className='h-screen flex flex-col px-5 
          bg-gradient-to-b from-indigo-400 to-indigo-300 
          lg:items-center'
    >
      <Header />
      {slug.length > 0 && <RedirectPage slug={slug} />}
      {slug.length === 0 && <UrlFrom />}
      <Footer />
    </div>
  );
}

export default App;
