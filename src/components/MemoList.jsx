import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Alert, FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  shape, string, instanceOf, arrayOf, bool,
} from 'prop-types';
import firebase from 'firebase';
// import { collection, getDocs } from 'firebase/firestore';
import { dateToString } from '../utils';
// import Flag from './Flag';

export default function MemoList(props) {
  const { memos } = props;
  const navigation = useNavigation();
  // 配列の書き方は後で見直す
  // 動画では、渡されたpropsから値を取り出すにはこう書くと説明されただけ。
  // isActiveは、dbにあるisActiveを利用する。
  // memolistscreenから、memosは、usermemosを引数にとったsetmemosで書き換えられている。
  // そのusermemosは、配列なので、配列からisactiveを取ってきてあげる処理が必要
  const [isActive, setIsActive] = useState(memos.isActive);
  function handlePress(id) {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      // memosから取ってきたisActiveを逆にする。27,28行目はいらない。
      // todo dbのisactiveの値を取得する。
      // ref.get().then((doc) => {
      //   if (doc.exists) {
      //     console.log(doc.get('isActive'));
      //     isActive = doc.get('isActive');
      //   } else {
      //     console.log('false');
      //   }
      // });
      ref.update({
        isActive: !isActive,
      }, { merge: true })
        .then(() => {
          console.log('できた！');
          setIsActive(!isActive);
        })
        .catch((error) => {
          console.log('失敗');
        });
    }
  }

  // function handlePress(id) {
  //   const { currentUser } = firebase.auth();
  //   if (currentUser) {
  //     const db = firebase.firestore();
  //     const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
  //     // todo dbのactivationの値を取得する。
  //     ref.update({
  //     }, { merge: true })
  //       .then(() => {
  //         setActive(!isActive);
  //       })
  //       .catch((error) => {
  //       });
  //   }
  // }

  // useEffect(() => {
  //   function getIsActive(id) {
  //     const { currentUser } = firebase.auth();
  //     if (currentUser) {
  //       const db = firebase.firestore();
  //       const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
  //       // todo dbのactivationの値を取得する。
  //       const unsubscribe = () => {};
  //       ref.onSnapshot((snapshot) => {
  //         // onsnapshotで監視する。コールバック関数を使う。sanpshot
  //         snapshot.forEach((doc) => {
  //           // さらに、docをもらってコールバック関数を渡している。
  //           console.log(doc.id, doc.data());
  //           const isActive = ref.get('isActive');
  //           return isActive;
  //         });
  //       });

  //       return unsubscribe;
  //     }
  //   }
  // });

  // function handlePress(id) {
  //   const isActive = getIsActive(id);
  //   const db = firebase.firestore();
  //   const { currentUser } = firebase.auth();
  //   const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
  //   console.log(isActive);
  //   ref.update({
  //     isActive: !isActive,
  //   }, { merge: true })
  //     .then(() => {

  //     })
  //     .catch((error) => {
  //     });
  // }

  // useeffectを使って、isActiveを監視。監視した状態をflagで利用する。

  // MemolistScreen のmemosをsetMemosで書き換える処理と同じ。

  // function handlePress(id) {
  //   const { currentUser } = firebase.auth();
  //   if (currentUser) {
  //     const db = firebase.firestore();
  //     const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
  //     // todo dbのactivationの値を取得する。
  //     ref.set({
  //     }, { merge: true })
  //       .then(() => {
  //         useEffect(() => {
  //           // DBからデータ取得
  //           const postData = collection(db,"posts");}, []);
  //           console.log(postData)
  //           getDocs(postData).then((snapShot)=>{

  //           });
  //           //console.log(snapShot.docs.map(doc => ({...doc.data})))
  //           setPosts()
  //         });
  //       })
  //       .catch((error) => {
  //       });
  //   }

  function deleteMemo(id) {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      Alert.alert('メモを削除します', 'よろしいですか？', [
        {
          text: 'キャンセル',
          onPress: () => {},
        },
        {
          text: '削除する',
          style: 'destructive',
          onPress: () => {
            ref.delete().catch(() => {
              Alert.alert('削除に失敗しました');
            });
          },
        },
      ]);
    }
  }

  function renderItem({ item }) { // この引数のitemがどこで定義されているのか。
    return (
      <TouchableOpacity
        style={styles.memoListItem}
        onPress={() => { navigation.navigate('MemoDetail', { id: item.id }); }}
      >
        <View>
          <Text style={styles.memoListItemTitle} numberOfLines={1}>{item.bodyText}</Text>
          <Text style={styles.memoListItemDate}>{dateToString(item.updatedAt)}</Text>
        </View>

        <TouchableOpacity
          onPress={() => { handlePress(item.id); }}
        >
          <Feather
            name="flag"
            size={16}
            color={item.isActive ? 'red' : '#B0B0B0'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.memodelite}
          onPress={() => { deleteMemo(item.id); }}
        >
          <View>
            <Feather name="x" size={16} color="#B0B0B0" />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={memos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

MemoList.propTypes = {
  memos: arrayOf(shape({
    id: string,
    bodyText: string,
    isActive: bool, // 追加
    updatedAt: instanceOf(Date),
  })).isRequired,
};
// propsTypesとは？

MemoList.defaultProps = {
};

const styles = StyleSheet.create({
  memoListItem: {
    backgroundColor: '#ffffff',
    flexDirection: 'row', /** このスタイルを当てたコンポーネント同士は横に連なる */
    justifyContent: 'space-between', /** 二つの要素の間にスペースを開けてください */
    paddingVertical: 16, /** ボックスの内側に余白を設けたい 上下からの距離を保つ */
    paddingHorizontal: 19, /**  左右からの距離を保つ */
    alignItems: 'center', /** 垂直方向の制御 */
    borderBottomWidth: 1, /** ボーダーをしく。 */
    borderColor: 'rgba(0,0,0, 0.15)',
  },

  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },

  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: ' #848484',
  },

  memodelite: {
    padding: 8,
  },

  memoflag: {
    padding: 8,
  },

});

// 23行目のisActiveの取り出し方を書き換える。
// idごとにisActiveの値を変更。
// memoからisActiveを取ってくるやり方。

// flatlistでテーブルを取り出している？
// flatlistの引数には、data,renderItemをもらう
// dataには、配列の型で表示するデータを渡す。memosは配列。いろんなmemosが入ってる。
// renderitem 描画するitemを記述する。itemには、dataが入っている
// ひとつ目にセルが描画される際のitemには、{id:"*****",name"",bodytext,isActiceが入ってる}
// keyExtractor={(item) => item.id}
// 各データのユニークなキーとしてitem.idを渡している

// レンダリングとは、現在のpropsとStateを元に、reactコンポーネントに対して、それらがどのように見えるべきか尋ねるプロセス

// react 親コンポーネントがレンダリングされるとその中の全ての子コンポーネントを再起的にレンダリングされる
