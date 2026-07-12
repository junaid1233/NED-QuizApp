import React from 'react';
import { Segment, Container } from 'semantic-ui-react';

const Footer = () => (
  <Segment inverted vertical style={{ margin: '2em 0 0 0', padding: '1.5em 0' }}>
    <Container textAlign="center">
      <p style={{ margin: 0, fontSize: '0.85em', opacity: 0.8 }}>
        NED MasterPrep — Independent preparation platform.
      </p>
      <p style={{ margin: '0.5em 0 0', fontSize: '0.75em', opacity: 0.6 }}>
        Not officially affiliated with or endorsed by NED University.
        Practice questions are unverified unless marked otherwise.
      </p>
    </Container>
  </Segment>
);

export default Footer;
