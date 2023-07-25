import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import MyStatusBar from '../components/MyStatusBar';
import commonStyle from '../constants/commonStyle';

import { logout } from '../store/reducer/mainSlice';
import { emptySplitApi } from '../store/slice/emptySplitApi';

const SideMenu = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [isActive, setIsActive] = useState(false);
  
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', }}>
      <MyStatusBar
        translucent
        barStyle="light-content"
        backgroundColor="#000"
      />
      <ScrollView style={{}}>
     <TouchableOpacity
          onPress={() => {
            dispatch(emptySplitApi.util.resetApiState())
            dispatch(logout())
          }}
          style={{ marginLeft: 15, marginTop: 20 }}>
          <Text style={{ fontSize: 16, color: '#000', fontFamily: commonStyle.fontFamily.medium, }}>Log Out</Text>
        </TouchableOpacity>
        <View style={{ borderColor: '#2D2D2D', opacity: 0.2, borderWidth: .5, marginTop: 20, }} />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
  colortext: {
    color: 'white'
  },

});

export default SideMenu