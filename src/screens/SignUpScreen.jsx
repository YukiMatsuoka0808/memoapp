import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Alert,
} from 'react-native';
import firebase from 'firebase';

import Button from '../components/Button';

export default function SignUpScreen(props) {
  const { navigation } = props;
  const [email, setEmail] = useState(''); // emailを設定する。配列からemailとsetemailを取り出している.
  const [password, setPassword] = useState('');// passwordを設定する

  const handlePress = () => { // handlePless
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => { // 会員登録が成功したらコールバック関数を実行する。
        // コールバック関数のなかにuserCredential（ユーザの情報を受け取る）ものを設定。今回はアローファンクション。
        const { user } = userCredential;// userCredentialからuserを取り出す。
        console.log(user.uid);
        navigation.reset({ // 会員登録に成功した場合のみ有効
          index: 0,
          routes: [{ name: 'MemoList' }],
        });
      })
      .catch((error) => { // 会員登録が失敗した場合
        console.log(error.code, error.message);
        Alert.alert(error.code); // エラーをUIに表示
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}> Sign Up</Text>
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
        <Button
          label="Submit"
          onPress={handlePress}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already registerd? </Text>
          <TouchableOpacity onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }}
          >
            <Text style={styles.footerLink}>Log In.</Text>
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
