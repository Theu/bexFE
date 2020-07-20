import React from 'react';
import logo from '../../assets/berlinoexplorer.png';
import Menu from './menu/Menu';
import styles from './header.module.scss';

const BEX_MENU = [
    'log in',
    'ABOUT US',
    'ITINERARI',
    'BLOG',
    'PROJECTS',
    'CONTATTI',
];
const Header = () => (
    <div className={styles.headerWrapper}>
        <img src={logo} alt="Berlino Explorer" className={styles.logo} />
        <div className={styles.navigationWrapper}>
            <Menu menuList={BEX_MENU} />
            <div className={styles.search} />
        </div>
    </div>
);

export default Header;