import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { string } from 'prop-types';

export default function Button(props){
  const { label } = props;/** buttonlabelを親のコンポーネントから渡せるようにする */
  //propsを使って、labelというプロパティを受け取っている。
  return (
    <View style={styles.buttoncontainer}>
    <Text style={styles.buttonlabel}>{label}</Text>
  </View>
  );
}

Button.propTypes = {
  label: string.isRequired,
};

const styles = StyleSheet.create({
  buttoncontainer: {
    backgroundColor: '#467FD3',
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 24,
  },

  buttonlabel: {
    fontSize: 16,
    lineHeight: 32,
    paddingVertical: 8,
    paddingHorizontal: 32,
    color: '#FFFFFF',

  },
});
