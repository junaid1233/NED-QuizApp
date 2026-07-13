import React, { useEffect, useState } from 'react';

import BrandMark from '../BrandMark';

const Header = () => {
  const [promptEvent, setPromptEvent] = useState(null);
  const [appAccepted, setAppAccepted] = useState(false);

  const isAppInstalled =
    window.matchMedia('(display-mode: standalone)').matches || appAccepted;

  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      setPromptEvent(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const installApp = () => {
    if (!promptEvent) return;
    promptEvent.prompt();
    promptEvent.userChoice.then(result => {
      if (result.outcome === 'accepted') {
        setAppAccepted(true);
      }
    });
  };

  return (
    <header className="app-header">
      <BrandMark compact />
      <div className="app-header__actions">
        {promptEvent && !isAppInstalled && (
          <button type="button" className="app-header__install" onClick={installApp}>
            Install App
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
