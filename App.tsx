import 'react-native-gesture-handler'
import React, { useState, useRef, useEffect } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PersistGate } from 'redux-persist/integration/react';
import Snackbar from 'react-native-snackbar';
import { store, persistor } from './src/store/store';
import SplashScreen from 'react-native-splash-screen';
import CustomDrawerContent from './src/navigation/SideMenu';

// onboarding 
import Login from './src/screens/Login';
import OnBoarding from './src/screens/OnBoarding';

// home 
import Home from './src/screens/Home';
import { Provider, useSelector } from 'react-redux';
import { navigationRef } from './RootNavigation';
import TokenVerification from './src/screens/TokenVerification';
import BusinessSignup from './src/screens/BusinessSignup';
import CustomerSignup from './src/screens/CustomerSignup';
import Signup from './src/screens/Signup';
import TermAndCondition from './src/screens/TermAndCondition';
import FAQ from './src/screens/FAQ';
import ProfileStep1 from './src/screens/profile/ProfileStep1';
import PRofileStep2 from './src/screens/profile/ProfileStep2';
import ProfileStep3 from './src/screens/profile/ProfileStep3';
import ProfileStep4 from './src/screens/profile/ProfileStep4';
import ProfileStep5 from './src/screens/profile/ProfileStep5';
import images from './src/constants/images';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('screen');

