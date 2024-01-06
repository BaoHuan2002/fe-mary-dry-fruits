import Button from '@/components/Button/ButtonIndex';
import classNames from 'classnames/bind';
import styles from './Category.module.scss';

const cx = classNames.bind(styles);

function CategoryItem({ image, name, description }) {
    return (
        <div className={cx('category-item-container')}>
            <div className={cx('category-item-overlay')}></div>
            <div className={cx('category-item-outner-img')}>
                <img src={image} alt="category" className={cx('category-item-image')} />
            </div>
            <div className={cx('category-item-main')}>
                <h4 className={cx('category-item-heading')}>{name}</h4>
                <p className={cx('category-item-text')}>{description}</p>
                <div className={cx('category-item-btn')}>
                    <Button text={'View Collection'} link={'/product'} />
                </div>
            </div>
        </div>
    );
}

export default CategoryItem;
