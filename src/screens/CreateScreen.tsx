import { Button, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react';
import { THEME } from '../theme';
import { useDispatch } from 'react-redux';
import { addPostTC } from '../store/actions/post-actions';
import { CreateProps } from '../navigation/AppNavigation';
import { PhotoPicker } from '../components/PhotoPicker';

export const CreateScreen: React.FC<CreateProps<'CreateScreen'>> = (props) => {
  const {navigation} = props;
  const [text, setText] = useState<string>('');
  const [img, setImg] = useState<string>('');
  const dispatch = useDispatch();

  const saveHandler = () => {
    const post = {
      id: 0,
      date: new Date().toJSON(),
      text,
      img,
      booked: false
    };
    dispatch(addPostTC(post));
    setText('');
    setImg('');
    navigation.navigate('BottomTabStackScreens');
  };

  const photoPickHandler = (uri: string) => {
    setImg(uri);
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Create new post</Text>
          <TextInput
            style={styles.textArea}
            placeholder={'Enter post text'}
            value={text}
            onChangeText={setText}
            multiline={true}
          />
          <PhotoPicker onPick={photoPickHandler} image={img ? img : null} />
          <Button
            title={'Create post'}
            color={THEME.MAIN_COLOR}
            onPress={saveHandler}
            disabled={!text || !img}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'open-regular',
    marginVertical: 10
  },
  textArea: {
    padding: 10,
    marginBottom: 10
  }
});
