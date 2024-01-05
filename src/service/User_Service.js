import axios from './axios';

const loginUser = async (email, password) => {
    const loginUrl = '/api/auth/login';

    const loginData = {
        email: email,
        password: password,
    };

    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.post(loginUrl, loginData, { headers });

        return {
            response: response,
        };
    } catch (error) {
        return {
            success: false,
        };
    }
};

const logoutUser = async () => {
    const logoutUrl = '/api/auth/logout';

    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        await axios.post(logoutUrl, {}, { headers });
        return {
            success: true,
        };
    } catch (error) {
        return {
            success: false,
        };
    }
};

const dataUser = async () => {
    const dataUrl = '/api/auth/profile';

    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.get(dataUrl, {}, { headers });

        return {
            success: true,
            response: response,
        };
    } catch (error) {
        
    }
};

const editDataUser = async (fullname, phone, address, password) => {
    const editDataUrl = '/api/auth/edit_profile';

    const editData = {
        full_name: fullname,
        phone: phone,
        address: address,
        password: password,
    };

    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.post(editDataUrl, editData, { headers });

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

export { loginUser, logoutUser, dataUser, editDataUser };
