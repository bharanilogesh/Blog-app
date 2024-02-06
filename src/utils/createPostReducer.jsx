const createPostReducer = (state, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return { ...state, blogData: action.blogData };

    case 'FILTER':
      let result = [];
      const searchInput = action.payload.e.toLowerCase();

      result = state.blogData.filter((item) => {
        return item.category.toLowerCase().includes(searchInput);
      });
      return { ...state, blogData: result };

    default:
      return { state };
  }
};

export default createPostReducer;
