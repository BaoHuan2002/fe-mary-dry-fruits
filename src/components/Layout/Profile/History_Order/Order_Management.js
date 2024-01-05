import Button from '@/components/Button/ButtonIndex';
import { useEffect, useState } from 'react';
import axios from '@/service/axios';
import moment from 'moment';
import Loading from '../../Loading/Loading';

import classNames from 'classnames/bind';
import styles from './Order.module.scss';

const cx = classNames.bind(styles);

const OrderComponent = ({ index, time }) => {
    const [listOrders, setListOrders] = useState([]);
    const [orderDetail, setOrderDetail] = useState([]);
    const [histotyStatus, setHistoryStatus] = useState(false);
    const [lastPage, setLastPage] = useState(Array.from({ length: 1 }, (_, index) => index + 1));
    const [currentPage, setCurrentPage] = useState(1);
    const [isTrue, setIsTrue] = useState(true);
    const [loading, setLoading] = useState(true);

    const handleGetHistory = (order_id) => {
        let order = listOrders.find((item) => item.id === order_id);
        setOrderDetail(order);
        setHistoryStatus(true);
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

    const textStatus = (status) => {
        switch (status) {
            case 1:
                return 'Pending';
            case 2:
                return 'Prepare';
            case 3:
                return 'Delivery';
            case 4:
                return 'Complete';
            case 5:
                return 'Cancel';
            default:
                return null;
        }
    };

    const fetchData = async (currentPage) => {
        try {
            const res = await axios.post('/api/order/history_order', { page: currentPage });
            if (res && res.data) {
                const data = res.data.data || res.data;
                const lastPage = res.data.last_page;
                setListOrders(data);
                setLastPage(Array.from({ length: lastPage }, (_, index) => index + 1));
            } else {
                setListOrders([]);
            }
        } catch (error) {
            console.log('error', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isTrue) {
            return;
        }
        fetchData(currentPage);
    }, [currentPage]);

    return (
        <>
            {loading ? <Loading /> : null}
            <div className={cx('container-order-manage')}>
                <h2 className={cx('profile-detail-heading')}>List Order</h2>
                <table className={cx('order-table')}>
                    <thead>
                        <tr className={cx('order-table-title')}>
                            <th>Order #</th>
                            <th>Total</th>
                            <th>Status Order</th>
                            <th>Payment Status</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOrders.map((item, index) => {
                            return (
                                <tr key={index} className={cx('order-table-result')}>
                                    <td>{item.id}</td>
                                    <td>${item.total}</td>
                                    <td>{textStatus(item.status)}</td>
                                    <td>{item.transaction_status === 1 ? 'Paid' : 'Unpaid'}</td>
                                    <td>{moment(item.created_at).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                    <td>
                                        <span
                                            onClick={() => handleGetHistory(item.id)}
                                            className={cx('order-table-btn')}
                                        >
                                            <Button text={'Details'} blackText />
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <div className={cx('page-change')}>
                    <ul className={cx('page-practive')}>
                        <li className={cx('left')} onClick={() => changePage(currentPage - 1)}>
                            &lsaquo;
                        </li>

                        {lastPage.map((pageNumber) => {
                            console.log(pageNumber, currentPage);
                            return (
                                <li
                                    onClick={() => changePage(pageNumber)}
                                    key={pageNumber}
                                    className={cx({ choose: pageNumber === currentPage })}
                                >
                                    {pageNumber}
                                </li>
                            );
                        })}

                        <li className={cx('right')} onClick={() => changePage(currentPage + 1)}>
                            &rsaquo;
                        </li>
                    </ul>
                </div>

                {histotyStatus ? (
                    <div className={cx('popup-container')}>
                        <div className={cx('history-order-overlay')}></div>
                        <div className={cx('history-order-container')}>
                            <div className={cx('history-order-index')}>
                                <span> Order #{orderDetail.id}</span>
                                <span>
                                    Create ad: {moment(orderDetail.created_at).format('MMMM Do YYYY, h:mm:ss a')}
                                </span>
                            </div>
                            <div className={cx('history-order-title')}>
                                <span className={cx('history-order-heading')}>Item Details</span>
                            </div>
                            <div className={cx('history-order-details')}>
                                <table className={cx('order-table')}>
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Size</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderDetail.order_items.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.product.name}</td>
                                                    <td>${item.product.price}/100gram</td>
                                                    <td>{item.quantity}</td>
                                                    <td>
                                                        {item.weight < 1000
                                                            ? item.weight + 'gram'
                                                            : item.weight / 1000 + 'kg'}
                                                    </td>
                                                    <td>${item.product.price * item.weight /100}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className={cx('history-order-result')}>
                                <span className={cx('history-order-heading')}>Orther Details</span>

                                <div className={cx('history-order-item')}>
                                    <span className={cx('history-order-sup')}>Status Order</span>
                                    <div className={cx('history-order-des')}>
                                        <span>:</span>
                                        <span>{textStatus(orderDetail.status)}</span>
                                    </div>
                                </div>
                                <div className={cx('history-order-item')}>
                                    <span className={cx('history-order-sup')}>SubTotal</span>
                                    <div className={cx('history-order-des')}>
                                        <span>:</span>
                                        <span>${orderDetail.subtotal}</span>
                                    </div>
                                </div>
                                {orderDetail.discount ? (
                                    <div className={cx('history-order-item')}>
                                        <span className={cx('history-order-sup')}>Discount Amount</span>
                                        <div className={cx('history-order-des')}>
                                            <span>:</span>
                                            <span>-{orderDetail.discount}%</span>
                                        </div>
                                    </div>
                                ) : (
                                    ''
                                )}
                                <div className={cx('history-order-item')}>
                                    <span className={cx('history-order-sup')}>Total Price</span>
                                    <div className={cx('history-order-des')}>
                                        <span>:</span>
                                        <span>${orderDetail.total}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('history-order-btn')} onClick={() => setHistoryStatus(false)}>
                                <Button text={'Close'} blackText />
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    );
};

export default OrderComponent;
