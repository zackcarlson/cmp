import { h } from 'preact';
import PropTypes from 'prop-types';
import cx from 'classnames';

import style from './button.less';

export const Button = (
  { children, onClick, invert, name, ...rest },
  { theme },
) => {
  const styles = invert
    ? {
        borderColor: theme.colorPrimary,
        color: theme.colorPrimary,
        backgroundColor: theme.colorBackground,
      }
    : {
        borderColor: theme.colorPrimary,
        color: 'white',
        backgroundColor: theme.colorPrimary,
      };
  return (
    <button
      name={name}
      class={cx({
        [style.button]: true,
        [rest.class]: !!rest.class,
        [style.invert]: invert,
      })}
      style={{ ...styles, fontFamily: theme.fontFamily }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.contextTypes = {
  theme: PropTypes.object.isRequired,
};
