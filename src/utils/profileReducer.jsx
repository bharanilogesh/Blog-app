const profileReducer = (state, action) => {
  switch (action.type) {
    case 'GET_PROFILE_DATA':
      return { ...state, profileData: action.profileData };
    case 'PROFILE_INFO':
      return { ...state, profile: action.profile };

    default:
      return { state };
  }
};

export default profileReducer;
