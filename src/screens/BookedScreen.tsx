import React from 'react';
import { BookedProps } from '../navigation/AppNavigation';
import { PostList } from '../components/PostList';
import { useSelector } from 'react-redux';
import { AppStateType } from '../store/store';
import { PostType } from '../store/actions/post-actions';

export const BookedScreen: React.FC<BookedProps<'BookedScreen'>> = (props) => {
  const {navigation} = props;

  const bookedPosts = useSelector<AppStateType, PostType[]>(state => state.post.bookedPosts);

  const onOpenPostHandler = (post: PostType) => {
    navigation.navigate('PostScreen', {postId: post.id, date: post.date});
  };

  return (
    <PostList data={bookedPosts} onOpen={onOpenPostHandler} />
  );
};
