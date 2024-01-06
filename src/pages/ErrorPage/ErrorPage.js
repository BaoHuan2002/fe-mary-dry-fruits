import { Link } from 'react-router-dom';
import Header from '@/components/Layout/Header/Header_Index';

import classNames from 'classnames/bind';
import styles from './ErrorPage.module.scss';

const cx = classNames.bind(styles);

const ErrorPage = () => {
    return (
        <>
            <Header />
            <div className={cx('error-page-container')}>
                <h2 className={cx('error-page-title')}>404 Page Not Found</h2>
                <p className={cx('error-page-text')}>
                    The page you requested does not exist. Click <Link to="/" className={cx('error-page-link')}>here</Link> to continue shopping.
                </p>
            </div>
        </>
    );
};

export default ErrorPage;
