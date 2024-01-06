import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import classNames from 'classnames/bind';
import styles from './Slider.module.scss';

const cx = classNames.bind(styles);

function SliderItem({ banners }) {
    const [slide, setSlide] = useState(null);

    const settings = {
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        prevArrow: <></>,
        nextArrow: <></>,
    };

    const previous = () => {
        if (slide) {
            slide.slickPrev();
        }
    };

    const next = () => {
        if (slide) {
            slide.slickNext();
        }
    };

    return (
        <div>
            <Slider ref={(c) => setSlide(c)} {...settings}>
                {banners.map((item, index) => {
                    return (
                        <div key={index} className={cx('slider-wrapper')}>
                            <div className={cx('slider-outner-image')}>
                                <img src={item.image} alt={`Slider ${index + 1}`} className={cx('slider-image')} />
                            </div>
                            <div className={cx('slider-content')}>
                                <div className={cx('slider-heading')}>{item.title}</div>
                                <div className={cx('slider-text')}>{item.description}</div>
                                <div className={cx('slider-discount')}></div>
                            </div>
                        </div>
                    );
                })}
            </Slider>
            <div className={cx('slider-directional')}>
                <button className={cx('slider-back')} onClick={previous}></button>
                <button className={cx('slider-next')} onClick={next}></button>
            </div>
        </div>
    );
}

export default SliderItem;
