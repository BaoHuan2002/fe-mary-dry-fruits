import Title from '../Main/Title/Title_Index';
import images from '@/assets';

import classNames from 'classnames/bind';
import styles from './About.module.scss';

const cx = classNames.bind(styles);

const AboutOutstanding = () => {
    return (
        <div className={cx('about-outstanding-container')}>
            <div className={cx('about-outstanding-wrapper')}>
                <Title
                    heading={'Pure Taste Care'}
                    description={'Savor curated delights, relish personalized service, cherish lasting satisfaction.'}
                />
                <div className={cx('about-outstanding-main')}>
                    <div className={cx('about-outstanding-image')}>
                        <img src={images.about_outstanding_1} alt="img" className={cx('about-outstanding-img')} />
                    </div>
                    <div className={cx('about-outstanding-description')}>
                        <h4 className={cx('about-outstanding-title')}>Quality Care</h4>
                        <p className={cx('about-outstanding-text')}>
                            What sets Maru Dry Fruits apart is not only the premium quality of our products but also the
                            personalized service we offer. Our knowledgeable and friendly staff is always ready to
                            assist you in finding the perfect dry fruits that suit your needs. We believe in building
                            lasting relationships with our customers, and your satisfaction is our top priority.
                        </p>
                    </div>
                </div>
                <div className={cx('about-outstanding-main')}>
                    <div className={cx('about-outstanding-description')}>
                        <h4 className={cx('about-outstanding-title')}>Taste Excellence</h4>
                        <p className={cx('about-outstanding-text')}>
                            Step into Maru Dry Fruits and embark on a journey of flavors, textures, and health benefits.
                            We invite you to explore our store and discover the goodness that nature has to offer in the
                            form of carefully curated dry fruits. Thank you for choosing Maru Dry Fruits – where quality
                            meets tradition, and every bite tells a story of excellence.
                        </p>
                    </div>
                    <div className={cx('about-outstanding-image')}>
                        <img src={images.about_outstanding_2} alt="img" className={cx('about-outstanding-img')} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutOutstanding;
