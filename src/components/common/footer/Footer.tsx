import type { ReactElement } from 'react';

import classes from './Footer.module.scss';

const CURRENT_YEAR = new Date().getFullYear();

const Footer = (): ReactElement => {
  return <footer className={classes.footer}>Jakub Kałucki © {CURRENT_YEAR}</footer>;
};

export { Footer };
