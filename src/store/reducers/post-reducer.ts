import { PostReducerActionsType, PostType } from '../actions/post-actions';
import { Actions } from '../types';

type PostReducerType = {
  allPosts: PostType[]
  bookedPosts: PostType[]
  loading: boolean
}

const initialState: PostReducerType = {
  allPosts: [],
  bookedPosts: [],
  loading: true
};

export const postReducer = (state: PostReducerType = initialState, action: PostReducerActionsType): PostReducerType => {
  switch (action.type) {
    case Actions.LOAD_POSTS:
      return {...state, allPosts: action.data, bookedPosts: action.data.filter(post => post.booked), loading: false};
    case Actions.TOGGLE_BOOKED: {
      const allPosts = state.allPosts.map(post => post.id === action.id ? {...post, booked: !post.booked} : post);
      return {
        ...state,
        allPosts,
        bookedPosts: allPosts.filter(post => post.booked)
      };
    }
    case Actions.REMOVE_POST:
      return {
        ...state,
        allPosts: state.allPosts.filter(post => post.id !== action.id),
        bookedPosts: state.bookedPosts.filter(post => post.id !== action.id)
      };
    case Actions.ADD_POST:
      return {...state, allPosts: [{...action.post}, ...state.allPosts]};
    default:
      return state;
  }
};