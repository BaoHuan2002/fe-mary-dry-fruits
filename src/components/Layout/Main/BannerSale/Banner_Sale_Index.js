import Button from '@/components/Button/ButtonIndex';
import classNames from 'classnames/bind';
import styles from './Banner_Sale_Index.module.scss';

const cx = classNames.bind(styles);

const ParallaxBanner = ({ banners }) => {
    return (
        <div>
            {banners.map((item, index) => {
                const urlParallaxBanner = {
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                };

                return (
                    <div className={cx('container')} key={index}>
                        <div className={cx('parallax-banner-container')}>
                            <div className={cx('parallax-banner-image')} style={urlParallaxBanner}></div>
                        </div>
                        <div className={cx('parallax-banner__outner')}>
                            <div className={cx('parallax-banner__wrapper')}>
                                <div className={cx('parallax-banner__title')}>Safe Food</div>
                                <div className={cx('parallax-banner__detail')}>
                                    <span>{item.title}</span>
                                    <span>On all nuts and dried fruit</span>
                                </div>
                                <div className={cx('parallax-banner__text')}>
                                    <p>{item.description}</p>
                                </div>
                                <div className={cx('parallax-banner__btn')}>
                                    <Button text={'View more'} link={'/product'} primary />
                                    <Button text={'Shop now'} link={'/product'} normal />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const NormalBanner = ({ banners }) => {
    return (
        <div>
            {banners.map((item, index) => {
                const urlNormalBanner = {
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                };

                return (
                    <div className={cx('container')} key={index}>
                        <div className={cx('normal-banner-container')} style={urlNormalBanner}>
                            <div className={cx('normal-banner__wrapper')}>
                                <div className={cx('normal-banner__title')}>{item.title}</div>
                                <div className={cx('normal-banner__detail')}>
                                    <span className={cx('normal-banner__sale')}>{item.description}</span>
                                    <span className={cx('normal-banner__description')}>ALL PRODUCTS</span>
                                </div>
                                <div className={cx('normal-banner__btn')}>
                                    <Button text={'Shop now'} link={'/product'} normal />
                                    <Button text={'View more'} link={'/product'} primary />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export { ParallaxBanner, NormalBanner };
