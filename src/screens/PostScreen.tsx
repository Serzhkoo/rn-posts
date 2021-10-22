import { Alert, Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';

import { PostProps } from '../navigation/AppNavigation';
import { THEME } from '../theme';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../store/store';
import { PostType, removePostTC, toggleBookedTC } from '../store/actions/post-actions';

export const PostScreen: React.FC<PostProps<'PostScreen'>> = (props) => {
  const {route, navigation} = props;
  const {postId, date} = route.params;
  const post = useSelector<AppStateType, PostType>(state => {
    const foundPost = state.post.allPosts.find(post => post.id === postId);
    return foundPost
      ? foundPost
      : {} as PostType;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!post.id) navigation.goBack();
  });

  useEffect(() => {
    navigation.setOptions({
      title: `Post from ${new Date(date).toLocaleDateString()}`,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item
            title={'Star'}
            iconName={post.booked ? 'ios-star' : 'ios-star-outline'}
            onPress={() => dispatch(toggleBookedTC(post))}
          />
        </HeaderButtons>
      )
    });
  }, [navigation, post, dispatch, post.booked]);

  const removeHandler = () => {
    Alert.alert(
      'Post deleting',
      `Do you want to delete ${postId} post?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Remove',
          onPress: () => {
            navigation.goBack();
            dispatch(removePostTC(postId));
          },
          style: 'destructive'
        }
      ],
      {cancelable: false}
    );
  };

  return (
    <ScrollView>
      <Image source={{uri: post.img}} style={styles.image} />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button title={'Remove'} color={THEME.DANGER_COLOR} onPress={removeHandler} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  textWrap: {
    padding: 10
  },
  title: {
    fontFamily: 'open-regular'
  }
});
