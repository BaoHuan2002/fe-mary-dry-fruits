import LoginForm from '@/components/Account/Login/LoginForm';
import Header from '@/components/Layout/Header/Header_Index';


const LoginPage = () => {
    return (
        <>
            <Header title={'Login'}/>
            <LoginForm />
        </>
    );
};

export default LoginPage;
