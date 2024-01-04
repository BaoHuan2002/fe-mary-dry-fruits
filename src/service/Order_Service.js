import axios from './axios';

const Order = async (data_order) => {
    const orderDataUrl = '/api/order/order';

    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const orderResponse = await axios.post(orderDataUrl, data_order, { headers });

        return {
            success: true,
            orderResponse: orderResponse,
        };
    } catch (error) {
        return {
            success: false,
        };
    }
};

const PayOrder = async (data) => {
    const orderPayOrderUrl = `/api/vnpay/vnpay_payment?total=${data}&bank_code=NCB`;

    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.post(orderPayOrderUrl, { headers });

        return {
            success: true,
            response: response,
        };
    } catch (error) {
        return {
            success: false,
        };
    }
};

export { Order, PayOrder };
