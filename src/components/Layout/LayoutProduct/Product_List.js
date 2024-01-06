import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import ProductItem from '@/pages/Product/Product_Item';
import axios from '@/service/axios';
import Button from '@/components/Button/ButtonIndex';

import classNames from 'classnames/bind';
import styles from '@/components/Layout/LayoutProduct/Layout_Product.module.scss';

const cx = classNames.bind(styles);

const ProductList = ({ categoryId }) => {
    const [product, setProduct] = useState([]);
    const [drop, setDrop] = useState(false);
    const [isOneSecond, setIsOneSecond] = useState(true);

    const [lastPage, setLastPage] = useState(Array.from({ length: 1 }, (_, index) => index + 1));
    const [currentPage, setCurrentPage] = useState(1);
    const [oldCategoryID, setOldCategoryID] = useState(0);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(0);
    const [isTrue, setIsTrue] = useState(true);

    const handleDrop = () => {
        setDrop(!drop);
    };

    const changePage = (pageNumber) => {
        if (pageNumber < 1) {
            setCurrentPage(1);
            setIsTrue(false);
            return;
        }
        if (pageNumber > lastPage.length) {
            setCurrentPage(lastPage.length);
            setIsTrue(false);
            return;
        }
        setCurrentPage(pageNumber);
        setIsTrue(true);
    };

    const handleSearch = debounce((e) => {
        let term = e.target.value;
        setSearch(term);
    }, 400);

    const handleFilter = (e) => {
        setFilter(e);
        setIsOneSecond(false);
        setTimeout(() => {
            setIsOneSecond(true);
        }, 1000);
    };

    const fetchData = async (categoryId, currentPage, search, filter) => {
        try {
            let page = categoryId !== oldCategoryID ? 1 : currentPage;
            const res = await axios.post('api/product/allproduct', { category: categoryId, page, search, filter });
            if (res && res.data) {
                const data = res.data.data || res.data;
                const lastPage = res.data.last_page;
                setProduct(data);
                setLastPage(Array.from({ length: lastPage }, (_, index) => index + 1));
            }
        } catch (error) {
           
        }
    };
    const handleClear = () => {
        setSearch('');
        document.querySelector('#seacrh').value = '';
    };
    useEffect(() => {
        if (!isTrue) {
            return;
        }
        if (categoryId !== oldCategoryID) {
            fetchData(categoryId, 1, '', 0);
            setCurrentPage(1);
            setOldCategoryID(categoryId);
            setFilter(0);
            setSearch('');
            document.querySelector('#seacrh').value = '';
        } else {
            fetchData(categoryId, currentPage, search, filter);
        }
        window.scroll(0, 0);
    }, [categoryId, currentPage, search, filter]);

    return (
        <div className={cx('product-list')}>
            <div className={cx('product-filter-search')}>
                <div className={cx('product-search')}>
                    <h4 className={cx('product-heading')}>Search</h4>
                    <input
                        id="seacrh"
                        type="text"
                        className={cx('product-item-search')}
                        onChange={(e) => handleSearch(e)}
                        placeholder="Enter name product"
                        onKeyUp={(e) => handleSearch(e)}
                    />
                    <span onClick={() => handleClear()} className={cx('product-item-clear')}>
                        <FontAwesomeIcon icon={icon({ name: 'xmark', style: 'solid' })} />
                    </span>
                </div>
                <div className={cx('product-filter')}>
                    <h4 className={cx('product-heading')}>Sort by </h4>
                    <div className={cx('product-filter-btn')} onClick={handleDrop}>
                        <Button text={'Featured'} blackText />
                        {drop && isOneSecond && (
                            <div className={cx('filter-drop')}>
                                <ul>
                                    {' '}
                                    <li
                                        className={cx('filter-item')}
                                        value="0"
                                        onClick={(e) => handleFilter(e.target.value)}
                                    >
                                        All
                                    </li>
                                    <li
                                        className={cx('filter-item')}
                                        value="1"
                                        onClick={(e) => handleFilter(e.target.value)}
                                    >
                                        Price, low to high
                                    </li>
                                    <li
                                        className={cx('filter-item')}
                                        value="2"
                                        onClick={(e) => handleFilter(e.target.value)}
                                    >
                                        Price, high to low
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={cx('page-current')}>
                {product.map((item, index) => {
                    return (
                        <div className={cx('product-item')} key={index}>
                            <ProductItem
                                name={item.name}
                                price={item.price}
                                rating={item.star}
                                image={item.image}
                                id={item.id}
                                star={item.star}
                                link={'/product-detail/' + item.id}
                            />
                        </div>
                    );
                })}
                <div className={cx('page-change')}>
                    <ul className={cx('page-practive')}>
                        <li className={cx('left')} onClick={() => changePage(currentPage - 1)}>
                            &lsaquo;
                        </li>

                        {lastPage.map((pageNumber) => (
                            <li
                                onClick={() => changePage(pageNumber)}
                                key={pageNumber}
                                className={cx({ choose: pageNumber === currentPage })}
                            >
                                {pageNumber}
                            </li>
                        ))}

                        <li className={cx('right')} onClick={() => changePage(currentPage + 1)} disabled={true}>
                            &rsaquo;
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
