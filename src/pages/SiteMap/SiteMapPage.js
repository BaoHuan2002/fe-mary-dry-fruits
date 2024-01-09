import { useEffect, useState } from 'react';
import Header from '@/components/Layout/Header/Header_Index';
import Loading from '@/components/Layout/Loading/Loading';

import classNames from 'classnames/bind';
import styles from './SiteMapPage.module.scss';

const cx = classNames.bind(styles);

const SiteMapPage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
        window.scroll(0, 0);
    }, []);
    
    return (
        <>
            {loading ? <Loading /> : null}
            <Header title={'Site Map'} />
            <div className={cx('sitemap-container')}>
                <div className={cx('sitemap-wrapper')}>
                    <h1 className={cx('sitemap-heading')}>MY SITEMAP</h1>
                    <nav className={cx('primary')}>
                        <ul>
                            <li id="home">
                                <a href="https://fe-mary-dry-fruits.vercel.app/">
                                    <i className={cx('fa fa-home')}></i> Home <small>Home Page</small>
                                </a>
                                <ul>
                                    <li>
                                        <a href="/product">
                                            <i className={cx('fa fa-search')}></i> Product <small>Show product</small>
                                        </a>
                                        <ul>
                                            <li>
                                                <a href="/product-detail/{id}">Detail Product</a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li>
                                        <a href="/account">
                                            <i className={cx('fa fa-building')}></i> Account <small>Account User</small>
                                        </a>
                                        <ul>
                                            <li>
                                                <a href="/account/login">Login</a>
                                            </li>
                                            <li>
                                                <a href="/account/register">Register</a>
                                            </li>
                                            <li>
                                                <a href="/account/profile">Profile User</a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li>
                                        <a href="/cart">
                                            <i className={cx('fa fa-rss')}></i>Shopping Cart<small>Cart Checkout</small>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/contact">
                                            <i className={cx('fa fa-rss')}></i>Contact us<small>Contact Page</small>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>

                    <nav className={cx('secondary')}>
                        <ul>
                            <li>
                                <a href="/about">About Us</a>
                            </li>

                            <li>
                                <a href="/sitemap">Sitemap Page</a>
                            </li>
                            <li>
                                <a href="/terms">Terms &amp; Conditions</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default SiteMapPage;
