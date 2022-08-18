import React from 'react';
import {
  TouchableOpacity, Text, StyleSheet,
} from 'react-native';

import { string, func, shape } from 'prop-types';

export default function Button(props) {
  const { label, onPress, style } = props;
  /** buttonlabelを親のコンポーネントから渡せるようにする */
  // propsを使って、labelというプロパティを受け取っている。
  return (
    <TouchableOpacity style={[styles.buttoncontainer, style]} onPress={onPress}>
      <Text style={styles.buttonlabel}>{label}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  label: string.isRequired,
  onPress: func,
  style: shape(),
};

Button.defaultProps = {
  onPress: null,
  style: null,
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
