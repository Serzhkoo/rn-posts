import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Button, Image, StyleSheet, View } from 'react-native';

type PhotoPickerPropsType = {
  image: string | null
  onPick: (uri: string) => void
}

export const PhotoPicker: React.FC<PhotoPickerPropsType> = (props) => {
  const {image, onPick} = props;

  // useEffect(() => {
  //   (async () => {
  //     if (Platform.OS !== 'web') {
  //       const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //       if (status !== 'granted') {
  //         alert('Sorry, we need camera roll permissions to make this work!');
  //       }
  //     }
  //   })();
  // }, []);
  const takePhoto = async () => {
    const img = await ImagePicker.launchCameraAsync({
      quality: 0.5,
      allowsEditing: false,
      aspect: [16, 9]
    });

    if (!img.cancelled) {
      onPick(img.uri);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Button title={'Take photo'} onPress={takePhoto} />
      {image && <Image source={{uri: image}} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10
  }
});
