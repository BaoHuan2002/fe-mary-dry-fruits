import TitleIndex from '../Title/Title_Index';
import PremiumProductItem from './Premium_Product_Item';

import classNames from 'classnames/bind';
import styles from './Premium_Product.module.scss';

const cx = classNames.bind(styles);

const PremiumProductsIndex = ({ premiumProducts }) => {
    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('premium-product-title')}>
                    <TitleIndex
                        heading={'Premium Quality Products'}
                        description={'Explore premium quality products for the best enjoyment experience.'}
                    />
                </div>
                <div className={cx('premium-product-wrapper')}>
                    {premiumProducts.map((item) => {
                        return (
                            <div key={item.id}>
                                <PremiumProductItem image={item.image} name={item.name} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PremiumProductsIndex;
