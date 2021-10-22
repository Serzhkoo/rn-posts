import React, { useEffect } from 'react';
import { PostProps } from '../navigation/AppNavigation';
import { PostList } from '../components/PostList';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../store/store';
import { loadPostsTC, PostType } from '../store/actions/post-actions';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { THEME } from '../theme';

export const MainScreen: React.FC<PostProps<'MainScreen'>> = (props) => {
  const {navigation} = props;
  const allPosts = useSelector<AppStateType, PostType[]>(state => state.post.allPosts);
  const loading = useSelector<AppStateType, boolean>(state => state.post.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPostsTC());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={THEME.MAIN_COLOR} size={'large'}/>
      </View>
    );
  }

  const onOpenPostHandler = (post: PostType) => {
    navigation.navigate('PostScreen', {postId: post.id, date: post.date});
  };

  return (
    <PostList data={allPosts} onOpen={onOpenPostHandler} />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
