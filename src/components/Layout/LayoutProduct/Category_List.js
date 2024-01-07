import { useEffect, useState } from 'react';
import axios from '@/service/axios';
import SliderProducts from '../Main/BestProducts/Slider_Products';
import Loading from '../Loading/Loading';

import classNames from 'classnames/bind';
import styles from '@/components/Layout/LayoutProduct/Layout_Product.module.scss';

const cx = classNames.bind(styles);

const CategoryList = ({ getIdCategory }) => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('api/product/category');
                if (res && res?.data.length > 0 && res?.data) {
                    setCategory(res?.data);
                } else {
                    setCategory([]);
                }
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleIdCategory = (msd) => {
        if (msd === active) {
            return;
        }
        setLoading(true);
        getIdCategory(msd);
        setActive(msd);
        setTimeout(() => {
            setLoading(false);
        }, 100);
    };

    return (
        <>
            {loading === true ? (
                <Loading />
            ) : (
                <div className={cx('category-list')}>
                    <div className={cx('category-title')}>
                        <h5 className={cx('category-heading')}>Category</h5>
                    </div>
                    <div className={cx('category-filter')}>
                        <div
                            className={active === 0 ? cx('filter-link', 'active') : cx('filter-link')}
                            onClick={() => handleIdCategory(0)}
                        >
                            All
                        </div>
                        {loading === true ? (
                            <Loading />
                        ) : (
                            <>
                                {category.map((item, index) => {
                                    return (
                                        <div
                                            className={
                                                active === item.id ? cx('filter-link', 'active') : cx('filter-link')
                                            }
                                            key={index}
                                            onClick={() => handleIdCategory(item.id)}
                                        >
                                            {item.name}
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </div>
                    <div className={cx('category-title')}>
                        <h5 className={cx('category-heading')}>Best Sellers</h5>
                    </div>
                    <div className={cx('category-silder')}>
                        <SliderProducts slidesToShow={1} />
                    </div>
                </div>
            )}
        </>
    );
};

export default CategoryList;
