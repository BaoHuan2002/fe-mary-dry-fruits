import { useState } from 'react';
import CategoryList from '@/components/Layout/LayoutProduct/Category_List';
import ProductList from '@/components/Layout/LayoutProduct/Product_List';

import classNames from 'classnames/bind';
import styles from '../LayoutProduct/Layout_Product.module.scss';

const cx = classNames.bind(styles);

const LayoutProduct = () => {
    const [categoryId, setCategoryID] = useState(0);

    const getIdCategory = (msd) => {
        setCategoryID(msd);
    };

    return (
        <div className={cx('category-container')}>
            <div className={cx('category')}>
                <CategoryList getIdCategory={getIdCategory} />
                <ProductList categoryId={categoryId} />
            </div>
        </div>
    );
};

export default LayoutProduct;
