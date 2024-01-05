/* eslint-disable no-unused-vars */
import images from '@/assets';
import { useShoppingContext } from '@/contexts/Shopping_Context';
import { useState, useEffect } from 'react';
import { Order, PayOrder } from '@/service/Order_Service';
import { dataUser } from '@/service/User_Service';
import { toast, Flip } from 'react-toastify';
import Loading from '@/components/Layout/Loading/Loading';
import { useNavigate, useParams } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Shopping_Cart.module.scss';

const cx = classNames.bind(styles);

function ShoppingCartBill() {
    const navigate = useNavigate();
    const params = useParams();
    const { totalPrice, cartItems, clearCart } = useShoppingContext();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState('');
    
    const [edit, setEdit] = useState(false);
    
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [fullName, setFullName] = useState('');
    
    const [selectedMethod, setSelectedMethod] = useState(1);


    const orderItems = cartItems.map((item) => ({
        product_id: item.id,
        price: item.price,
        weight: item.weight,
        quantity: item.addQuantity,
    }));

    const data_order = {
        full_name: fullName,
        address: address,
        phone: phone,
        transaction: selectedMethod,
        subtotal: totalPrice,
        order_items: orderItems,
        total: totalPrice,
    };

    function areAllValuesNotEmpty(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && !obj[key]) {
                return false;
            }
        }
        return true;
    }

    const sendOrder = async (dataSent) => {
        if (cartItems.length > 0) {
            try {
                setLoading(true);
                const resOrder = await Order(dataSent);
                if (resOrder.orderResponse.status_code === '910') {
                    setLoading(false);
                    toast.error(resOrder.orderResponse.message, {
                        transition: Flip,
                        autoClose: 2000,
                    });
                    return;
                }
                if (resOrder && resOrder.success === true) {
                    clearCart();
                    setLoading(false);
                    toast.success('Successful purchase', {
                        transition: Flip,
                        autoClose: 2000,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            toast.error('There are no products in your shopping cart', {
                transition: Flip,
                autoClose: 2000,
            });
        }
    };

    const handlePayBill = async (totalPrice) => {
        if (!areAllValuesNotEmpty(data_order)) {
            toast.error('Please double check the information to make sure it is not empty', {
                transition: Flip,
                autoClose: 2000,
            });
            return;
        }
        // send api if method COD
        if (selectedMethod === 1) {
            sendOrder(data_order);
            return;
        }

        //handle method VNPAY
        if (selectedMethod === 2) {
            if (cartItems.length > 0) {
                const newTotal = totalPrice * 20000;
                console.log(newTotal);
                try {
                    const res = await PayOrder(newTotal);
                    // handle errors
                    if (res.response.status_code === '910') {
                        setLoading(false);
                        toast.error(res.response.message, {
                            transition: Flip,
                            autoClose: 2000,
                        });
                        return;
                    }

                    if (res && res.success === true) {
                        const data_order_JSON = JSON.stringify({
                            ...data_order,
                            status_code: res.response.unique_code,
                        });
                        const redirectUrl = res.response.url;
                        localStorage.setItem('data_order', data_order_JSON);
                        window.location.href = redirectUrl;
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                toast.error('There are no products in your shopping cart', {
                    transition: Flip,
                    autoClose: 2000,
                });
            }

            return;
        }
    };

    const handleMethodChange = (event) => {
        parseInt();
        setSelectedMethod(parseInt(event.target.value));
    };

    const handleEditInfo = () => {
        setEdit(true);
        setAddress(data.address);
        setPhone(data.phone);
        setFullName(data.full_name);
    };

    const handleCheckPhone = (value) => {
        const cleanedNumber = value.replace(/[^\d+]/g, '');
        if (cleanedNumber.length <= 11) {
            setPhone(cleanedNumber);
        }
    };

    const handleCheckValid = () => {
        if (!fullName || !phone || !address) {
            setAddress(data.address);
            setPhone(data.phone);
            setFullName(data.full_name);
        }
        setEdit(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await dataUser();
                if (res && res.success === true && res.response.status === 1) {
                    setData(res.response);
                    setAddress(res.response.address);
                    setPhone(res.response.phone);
                    setFullName(res.response.full_name);
                }else{
                    navigate('/account/login');
                }
            } catch (error) {
                navigate('/account/login');
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setLoading(true);
        let dataSent = JSON.parse(localStorage.getItem('data_order'));
        let status = dataSent && dataSent.status_code ? dataSent.status_code : '';
        let isTrue = true;
        if (params.status === status) {
            sendOrder(dataSent);
            localStorage.removeItem('data_order');
            isTrue = false;
            console.log(false);
        }
        if (params.status === '2') {
            toast.error('Payment errros', {
                transition: Flip,
                autoClose: 2000,
            });
            localStorage.removeItem('data_order');
            isTrue = false;
            console.log(false);
        }

        if (params.status && isTrue) {
            console.log(true);
            navigate('/*');
        }
        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <>
            {loading ? <Loading loading={loading} /> : null}
            {edit === false ? (
                <div className={cx('cart-info-user')}>
                    <div className={cx('cart-user')}>
                        <div className={cx('cart-user-heading')}>
                            <p>Order Information</p>
                        </div>
                        <div className={cx('cart-user-detail')}>
                            <span className={cx('cart-user-title')}>Name</span>
                            <span>:</span>
                            <span className={cx('cart-user-result')}>{fullName}</span>
                        </div>
                        <div className={cx('cart-user-detail')}>
                            <span className={cx('cart-user-title')}>Email</span>
                            <span>:</span>
                            <span className={cx('cart-user-result')}>{data.email}</span>
                        </div>
                        <div className={cx('cart-user-detail')}>
                            <span className={cx('cart-user-title')}>Address</span>
                            <span>:</span>
                            <span className={cx('cart-user-result')}>{address}</span>
                        </div>
                        <div className={cx('cart-user-detail')}>
                            <span className={cx('cart-user-title')}>Phone</span>
                            <span>:</span>
                            <span className={cx('cart-user-result')}>{phone}</span>
                        </div>
                        <div className={cx('cart-user-outner-btn')}>
                            <button className={cx('cart-user-btn')} onClick={() => handleEditInfo()}>
                                Change
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('cart-info-user')}>
                    <div className={cx('cart-user')}>
                        <div className={cx('cart-user-heading')}>
                            <p>Order Information</p>
                        </div>
                        <div className={cx('cart-user-detail-edit')}>
                            <span>Name</span>
                            <input
                                value={fullName}
                                className={data.fullName ? cx('cart-user-input-disable') : cx('cart-user-input')}
                                onChange={(e) => setFullName(e.target.value)}
                                disabled={data.full_name ? true : false}
                            />
                        </div>
                        <div className={cx('cart-user-detail-edit')}>
                            <span>Email</span>
                            <input value={data.email} className={cx('cart-user-input-disable')} disabled />
                        </div>
                        <div className={cx('cart-user-detail-edit')}>
                            <span>Address</span>
                            <input
                                value={address}
                                className={cx('cart-user-input')}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className={cx('cart-user-detail-edit')}>
                            <span>Phone</span>
                            <input
                                value={phone}
                                className={cx('cart-user-input')}
                                onChange={(e) => handleCheckPhone(e.target.value)}
                            />
                        </div>
                        <div className={cx('cart-user-outner-btn')}>
                            <button className={cx('cart-user-btn')} onClick={() => handleCheckValid()}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className={cx('cart-bill')}>
                <div className={cx('cart-bill-outner')}>
                    <div className={cx('cart-bill-heading')}>
                        <p>Payment orders</p>
                    </div>
                    <div className={cx('cart-bill-total')}>
                        <span>Total:</span>
                        <span>
                            <span className={cx('cart-bill-unit')}>$</span>
                            <span>{totalPrice.toFixed(2)}</span>
                        </span>
                    </div>
                    {/* <div className={cx('cart-bill-description')}>* Shipping information and discounts are announced in the detailed invoice</div> */}
                    {/* choose method pay */}
                    <h4 className={cx('cart-bill-title')}>Select Payment Method:</h4>
                    <div className={cx('cart-bill-detail')}>
                        <label>
                            <input
                                type="radio"
                                value="1"
                                checked={selectedMethod === 1}
                                onChange={handleMethodChange}
                            />
                            Ship COD
                        </label>

                        <label>
                            <input
                                type="radio"
                                value="2"
                                checked={selectedMethod === 2}
                                onChange={handleMethodChange}
                            />
                            VNPAY
                        </label>
                    </div>

                    <div className={cx('cart-bill-outner-btn')} onClick={() => handlePayBill(totalPrice)}>
                        <button className={cx('cart-bill-btn')}>Pay</button>
                    </div>
                </div>

                <div className={cx('cart-bill-card')}>
                    <img src={images.paypal} alt="payment card" width={'50px'} />
                    <img src={images.visa} alt="payment card" width={'50px'} />
                    <img src={images.mastercard} alt="payment card" width={'50px'} />
                </div>
            </div>
        </>
    );
}

export default ShoppingCartBill;
