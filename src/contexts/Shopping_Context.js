import { createContext, useContext, useEffect, useState } from 'react';

const ShoppingContext = createContext({});

export const useShoppingContext = () => {
    return useContext(ShoppingContext);
};

export const ShoppingContextProvider = ({ children }) => {
    
    const [cartItems, setCartItems] = useState(() => {
        const data = localStorage.getItem('shopping_cart');
        return data ? JSON.parse(data) : [];
    });
    
    useEffect(() => {
        const totalCount = cartItems.reduce((total) => total + 1, 0);
        setCartQuantity(totalCount);
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('shopping_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const [cartQuantity, setCartQuantity] = useState(0);

    let addQuantity = 0;
    
    const totalPrice = cartItems.reduce((total, item) => total + item.addQuantity * ((item.price * item.weight) / 100), 0);

    const increaseQuantity = (id, weight) => {
        const currentCartItem = cartItems.find((item) => item.id === id && item.weight === weight);
        if (currentCartItem) {
            const newItems = cartItems.map((item) => {
                if (item.id === id && item.weight === weight) {
                    return { ...item, addQuantity: item.addQuantity + 1 };
                } else {
                    return item;
                }
            });
            setCartItems(newItems);
        }
    };

    const decreaseQuantity = (id, weight) => {
        const currentCartItem = cartItems.find((item) => item.id === id && item.weight === weight);
        if (currentCartItem) {
            if (currentCartItem.addQuantity === 1) {
                removeCartItem(id, weight);
                if (cartQuantity === 0) {
                    removePoper();
                }
            } else {
                const newItems = cartItems.map((item) => {
                    if (item.id === id && item.weight === weight) {
                        return { ...item, addQuantity: item.addQuantity - 1 };
                    } else {
                        return item;
                    }
                });
                setCartItems(newItems);
            }
        }
    };

    const addCartItem = (product) => {
        removePoper();
        if (product) {
            const currentCartItem = cartItems.find((item) => item.id === product.id && item.weight === product.weight);
           
            if (currentCartItem) {
                const newItems = cartItems.map((item) => {
                    if (item.id === product.id && item.weight === product.weight) {
                        return { ...item, addQuantity: product.addQuantity  };
                    } else {
                        return item;
                    }
                });
                setCartItems(newItems);
            }else{
                setCartQuantity(cartQuantity + 1);
                const newItem = { ...product, addQuantity: product.addQuantity };
                setCartItems([...cartItems, newItem]);
            }

        }
    };

    const removeCartItem = (id, weight) => {
        const currentCartItemIndex = cartItems.findIndex((item) => item.id === id && item.weight === weight);
        const newItems = [...cartItems];
        newItems.splice(currentCartItemIndex, 1);
        setCartItems(newItems);
        setCartQuantity(cartQuantity - 1);
        if (cartQuantity === 0) {
            removePoper();
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const [remove, setRemove] = useState(true);

    const removePoper = () => {
        setRemove(false);
    };

    const showPoper = () => {
        setRemove(true);
    };

    const [dataName, setDataName] = useState('');

    const [hideMenuUser, setHideMenuUser] = useState(true);
    const [hideMenuPage, setHideMenuPage] = useState(true);

    return (
        <ShoppingContext.Provider
            value={{
                cartItems,
                cartQuantity,
                totalPrice,
                remove,
                addQuantity,
                dataName,
                hideMenuUser,
                hideMenuPage,
                setHideMenuUser,
                setHideMenuPage,
                setDataName,
                setCartQuantity,
                increaseQuantity,
                decreaseQuantity,
                addCartItem,
                removeCartItem,
                clearCart,
                removePoper,
                showPoper,
            }}
        >
            {children}
        </ShoppingContext.Provider>
    );
};

export default ShoppingContext;
