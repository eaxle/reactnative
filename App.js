import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyPost from './component/MyPost';
export default function App() {
  return (
      <View >
          <MyPost></MyPost>
          
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        
        backgroundColor: '#fff',
        alignItems: 'stretch',
    justifyContent: 'center',
  },
});
