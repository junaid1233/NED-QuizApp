import React from 'react';

import { BRAND, AUTHOR } from '../../constants/brand';
import SocialLinks from '../SocialLinks';
import BrandMark from '../BrandMark';

const Footer = () => (
  <footer className="app-footer">
    <div className="app-footer__inner">
      <BrandMark compact variant="footer" />
      <p className="app-footer__muted">{BRAND.disclaimer}</p>
      <p className="app-footer__creator">
        Built by{' '}
        <a href="https://junaid-portfolio-mu.vercel.app/" target="_blank" rel="noopener noreferrer">
          {AUTHOR.name}
        </a>
      </p>
      <SocialLinks inverted center />
      <p className="app-footer__copy">
        © {new Date().getFullYear()} {BRAND.name}
      </p>
    </div>
  </footer>
);

export default Footer;
