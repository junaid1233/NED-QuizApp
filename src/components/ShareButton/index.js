import React, { Fragment } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';

const ShareButton = () => {
  const handleClick = () => {
    navigator
      .share({
        title: document.title,
        text: 'Check out this quiz app — it rocks!',
        url: 'https://github.com/junaid1233',
      })
      .then(() => console.log('Successfully shared'))
      .catch(error => console.log(error.message));
  };

  return (
    <Fragment>
      {navigator.share ? (
        <Button
          title="Share"
          floated="right"
          size="big"
          circular
          icon="share alternate"
          onClick={handleClick}
        />
      ) : (
        <Modal
          closeIcon
          size="tiny"
          trigger={
            <Button
              title="Share"
              floated="right"
              size="big"
              circular
              icon="share alternate"
            />
          }
        >
          <Modal.Header className="ui center aligned">Share on</Modal.Header>
          <Modal.Content className="ui center aligned container">
           
            <a
              href="https://www.linkedin.com/in/muhammad-junaid-56b051282/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button color="linkedin" size="big">
                <Icon name="linkedin" />
                LinkedIn
              </Button>
            </a>
          </Modal.Content>
        </Modal>
      )}
    </Fragment>
  );
};

export default ShareButton;
