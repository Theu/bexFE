import React from 'react';
import styles from './menu.module.scss';

export const Menu = ({ menuList }) => (
    menuList.map(singleButton => (
        <div className={styles.menuItem}>
            {(singleButton.toUpperCase())}
        </div>
    ))
);

export default Menu;