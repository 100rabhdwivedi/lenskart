import AuthForm from '../components/AuthForm';
import Transition from '../components/Transition';
const SignupPage = () => {
    return <AuthForm isLogin={false} />;
};

export default Transition(SignupPage);
