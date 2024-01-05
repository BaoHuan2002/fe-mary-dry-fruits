import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import FooterItem from './Footer_Item';
import images from '@/assets';

const cx = classNames.bind(styles);

function FooterIndex() {
    const backGroundImage = {
        backgroundImage: `url(${images.footer})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div className={cx('footer-container')}>
            <div className={cx('footer-back-ground')} style={backGroundImage}>
                <div className={cx('footer-main')}>
                    <ul className={cx('footer-wrapper')}>
                        <h4 className={cx('footer-title')}>About us</h4>
                        <li className={cx('footer-detail')}>
                            <span className={cx('footer-description')}>
                                Welcome to our world of premium dried fruits.
                            </span>
                            <span className={cx('footer-description-none')}>
                                Where quality meets taste in every delightful bite.
                            </span>
                        </li>
                        <li className={cx('footer-outner-btn')}>
                            <Link to="/about-us" className={cx('footer-btn')}>
                                Read More
                            </Link>
                        </li>
                    </ul>

                    <FooterItem
                        title={'Help'}
                        item_1={{ name: 'Search', link: '#' }}
                        item_2={{ name: 'Help', link: '/contact' }}
                        item_3={{ name: 'Privacy Policy', link: '/terms' }}
                        item_4={{ name: 'Shipping Details', link: '/contact' }}
                    />
                    <FooterItem
                        title={'Support'}
                        item_1={{ name: 'Contact us', link: '/contact' }}
                        item_2={{ name: 'About us', link: '/about' }}
                        item_3={{ name: 'Refunds', link: '/contact' }}
                        item_4={{ name: 'Deliveries', link: '/contact' }}
                    />
                    <FooterItem
                        title={'Information'}
                        item_1={{ name: 'Social Network', link: '/contact' }}
                        item_2={{ name: 'Categoty Product', link: '/product' }}
                        item_3={{ name: 'Store Location', link: '/contact' }}
                        item_4={{ name: 'Orders & Returns ', link: '/contact' }}
                    />

                    <ul className={cx('footer-wrapper')}>
                        <h4 className={cx('footer-title')}>Contact us</h4>
                        <li className={cx('footer-information')}>
                            <FontAwesomeIcon
                                icon={icon({ name: 'house', style: 'solid' })}
                                className={cx('footer-icon')}
                            />
                            <span className={cx('footer-information-address')}>
                                <span>35/6 D5 Street</span>
                                <span className={cx('footer-information-district')}>Binh Thanh District</span>
                            </span>
                        </li>
                        <li className={cx('footer-information')}>
                            <FontAwesomeIcon
                                icon={icon({ name: 'phone', style: 'solid' })}
                                className={cx('footer-icon')}
                            />
                            <span>000 - 123 - 456789</span>
                        </li>
                        <li className={cx('footer-information')}>
                            <FontAwesomeIcon
                                icon={icon({ name: 'clock', style: 'solid' })}
                                className={cx('footer-icon')}
                            />
                            <span>9.30AM - 7.30PM</span>
                        </li>
                        <li className={cx('footer-information')}>
                            <FontAwesomeIcon
                                icon={icon({ name: 'envelope', style: 'solid' })}
                                className={cx('footer-icon')}
                            />
                            <span>mail@example.com</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default FooterIndex;
