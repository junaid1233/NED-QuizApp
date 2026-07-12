import React, { useEffect, useState } from 'react';
import { Menu, Button } from 'semantic-ui-react';

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
    <Menu stackable inverted color="blue">
      <Menu.Item header>
        <h2 style={{ margin: 0 }}>NED MasterPrep</h2>
      </Menu.Item>
      <Menu.Item>
        <span style={{ fontSize: '0.85em', opacity: 0.85 }}>
          Master&apos;s Test Prep · CIS Engineering
        </span>
      </Menu.Item>
      {promptEvent && !isAppInstalled && (
        <Menu.Item position="right">
          <Button
            color="teal"
            icon="download"
            labelPosition="left"
            content="Install App"
            onClick={installApp}
          />
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Header;
