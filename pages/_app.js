import { UserContext } from '../Context/UserContext';
import { useState } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({ name: '', score: 0, bestScore: 0 });

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
