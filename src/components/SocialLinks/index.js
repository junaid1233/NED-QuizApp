import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

import { SOCIAL_LINKS } from '../../constants/brand';

const SocialLinks = ({ size = 'large', inverted = false, center = false }) => (
  <div
    className={`social-links${inverted ? ' social-links--inverted' : ''}${center ? ' social-links--center' : ''}`}
    role="navigation"
    aria-label="Social links"
  >
    {SOCIAL_LINKS.map(({ id, label, href, icon }) => (
      <a
        key={id}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`social-link social-link--${id}${inverted ? ' social-link--inverted' : ''}`}
        aria-label={label}
        title={label}
      >
        <Icon name={icon} size={size} />
        <span className="social-link__label">{label}</span>
      </a>
    ))}
  </div>
);

SocialLinks.propTypes = {
  size: PropTypes.string,
  inverted: PropTypes.bool,
  center: PropTypes.bool,
};

export default SocialLinks;
