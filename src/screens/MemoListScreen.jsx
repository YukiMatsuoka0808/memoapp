import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppBar from '../components/AppBar'; /** ../で一段階上の階層に移動する */
import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';

export default function MemoListScreen() {
  return (
    <View style={styles.container}/** propsを渡すことで呼び出す側から表示を制御できる */>
      <AppBar />
      <MemoList />
      <CircleButton name="plus" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, /** コンテナの設定を画面いっぱいに反映してくださいね。一番外側のviewに */
    backgroundColor: ' #F0F4F8', /** 白include薄黄色 */
  },
});
