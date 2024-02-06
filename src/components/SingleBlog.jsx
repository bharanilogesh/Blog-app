import { TbEdit } from 'react-icons/tb';
import { RiDeleteBin2Line } from 'react-icons/ri';
import '../styles/blog.css';
import { Link } from 'react-router-dom';
import { UserConsumerCreatePost } from '../context/createPostContext';

const SingleBlog = ({ item }) => {
  const { deleteItem, editItem, showMainBlog } = UserConsumerCreatePost();
  const { name, image, category, description, id } = item;
  return (
    <div className='singleBlog' key={id}>
      <img src={image} alt={name} />
      <h5 className='singleBlog-name'>{name}</h5>
      <div>
        <p className='singleBlog-para'>{description}</p>
        <button className='singleBlog-readBtn' onClick={() => showMainBlog(id)}>
          <Link to='mainBlog'>Read more</Link>
        </button>
      </div>
      <h2 className='singleBlog-category'>{category}</h2>
      <div className='singleBlogBtn'>
        <button className='singleBlog-editBtn' onClick={() => editItem(id)}>
          <Link to='createPost'>
            <TbEdit />
          </Link>
        </button>
        <button className='singleBlog-deleteBtn' onClick={() => deleteItem(id)}>
          <RiDeleteBin2Line />
        </button>
      </div>
    </div>
  );
};

export default SingleBlog;
