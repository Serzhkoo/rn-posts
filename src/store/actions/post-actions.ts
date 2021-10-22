import { Actions } from '../types';
import { Dispatch } from 'redux';
import * as FileSystem from 'expo-file-system';

import { DB } from '../../db';

export type PostReducerActionsType =
  ReturnType<typeof loadPostsAC>
  | ReturnType<typeof toggleBookedAC>
  | ReturnType<typeof removePostAC>
  | ReturnType<typeof addPostAC>

export type PostType = {
  id: number
  img: string
  text: string
  date: string
  booked: boolean
}
const loadPostsAC = (data: PostType[]) => {
  return {type: Actions.LOAD_POSTS, data} as const;
};

const toggleBookedAC = (id: number) => {
  return {type: Actions.TOGGLE_BOOKED, id} as const;
};

const removePostAC = (id: number) => {
  return {type: Actions.REMOVE_POST, id} as const;
};

const addPostAC = (post: PostType) => {
  return {type: Actions.ADD_POST, post} as const;
};

export const loadPostsTC = () => async (dispatch: Dispatch) => {
  const posts = await DB.getPosts();
  dispatch(loadPostsAC(posts));
};

export const addPostTC = (post: PostType) => async (dispatch: Dispatch) => {
  const fileName = post.img.split('/').pop() as string;
  const newPath = FileSystem.documentDirectory + fileName;
  try {
    await FileSystem.moveAsync({
      to: newPath,
      from: post.img
    });
  } catch (error) {
    console.log('Error', error);
  }
  const modifiedPost = {...post, img: newPath};
  modifiedPost.id = await DB.createPost(modifiedPost);
  dispatch(addPostAC(modifiedPost));
};

export const toggleBookedTC = (post: PostType) => async (dispatch: Dispatch) => {
  try {
    await DB.updatePost(post);
  } catch (error) {
    console.log('Error', error);
  }
  dispatch(toggleBookedAC(post.id));
};

export const removePostTC = (id: number) => async (dispatch: Dispatch) => {
  try {
    await DB.removePost(id);
  } catch (error) {
    console.log('Error', error);
  }
  dispatch(removePostAC(id));
};
