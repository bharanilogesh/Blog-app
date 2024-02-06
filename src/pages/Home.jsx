import { SingleBlog, HomeHeader } from '../components';
import '../styles/home.css';
import { UserConsumerCreatePost } from '../context/createPostContext';
import { Footer } from '../components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Home = () => {
  const { blogData } = UserConsumerCreatePost();

  return (
    <div className='home'>
      <HomeHeader />
      <div className='singleBlog-container'>
        {blogData
          ? blogData.map((item, index) => (
              <SingleBlog item={item} key={index} />
            ))
          : null}
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Home;
