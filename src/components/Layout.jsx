import React from 'react';
import PropTypes from 'prop-types';
import style from './index.less';

const Layout = props => (
  <div className={style.layout}>
    {props.children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
