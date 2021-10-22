import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { THEME } from '../theme';
import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { BookedScreen } from '../screens/BookedScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AboutScreen } from '../screens/AboutScreen';
import { CreateScreen } from '../screens/CreateScreen';

type PostStackParamList = {
  MainScreen: undefined
  PostScreen: {
    postId: number
    date: string
  }
  CreateStackScreens: undefined
}

type BookedStackParamList = {
  BookedScreen: undefined
  PostScreen: {
    postId: number
    date: string
  }

}

type BottomTabStackTabParamList = {
  BookedStackScreens: undefined
  PostStackScreens: undefined
}

type AboutStackParamList = {
  AboutScreen: undefined
}

type CreateStackParamList = {
  CreateScreen: undefined
  BottomTabStackScreens: undefined
}

type DrawerStackParamList = {
  BottomTabStackScreens: undefined
  AboutStackScreens: undefined
  CreateStackScreens: undefined
}

type BottomScreenOptionsType = {
  initialRouteName: 'PostStackScreens' | 'BookedStackScreens'
  barStyle: { backgroundColor: string }
  activeColor: string
  shifting: boolean
}

export type PostProps<Route extends keyof PostStackParamList> = NativeStackScreenProps<PostStackParamList, Route>

export type BookedProps<Route extends keyof BookedStackParamList> = NativeStackScreenProps<BookedStackParamList, Route>

export type CreateProps<Route extends keyof CreateStackParamList> = NativeStackScreenProps<CreateStackParamList, Route>

const PostStack = createNativeStackNavigator<PostStackParamList>();

const BookedStack = createNativeStackNavigator<BookedStackParamList>();

const BottomTabStack = createMaterialBottomTabNavigator<BottomTabStackTabParamList>();
// const BottomTabStack = Platform.OS === 'android'
//   ? createMaterialBottomTabNavigator<TabParamList>()
//   : createBottomTabNavigator<TabParamList>();

const AboutStack = createNativeStackNavigator<AboutStackParamList>();

const CreateStack = createNativeStackNavigator<CreateStackParamList>();

const DrawerStack = createDrawerNavigator<DrawerStackParamList>();

const screenOptions = Platform.OS === 'android'
  ? {
    headerStyle: {
      backgroundColor: THEME.MAIN_COLOR
    },
    headerTintColor: '#fff'
  }
  : {
    headerStyle: {
      backgroundColor: '#fff'
    },
    headerTintColor: THEME.MAIN_COLOR
  };

const BookedStackScreens: React.FC<NativeStackScreenProps<BookedStackParamList>> = (props) => {
  const {navigation} = props;

  return (
    <BookedStack.Navigator
      initialRouteName={'BookedScreen'}
      screenOptions={screenOptions}
    >
        <BookedStack.Screen name={'BookedScreen'} component={BookedScreen} options={{
          title: 'Favorites',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
              <Item
                title={'Toggle Drawer'}
                iconName={'ios-menu'}
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              />
            </HeaderButtons>
          )
        }} />
        <BookedStack.Screen name={'PostScreen'} component={PostScreen} />
    </BookedStack.Navigator>
  );
};

const PostStackScreens: React.FC<NativeStackScreenProps<PostStackParamList>> = (props) => {
  const {navigation} = props;

  return (
    <PostStack.Navigator
      initialRouteName={'MainScreen'}
      screenOptions={screenOptions}
    >
        <PostStack.Screen name={'MainScreen'} component={MainScreen} options={{
          title: 'My blog',
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
              <Item
                title={'Take photo'}
                iconName={'ios-camera'}
                onPress={() => navigation.navigate('CreateStackScreens')}
              />
            </HeaderButtons>
          ),
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
              <Item
                title={'Toggle Drawer'}
                iconName={'ios-menu'}
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              />
            </HeaderButtons>
          )
        }} />
        <PostStack.Screen name={'PostScreen'} component={PostScreen} />
    </PostStack.Navigator>
  );
};

const BottomTabStackScreens: React.FC = () => {
  const bottomScreenOptions: BottomScreenOptionsType = Platform.OS === 'android'
    ? {
      initialRouteName: 'PostStackScreens',
      barStyle: {backgroundColor: THEME.MAIN_COLOR},
      activeColor: '#fff',
      shifting: true
    }
    : {
      initialRouteName: 'PostStackScreens',
      barStyle: {backgroundColor: '#fff'},
      activeColor: THEME.MAIN_COLOR,
      shifting: true
    };
  // : {
  //   initialRouteName: 'Post',
  //   screenOptions: {
  //     headerShown: false,
  //     tabBarActiveTintColor: THEME.MAIN_COLOR
  //   }
  return (
    <BottomTabStack.Navigator
      {...bottomScreenOptions}
    >
        <BottomTabStack.Screen
          name={'PostStackScreens'}
          component={PostStackScreens}
          options={{
            tabBarIcon: (props) => <Ionicons name={'ios-albums'} size={25} color={props.color} />,
            tabBarLabel: 'All posts'
          }} />
        <BottomTabStack.Screen
          name={'BookedStackScreens'}
          component={BookedStackScreens}
          options={{
            tabBarIcon: (props) => <Ionicons name={'ios-star'} size={25} color={props.color} />,
            tabBarLabel: 'Favorites'
          }} />
      </BottomTabStack.Navigator>
  );
};

const AboutStackScreens: React.FC<NativeStackScreenProps<AboutStackParamList>> = (props) => {
  const {navigation} = props;

  return (
    <AboutStack.Navigator screenOptions={screenOptions}>
      <AboutStack.Screen name={'AboutScreen'} component={AboutScreen} options={{
        title: 'About APP',
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
              <Item
                title={'Toggle Drawer'}
                iconName={'ios-menu'}
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              />
            </HeaderButtons>
        )
      }} />
    </AboutStack.Navigator>
  );
};

const CreateStackScreens: React.FC<NativeStackScreenProps<CreateStackParamList>> = (props) => {
  const {navigation} = props;

  return (
    <CreateStack.Navigator screenOptions={screenOptions}>
      <CreateStack.Screen name={'CreateScreen'} component={CreateScreen} options={{
        title: 'New post',
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
              <Item
                title={'Toggle Drawer'}
                iconName={'ios-menu'}
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              />
            </HeaderButtons>
        )
      }} />
    </CreateStack.Navigator>
  );
};

const AppStackScreens: React.FC = () => {
  return (
    <DrawerStack.Navigator screenOptions={{
      headerShown: false,
      drawerActiveTintColor: THEME.MAIN_COLOR,
      drawerLabelStyle: {
        fontFamily: 'open-bold'
      }
    }}>
      <DrawerStack.Screen
        name={'BottomTabStackScreens'}
        component={BottomTabStackScreens}
        options={{
          drawerLabel: 'General'
        }}
      />
      <DrawerStack.Screen
        name={'AboutStackScreens'}
        component={AboutStackScreens}
        options={{
          drawerLabel: 'About APP'
        }}
      />
      <DrawerStack.Screen
        name={'CreateStackScreens'}
        component={CreateStackScreens}
        options={{
          drawerLabel: 'New post'
        }}
      />
    </DrawerStack.Navigator>
  );
};

export const AppNavigation: React.FC = () => {

  return (
    <NavigationContainer>
      <AppStackScreens />
    </NavigationContainer>
  );
};
