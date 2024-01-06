import RegisterForm from '@/components/Account/Register/RegisterForm';
import Header from '@/components/Layout/Header/Header_Index';

const RegisterPage = () => {
    return (
        <>
            <Header title={'Register'}/>
            <RegisterForm />
        </>
    );
};

export default RegisterPage;
