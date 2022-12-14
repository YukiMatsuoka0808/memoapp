import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, Alert, Text,
} from 'react-native';/** ../で一段階上の階層に移動する */
import firebase from 'firebase';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';
import Button from '../components/Button';
import Loading from '../components/Loading';

export default function MemoListScreen(props) {
  const { navigation } = props;
  const [memos, setMemos] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // {}はオブジェクトとして認識と[]は、関数使いたいときに使う
  // usestateという状態でdbから取ってきたものをmemosに入れて、setmemos（関数）で書き換える。

  // ログアウトボタンを表示する。そのためにuseEffectを使う
  useEffect(() => { // コールバック関数として実行したい処理を書く。
    navigation.setOptions({
      headerRight: () => <LogOutButton />,
    });
  }, []);// ,[]をつけることで、実行したいものを表示された1回目だけで実行できる

  // データベースからデータを取り出して、表示する
  // データベースからデータを取り出す。
  // まず、保存したデータのリストを取り出したい。
  useEffect(() => {
    const db = firebase.firestore(); // 1.メーモのリストを監視するコード
    const { currentUser } = firebase.auth(); // 3.カレントユーザを取得するコード
    let unsubscribe = () => {};
    // 5.監視をキャンセルする、letは、後から値を再代入できる。constはできない。
    if (currentUser) {
      setLoading(true);
      const ref = db.collection(`users/${currentUser.uid}/memos`).orderBy('updatedAt', 'desc'); // 2.自分のメモリストをrefに入れる
      unsubscribe = ref.onSnapshot((snapshot) => {
        // 6.trueなら、値を再代入
        // 4.refを使ってメモのリストを監視する。snapshotのコールバック関数には、メモのリストが入っている
        const userMemos = []; // 一時的な配列
        snapshot.forEach((doc) => {
          const data = doc.data();
          userMemos.push({
            id: doc.id,
            bodyText: data.bodyText,
            updatedAt: data.updatedAt.toDate(),
            isActive: data.isActive,
            // ドキュメントから加工したデータを入れる。
          });
        });
        setMemos(userMemos);
        setLoading(false);
      }, (error) => {
        setLoading(false);
        Alert.alert('データの読み込みに失敗しました。');
        // onsnapshotにアローファンクションを渡している。二つ目に、この様に書くと、取得したミスの処理をかける。
      });
    }
    return unsubscribe;
  }, []);

  if (memos.length === 0) {
    return (
      <View style={emptyStyles.container}>
        <Loading isLoading={isLoading} />
        <View sytle={emptyStyles.inner}>
          <Text style={emptyStyles.title}>
            最初のメモを作成してみよう
          </Text>
          <Button
            style={emptyStyles.button}
            label="作成する"
            onPress={() => { navigation.navigate('MemoCreate'); }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}/** propsを渡すことで呼び出す側から表示を制御できる */>
      <MemoList memos={memos} />
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

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 24,

  },

  button: {
    alignSelf: 'center',
  },

});
