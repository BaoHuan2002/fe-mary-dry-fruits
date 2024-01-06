import { useNavigate } from 'react-router-dom';
import { toast, Flip } from 'react-toastify';
import { useShoppingContext } from '@/contexts/Shopping_Context';
import Button from '@/components/Button/ButtonIndex';
import CartItem from '@/pages/ShoppingCart/Shopping_Cart_Item';

import classNames from 'classnames/bind';
import styles from './Cart.module.scss';

const cx = classNames.bind(styles);

const Cart = () => {
    const { cartItems, totalPrice, removePoper } = useShoppingContext();
    const navigate = useNavigate();

    const handleCheckLogin = async () => {
        removePoper();
        let check = localStorage.getItem('jwt');
        if (!check) {
            toast.error('You need login to checkout this cart!', {
                transition: Flip,
                autoClose: 2000,
            });
            navigate('/account/login');
        } else {
            navigate('/cart');
        }
    };

    return (
        <>
            <div className={cx('cart-container')}>
                <div className={cx('cart-wrapper')}>
                    {cartItems.map((item, index) => {
                        return (
                            <div key={index}>
                                <CartItem {...item} />
                            </div>
                        );
                    })}
                </div>
                <div className={cx('cart-checkout')}>
                    <span className={cx('cart-total')}>Totol Price: ${totalPrice.toFixed(2)}</span>
                    <span onClick={() => handleCheckLogin()}>
                        <Button text={'Checkout'} blackText link={'/cart'} />
                    </span>
                </div>
            </div>
        </>
    );
};

export default Cart;
