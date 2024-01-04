/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from '@/service/axios';
import classNames from 'classnames/bind';
import styles from './Detail.module.scss';
import BestProductsIndex from '../Main/BestProducts/Best_Product_Index';
import DetailReview from './DetailReview/Detail_Review';
import DetailComment from './DetailReview/Detail_Comment';
import CommentProduct from './CommetProduct/CommentProduct';
import { useShoppingContext } from '@/contexts/Shopping_Context';
import { useParams } from 'react-router-dom';
import { StarCheck, Star } from '@/icons';

const cx = classNames.bind(styles);

const DetailItem = () => {
    const id = useParams();

    const { addCartItem } = useShoppingContext();
    const [zoneDetails, setZoneDetails] = useState(1);
    const [quantity, setQuantity] = useState(1);
    const [item, setItem] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [checkPermision, setCheckPermision] = useState(false);
    const [textNotifi, setTextNotifi] = useState('');

    const handleCheckActive = (index) => {
        setActiveTab(index);
        setZoneDetails(index + 1);
    };

    const handleSelectWeight = (e) => {
        setItem({ ...item, weight: parseInt(e.target.value) });
    };

    const handleCheckPermission = async (id) => {
        try {
            let res = await axios.post('/api/review/check', { product_id: id });
            let statusCode = parseInt(res.status_code);
            if (statusCode === 901 || statusCode === 902 || statusCode === 903 || statusCode === 904) {
                setTextNotifi(res.message);
                setCheckPermision(false);
                return;
            }
            setCheckPermision(true);
        } catch (error) {
            console.error('Comment error:', error);
        }
    };

    const fetchData = async () => {
        try {
            const res = await axios.post('api/product/product_details', { product_id: id });
            if (res && res.data) {
                let id = res.data[0].id;
                setItem({ ...res.data[0], weight: 250 });
                handleCheckPermission(id);
            } else {
                setItem({});
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
        setZoneDetails(1);
        setActiveTab(0);
        window.scrollTo(0, 0);
        return;
    }, [id]);

    const addCartItemWithQuantity = () => {
        const itemWithQuantity = { ...item, addQuantity: quantity };
        addCartItem(itemWithQuantity);
    };

    return (
        <div className={cx('detail-container')}>
            <div className={cx('detail-wrapper')}>
                <div className={cx('detail-main')}>
                    <div className={cx('detail-outner-image')}>
                        <img src={item.image} alt="detailProduct" className={cx('detail-image')} />
                    </div>
                    <div className={cx('detail-info')}>
                        <h2 className={cx('detail-info-name')}>{item.name}</h2>
                        <div className={cx('detail-info-star')}>
                            {Array.from({ length: 5 }).map((_, index) =>
                                index < item.star ? (
                                    <StarCheck key={index} className={cx('check')} />
                                ) : (
                                    <Star key={index} className={cx('no-check')} />
                                ),
                            )}
                        </div>

                        <p className={cx('detail-info-description')}>{item.sumary}</p>

                        <div className={cx('detail-info-price')}>
                            <h6 className={cx('detail-info-title')}>Price:</h6>
                            <span className={cx('detail-info-price-amount')}>${item.price}/100gram</span>
                        </div>
                        <div className={cx('detail-info-weight')}>
                            <h6 className={cx('detail-info-title')}>Weight:</h6>
                            {item.weight_tags
                                ? item.weight_tags.map((element) => (
                                      <button
                                          key={element.id}
                                          className={cx('detail-info-btn', { active: item.weight === element.mass })}
                                          onClick={(e) => handleSelectWeight(e)}
                                          value={element.mass}
                                      >
                                          {element.mass < 1000 ? element.mass + 'gram' : element.mass / 1000 + 'kg'}
                                      </button>
                                  ))
                                : ''}
                        </div>
                        <div className={cx('detail-info-quantity')}>
                            <h6 className={cx('detail-info-title')}>Quantity:</h6>
                            <div className={cx('detail-info-action')}>
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className={cx('detail-info-btn-action')}
                                >
                                    <span className={cx('detail-apart')}>-</span>
                                </button>
                                <p className={cx('detail-info-amount')}>{quantity}</p>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className={cx('detail-info-btn-action')}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className={cx('detail-info-add-cart')}>
                            <button className={cx('detail-info-btn')} onClick={addCartItemWithQuantity}>
                                Add Cart
                            </button>
                        </div>
                    </div>
                </div>

                <div className={cx('detail-description')}>
                    {['Product Description', 'Nutrition Label', 'Reviewer'].map((title, index) => (
                        <button
                            key={index}
                            className={cx('detail-description-btn', { active: activeTab === index })}
                            onClick={() => handleCheckActive(index)}
                        >
                            {title}
                        </button>
                    ))}
                </div>

                <div className={cx('detail-content')}>
                    {zoneDetails === 1 ? (
                        <div dangerouslySetInnerHTML={{ __html: item.description }} className={cx('plr-40')} />
                    ) : (
                        ''
                    )}
                    {zoneDetails === 2 ? <div dangerouslySetInnerHTML={{ __html: item.nutrition_detail }} /> : ''}
                    {zoneDetails === 3 ? (
                        <div className={cx('detail-evaluate')}>
                            <DetailReview star={item.star} />
                            <div className={cx('detail-form')}>
                                {item.reviews.length > 0 ? (
                                    item.reviews.map((element, index) => (
                                        <DetailComment
                                            content={element.content}
                                            star={element.star}
                                            key={index}
                                            userName={element.user.full_name}
                                        />
                                    ))
                                ) : (
                                    <div className={cx('container-no-coment')}>
                                        <h2 className={cx('title-no-coment')}>This product has no comments yet</h2>
                                        {textNotifi}
                                    </div>
                                )}
                            </div>
                            {checkPermision === true ? (
                                <CommentProduct
                                    id={item.id}
                                    permission={checkPermision}
                                    text={textNotifi}
                                    reload={fetchData}
                                />
                            ) : (
                                ''
                            )}
                        </div>
                    ) : (
                        ''
                    )}
                </div>

                <div className={cx('container-slider')}>
                    <BestProductsIndex />
                </div>
            </div>
        </div>
    );
};

export default DetailItem;