export default () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  // async function onAuthStateChanged(user) {
  //   setUser(user);
  //   console.log('fofof', user);
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);


  // useEffect(() => {
  //   const handleDynamicLink = async (link) => {
  //     // Check and handle if the link is a email login link
  //     console.log('link', link);
  //     if (auth().isSignInWithEmailLink(link.url)) {

  //       try {
  //         // use the email we saved earlier
  //         const email = await AsyncStorage.getItem('emailForSignIn');
  //         // store.dispatch(startLoginLoading())

  //         const checkLink = await auth().signInWithEmailLink(email, link.url);
  //         const uid = auth().currentUser?.uid
  //         const userEmail = auth().currentUser?.email
  //         if (uid && userEmail) {
  //           // store.dispatch(createUser())
  //           // create user in database sql
  //         }
  //         // handleState()

  //         /* You can now navigate to your initial authenticated screen
  //           You can also parse the `link.url` and use the `continueurl` param to go to another screen
  //           The `continueurl` would be the `url` passed to the action code settings */
  //       }
  //       catch (e) {
  //         console.log('err', e);
  //         Snackbar.show({
  //           text: 'Expired link',
  //           duration: Snackbar.LENGTH_SHORT,
  //         });
  //         // store.dispatch(createUserSuccess())
  //       }
  //     }
  //   };

  //   const unsubscribe = dynamicLinks().onLink(handleDynamicLink);

  //   /* When the app is not running and is launched by a magic link the `onLink`
  //      method won't fire, we can handle the app being launched by a magic link like this */
  //   dynamicLinks().getInitialLink()
  //     .then(link => link && handleDynamicLink(link));

  //   // When the component is unmounted, remove the listener
  //   return () => unsubscribe();
  // }, []);

  const BottomNavigation = () => {

    const customText = ({ text, color }: any) => (
      <Text
        style={{
          fontSize: 12,
          color: color,
          marginBottom: 5,
        }}>
        {text}
      </Text>
    );

    return (
      <Tab.Navigator
        initialRouteName="Home"
        // tabBarOptions={{
        //   // keyboardHidesTabBar: true,
        //   style: {
        //     borderTopWidth: 0,
        //     borderTopColor: "transparent",
        //     height: 65
        //   },
        //   borderTopColor: "transparent",
        //   inactiveTintColor: 'white',
        //   activeBackgroundColor: '#FCA311',
        //   inactiveBackgroundColor: '#000',
        //   activeTintColor: 'white'
        // }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            var tintColor = '#fff';
            var border: any = { borderRadius: 200 };
            var icon;

            switch (route.name) {
              case 'Home':
                icon = images.bin;
                border = {};
                break;
              case 'Search':
                icon = images.bin;
                border = {};
                break;

              case 'Movie':
                icon = images.bin;
                border = {};
                break;

              case 'Player':
                icon = images.bin;
                border = {};
                break;

              case 'Account':
                icon = images.bin;
                border = {};

                break;
              default:
                break;
            }

            return (
              <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Image
                  source={icon}
                  resizeMode="contain"
                  style={[
                    tintColor,
                    border,
                    {
                      marginTop: 0,
                      height: 25,
                      width: 25,
                    },
                  ]}
                />
              </View>
            );
          },
        })}>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarLabel: ({ color }) => customText({ text: 'Home', color }),
          }}
        />
        <Tab.Screen
          name="Search"
          component={HomeStack}
          options={{
            tabBarLabel: ({ color }) => customText({ text: 'Cart', color }),
          }}
        />
        <Tab.Screen
          name="Movie"
          component={HomeStack}
          options={{
            tabBarLabel: ({ color }) => customText({ text: 'Vids', color }),
          }}
        />
        <Tab.Screen
          name="Player"
          component={HomeStack}
          options={{
            tabBarLabel: ({ color }) => customText({ text: 'Feeds', color }),
          }}
        />
        <Tab.Screen
          name="Account"
          component={HomeStack}
          options={{
            tabBarLabel: ({ color }) => customText({ text: 'Profile', color }),
          }}
        />
      </Tab.Navigator>
    );
  };

  function DrwaerStack() {
    return (
      <>
        <Drawer.Navigator

          // style={{ flex: 1 }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          // drawerStyle={{
          //   backgroundColor: 'white',
          //   width: width * 0.8,

          // }}
          screenOptions={{
            // activeTintcolor: 'white',
            // inactiveTintColor: '#000',
            // activeBackgroundColor: 'transparent',
            // itemStyle: {
            //   width: width * 0.75,
            //   backgroundColor: 'transparent',
            //   paddingVertical: 16,
            //   paddingHorizonal: 12,
            //   justifyContent: 'center',
            //   alignContent: 'center',
            //   alignItems: 'center',
            //   overflow: 'hidden',
            // },
            // labelStyle: {
            //   fontSize: 18,
            //   marginLeft: 12,
            //   fontWeight: 'normal',
            // },
          }}
          initialRouteName="Home"

        >
          <Drawer.Screen name="Home" component={BottomNavigation} />

          {/* <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} /> */}
        </Drawer.Navigator>

      </>
    );
  }

  function CustomerStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Homes" component={Home} options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="TermAndCondition" component={TermAndCondition} options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="FAQ" component={FAQ} options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="ProfileStep1" component={ProfileStep1} options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="ProfileStep2" component={PRofileStep2} options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="ProfileStep3" component={ProfileStep3} options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="ProfileStep4" component={ProfileStep4} options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="ProfileStep5" component={ProfileStep5} options={{ headerShown: false, animationEnabled: false }} />

      </Stack.Navigator>
    )
  }

  function HomeStack() {
    const userType = useSelector((state: any) => state.user.isLoggedIn)
    console.log('user ', userType);
    // if (userType) {
    return <CustomerStack />
    // } else {
    //   return <VenderStack />
    // }
  }

  function OnboardingStack() {
    return (
      <Stack.Navigator initialRouteName="OnBoarding1" >
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="BusinessSignup" component={BusinessSignup} options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="CustomerSignup" component={CustomerSignup} options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="OnBoarding1" component={OnBoarding} options={{ headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="TokenVerification" component={TokenVerification} options={{ headerShown: false, animationEnabled: false }} />
      </Stack.Navigator>
    )
  }

  const MainStack = () => {

    const loggedIn = useSelector((state: any) => state.user.isLoggedIn)

    if (loggedIn && loggedIn.token) {
      return <DrwaerStack />
    } else {
      return <OnboardingStack />
    }

  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <MainStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

