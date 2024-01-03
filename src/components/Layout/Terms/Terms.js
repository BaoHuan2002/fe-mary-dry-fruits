import classNames from 'classnames/bind';
import styles from './Terms.module.scss';
import Title from '../Main/Title/Title_Index';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';

const cx = classNames.bind(styles);

const Terms = () => {
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
            <div className={cx('terms-container')}>
                <div className={cx('terms-wrapper')}>
                    <Title heading={'Terms of Services'} description={'These are our terms of service.'} />
                    <h3 className={cx('terms-heading')}>
                        Welcome to Maru Dry Fruits! By accessing and using our website, you agree to comply with and be
                        bound by the following terms and conditions. Please read these terms carefully before using our
                        services.
                    </h3>
                    <div className={cx('terms-item')}>
                        <h4 className={cx('terms-title')}>1. Acceptance of Terms:</h4>
                        <p className={cx('terms-text')}>
                            By using Maru Dry Fruits' services, you agree to these terms and conditions. If you do not
                            agree with any part of these terms, please do not use our website.
                        </p>
                    </div>
                    <div className={cx('terms-item')}>
                        <h4 className={cx('terms-title')}>2. Use of the Website:</h4>
                        <p className={cx('terms-text')}>
                            You agree to use our website for lawful purposes and in a way that does not infringe on the
                            rights of, or restrict or inhibit the use and enjoyment of, this site by any third party.
                        </p>
                    </div>
                    <div className={cx('terms-item')}>
                        <h4 className={cx('terms-title')}>3. Product Information:</h4>
                        <p className={cx('terms-text')}>
                            While we strive to provide accurate product information, Maru Dry Fruits does not warrant
                            that product descriptions or other content on the site are accurate, complete, reliable,
                            current, or error-free. All product offerings are subject to availability.
                        </p>
                    </div>
                    <div className={cx('terms-item')}>
                        <h4 className={cx('terms-title')}>4. Privacy Policy:</h4>
                        <p className={cx('terms-text')}>
                            Your use of our website is also governed by our Privacy Policy. Please review our Privacy
                            Policy, which outlines our practices concerning the collection, use, and sharing of your
                            information.
                        </p>
                    </div>
                    <div className={cx('terms-item')}>
                        <h4 className={cx('terms-title')}>5. Intellectual Property:</h4>
                        <p className={cx('terms-text')}>
                            All content on this site, including but not limited to text, graphics, logos, images, audio
                            clips, digital downloads, and software, is the property of Maru Dry Fruits or its content
                            suppliers and is protected by international copyright laws.
                        </p>
                    </div>
                    <div className={cx('terms-item')}>
                        <h4 className={cx('terms-title')}>6. Links to Third-Party Websites:</h4>
                        <p className={cx('terms-text')}>
                            Our website may contain links to third-party websites. These links are provided for your
                            convenience. Maru Dry Fruits has no control over the content of third-party websites and is
                            not responsible for their content or accuracy.
                        </p>
                    </div>
                    <div className={cx('terms-item')}>
                        <h4 className={cx('terms-title')}>7. Changes to Terms:</h4>
                        <p className={cx('terms-text')}>
                            Maru Dry Fruits reserves the right to change these terms and conditions at any time. Your
                            continued use of the website following any changes constitutes your acceptance of those
                            changes.
                        </p>
                    </div>
                    <div className={cx('terms-item')}>
                        <h4 className={cx('terms-title')}>8. Contact Information:</h4>
                        <p className={cx('terms-text')}>
                            If you have any questions or concerns about these terms and conditions, please contact us at
                            <Link to="/contact" className={cx('terms-email')}>
                                contact@marudryfruits.com
                            </Link>
                        </p>
                    </div>

                    <h3 className={cx('terms-thank')}>
                        Thank you for choosing Maru Dry Fruits. We appreciate your trust and look forward to serving you
                        with the finest dry fruits and exceptional service.
                    </h3>
                </div>
            </div>
        </>
    );
};

export default Terms;
