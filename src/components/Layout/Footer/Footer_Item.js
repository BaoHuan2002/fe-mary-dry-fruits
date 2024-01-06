import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function FooterItem({ title, item_1, item_2, item_3, item_4 }) {
    return (
        <div className={cx('footer-item')}>
            <h4 className={cx('footer-item-title')}>{title}</h4>
            <ul className={cx('footer-item-wrapper')}>
                <Link to={item_1.link} className={cx('footer-item-child')}>
                    {item_1.name}
                </Link>
                <Link to={item_2.link} className={cx('footer-item-child')}>
                    {item_2.name}
                </Link>
                <Link to={item_3.link} className={cx('footer-item-child')}>
                    {item_3.name}
                </Link>
                <Link to={item_4.link} className={cx('footer-item-child')}>
                    {item_4.name}
                </Link>
            </ul>
        </div>
    );
}

export default FooterItem;
