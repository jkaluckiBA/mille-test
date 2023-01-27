import type { ReactElement } from 'react';

import classes from './NavBar.module.scss';

const NavBar = (): ReactElement => {
  return <nav className={classes.navbar}>MilleTask</nav>;
};

export { NavBar };
