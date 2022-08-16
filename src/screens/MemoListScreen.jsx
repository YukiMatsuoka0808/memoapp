import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';/** ../で一段階上の階層に移動する */
import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';

import LogOutButton from '../components/LogOutButton';

export default function MemoListScreen(props) {
  const { navigation } = props;
  useEffect(() => { //コールバック関数として実行したい処理を書く。
    navigation.setOptions({
      headerRight: () => <LogOutButton />,
    });
  }, []);//,[]をつけることで、実行したいものを表示された1回目だけで実行できる

  return (
    <View style={styles.container}/** propsを渡すことで呼び出す側から表示を制御できる */>
      <MemoList />
      <CircleButton
        name="plus"
        onPress={() => { navigation.navigate('MemoCreate'); }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, /** コンテナの設定を画面いっぱいに反映してくださいね。一番外側のviewに */
    backgroundColor: ' #F0F4F8', /** 白include薄黄色 */
  },
});
