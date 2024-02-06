import Home from './pages/Home';
import Login from './pages/Login';
import EmailLogin from './pages/EmailLogin';
import { UserConsumer } from './context/userContext.jsx';

const App = () => {
  const { userLoginData } = UserConsumer();
  return <main>{userLoginData ? <Home /> : <Login /> || <EmailLogin />}</main>;
};

export default App;
