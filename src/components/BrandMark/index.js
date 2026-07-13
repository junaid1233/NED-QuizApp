import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

import { BRAND } from '../../constants/brand';

const BrandMark = ({ compact = false, variant = 'default' }) => {
  const showTagline = !compact && variant === 'default';

  return (
    <div className={`brand-mark brand-mark--${variant}${compact ? ' brand-mark--compact' : ''}`}>
      <div className="brand-mark__logo" aria-hidden="true">
        <Icon name="graduation cap" />
      </div>
      <div className="brand-mark__text">
        <span className="brand-mark__name">{BRAND.name}</span>
        {showTagline && (
          <span className="brand-mark__tagline">{BRAND.tagline}</span>
        )}
      </div>
    </div>
  );
};

BrandMark.propTypes = {
  compact: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'hero', 'footer']),
};

export default BrandMark;
