import React from 'react';
import {
  View, Text, StyleSheet, TextInput,
} from 'react-native';

import Button from '../components/Button';
import AppBar from '../components/AppBar';

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.inner}>
        <Text style={styles.title}> Sign Up</Text>
        <TextInput style={styles.input} value="Email Address" />
        <TextInput style={styles.input} value="Password" />
        <Button label="Submit" />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already registerd? </Text>
          <Text style={styles.footerLink}>Log In</Text>
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
