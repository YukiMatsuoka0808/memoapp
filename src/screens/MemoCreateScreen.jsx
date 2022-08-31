import React, { useState /** ユーザの入力した情報を保持する */ } from 'react';
import {
  View, TextInput, StyleSheet, KeyboardAvoidingView,
} from 'react-native';
import firebase from 'firebase';
import CircleButton from '../components/CircleButton';
// import Flag from '../components/Flag';

export default function MemoCreateScreen(props) {
  const { navigation } = props;
  const [bodyText, setBodyText] = useState('');
  // ユーザの入力した情報を保持する変数を宣言

  function handlePress() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    // 参照結果をdbに格納
    const ref = db.collection(`users/${currentUser.uid}/memos`); // 現在ログインしているユーザのログインをかく。
    ref.add({
      bodyText, /** bodyTextをfirestoreに保存 */
      updatedAt: new Date(),
      isActive: false,
    })
      .then((docRef) => {
        console.log('Created!', docRef.id);
        navigation.goBack();
      })
      .catch((error) => {
        console.log('Error!', error);
      });
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.inputContainer}>
        <TextInput
          value={bodyText}
          multiline
          style={styles.input}
          onChangeText={(text) => { setBodyText(text); }} /** onchangetextのプロパティを追加 */
          autoFocus
        />
      </View>
      {/* <Flag
        onPress={active}
      /> */}
      <CircleButton
        name="check"
        onPress={handlePress}
        // propsを渡してる
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inputContainer: {
    paddingHorizontal: 27,
    paddingVertical: 32,
    flex: 1,
  },

  input: {
    flex: 1,
    textAlignVertical: 'top', /** Androidで、真ん中に保つ */
    fontSize: 16,
    lineHeight: 24,
  },

});
