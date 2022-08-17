import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Alert,
} from 'react-native';
import firebase from 'firebase';

import Button from '../components/Button';

export default function LoginScreen(props) {
  const { navigation } = props;
  const [email, setEmail] = useState(''); // emailを設定する。配列からemailとsetemailを取り出している.
  const [password, setPassword] = useState('');// passwordを設定する

  /** useEffect(() => {
    console.log('useEffect!'); //表示された瞬間にuseEffectの画面が出る。
    return () => {
      console.log('Unmount!');
    };
  }, []); */

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      // ユーザが常にログインしているかを確認する
      if (user) { // 画面の遷移
        navigation.reset({ // routeでnavigationを上書きして
          index: 0, // index 0番目に戻って。つまりbackボタンは出ない
          routes: [{ name: 'MemoList' }],
        });
      }
    });
    return unsubscribe;
  }, []); // 配列に値を入れておけば、その値が変更されたときのみに監視してくれる。

  function handlePress() {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        console.log(user.uid);
        navigation.reset({ // routeでnavigationを上書きして
          index: 0, // index 0番目に戻って。つまりbackボタンは出ない
          routes: [{ name: 'MemoList' }],
        });
      })
      .catch((error) => {
        console.log(error.code, error.message);
        Alert.alert(error.code);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}> Log In</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => { setEmail(text); }}// テキストを入力できるように
          autoCapitalize="none" // 最初を小文字に
          keyboardType="email-address"
          placeholder="Email Address"// 何も書いてないときにうっすら
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => { setPassword(text); }}
          autoCapitalize="none"
          secureTextEntry // 不可視化 デフォルトでtrue
          placeholder="password"
          textContentType="password"
        />

        <Button // Buttonコンポーネントに以下のpropsを渡せるように設定してないといけない
          label="Submit"
          onPress={handlePress}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Not registered? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'SignUp' }],
              });
            }}
          >
            <Text style={styles.footerLink}>Sign up here.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ' #F0F4F8',

  },

  inner: {
    paddingHorizontal: 27,
    paddingVertical: 24,
  },

  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },

  input: {
    fontSize: 16,
    height: 48,
    lineHeihgt: 32,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    backgroundColor: ' #ffffff',
    paddingHorizontal: 8,
    marginBottom: 16,
  },

  footerText: {
    fontSize: 14,
    lineHeight: 24,

  },

  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: '#467FD3',
    marginRight: 8,
  },

  footer: {
    flexDirection: 'row',
  },

});
