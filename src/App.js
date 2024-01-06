import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { resetToken } from './service/User_Service';
import { useShoppingContext } from './contexts/Shopping_Context';
import routes from '@/routes';
import NavBar from './components/Layout/Navigation/Nav_Index';
import Footer from './components/Layout/Footer/Footer_Index';
import GlobalStyles from './components/GlobalStyles';

import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const { setHideMenuUser, setHideMenuPage } = useShoppingContext();
    const token = localStorage.getItem('jwt');

    const location = useLocation();

    useEffect(() => {
        if (token) {
            setInterval(async () => {
                try {
                    const res = await resetToken();
                    if (res && res.response && res.response.access_token !== undefined && res.response.access_token !== null && res.response.access_token !== '') {
                        localStorage.setItem('jwt', res.response.access_token);
                    } else {
                        localStorage.removeItem('jwt');
                    }
                } catch (error) {
                    localStorage.removeItem('jwt');
                }
            }, 0.5 * 60 * 1000);
        }
    }, []);

    useEffect(() => {
        setHideMenuUser(true);
        setHideMenuPage(true);
    }, [location]);

    return (
        <GlobalStyles>
            <NavBar />
            <Routes>
                {routes.map((route, index) => {
                    return <Route key={index} path={route.path} element={<route.component />} />;
                })}
            </Routes>
            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Flip}
            />
        </GlobalStyles>
    );
}

export default App;
