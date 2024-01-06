import SliderProducts from './Slider_Products';
import TitleIndex from '../Title/Title_Index';

import classNames from 'classnames/bind';
import styles from './Best_Product.module.scss';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const cx = classNames.bind(styles);

function BestProductsIndex({products}) {
    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <TitleIndex
                    heading={'Best Products'}
                    description={'Best rated products in our store.'}
                />
                <div className={cx('product-home-show')}>
                    <div className={cx('product-home-container')}>
                        <div className={cx('product-home-wrapper')}>
                            <SliderProducts products={products}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BestProductsIndex;
