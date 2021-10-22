import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Platform } from 'react-native';
import { THEME } from '../theme';
import { Ionicons } from '@expo/vector-icons';

export const AppHeaderIcon: React.FC = (props) => {
  return (
    <HeaderButton
      IconComponent={Ionicons}
      title={'HeaderButton'}
      iconSize={24}
      color={Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR}
      {...props}
    />
  );
};