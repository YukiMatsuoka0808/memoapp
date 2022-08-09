import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppBar from './src/components/AppBar';
import MemoList from './src/components/MemoList';
import CircleButton from './src/components/CircleButton';

export default function App() {
  return (
    <View style={styles.container}/** propsを渡すことで呼び出す側から表示を制御できる */>

      <AppBar />

      <MemoList />

      <CircleButton>+</CircleButton>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, /** コンテナの設定を画面いっぱいに反映してくださいね。一番外側のviewに */
    backgroundColor: '#F0F4F8', /** white */
    /** alignItems: 'center',
    justifyContent: 'flex-start', /** flex-start上にflex-end下に */
  },
});
