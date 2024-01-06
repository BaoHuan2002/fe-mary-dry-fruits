import { useShoppingContext } from '@/contexts/Shopping_Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

import classNames from 'classnames/bind';
import styles from './Shopping_Cart.module.scss';

const cx = classNames.bind(styles);

function ShoppingCartItem({ ...item }) {
    const { increaseQuantity, decreaseQuantity, removeCartItem } = useShoppingContext();
    
    return (
        <div className={cx('cart-item-container')}>
            <div className={cx('cart-item-outner-image')}>
                <img src={item.image} alt="cart_image" className={cx('cart-item-image')} />
            </div>
            <div className={cx('cart-item-info')}>
                <p className={cx('cart-item-name')}>{item.name}</p>
                <p className={cx('cart-item-brand')}>Cost: ${item.price.toFixed(2)}</p>
            </div>
            <div className={cx('cart-item-size')}>
                <div className={cx('cart-item-weight')}>
                    {item.weight && item.weight >= 1000 ? `${item.weight / 1000} Kg` : `${item.weight} Gram`} 
                </div>
            </div>
            <div className={cx('cart-item-quantity')}>
                <button className={cx('cart-item-up')} onClick={() => decreaseQuantity(item.id, item.weight)}>
                    <FontAwesomeIcon icon={icon({ name: 'minus', style: 'solid' })} className={cx('minus-icon')} />
                </button>
                <span className={cx('cart-item-number')}>{item.addQuantity}</span>
                <button className={cx('cart-item-down')} onClick={() => increaseQuantity(item.id, item.weight)}>
                    <FontAwesomeIcon icon={icon({ name: 'plus', style: 'solid' })} className={cx('plus-icon')} />
                </button>
            </div>
            <div className={cx('cart-item-price')}>
                <span>${(((item.price * item.weight) / 100) * item.addQuantity).toFixed(2)}</span>
            </div>
            <div className={cx('cart-item-action')}>
                <button className={cx('cart-item-btn')} onClick={() => removeCartItem(item.id, item.weight)}>
                    Remove
                </button>
            </div>
        </div>
    );
}

export default ShoppingCartItem;
