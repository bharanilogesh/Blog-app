import '../styles/blog.css';
import { UserConsumerCreatePost } from '../context/createPostContext';

const MainBlog = () => {
  const { mainBlogObj } = UserConsumerCreatePost();

  return (
    <div className='mainBlog'>
      <img
        src={mainBlogObj.image}
        alt={mainBlogObj.name}
        className='mainBlog-img'
      />
      <div>
        <h3 className='mainBlog-name'>{mainBlogObj.name}</h3>
        <p className='mainBlog-time'>{mainBlogObj.time}</p>
      </div>
      <p className='mainBlog-para'>{mainBlogObj.description}</p>
    </div>
  );
};

export default MainBlog;
