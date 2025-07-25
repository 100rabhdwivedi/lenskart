import AuthForm from '../components/AuthForm';
import Transition from '../components/Transition';
const LoginPage = () => {
    return <AuthForm isLogin={true} />;
};

export default Transition(LoginPage);
