import CategoryItem from './Category_Item';
import images from '@/assets';

import classNames from 'classnames/bind';
import styles from './Category.module.scss';

const cx = classNames.bind(styles);

function CategoryProduct() {
    return (
        <div className={cx('category-container')}>
            <div className={cx('category-wrapper')}>
                <div className={cx('category-item', 'item-1')}>
                    <CategoryItem image={images.category_1} name={'Dry Fruit'} description={'List Of Dried Fruits'} />
                </div>
                <div className={cx('category-item')}>
                    <CategoryItem image={images.category_2} name={'Dry Seed'} description={'List Of Dried Nuts'} />
                </div>
                <div className={cx('category-item', 'item-3')}>
                    <CategoryItem image={images.category_3} name={'Gift Box'} description={'List Of Gift Boxes'} />
                </div>
            </div>
        </div>
    );
}

export default CategoryProduct;
