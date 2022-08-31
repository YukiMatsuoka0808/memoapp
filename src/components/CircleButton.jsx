import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { string, shape, func } from 'prop-types';

import { Feather } from '@expo/vector-icons';

export default function CircleButton(props) {
  // propsをもらってる
  const { style, name, onPress } = props;
  return (
    <TouchableOpacity
      style={[styles.circleButton, style]}
      onPress={onPress}
    >
      <Feather name={name} size={30} color="white" />
    </TouchableOpacity>
  );
}

CircleButton.propTypes = {
  style: shape(),
  name: string.isRequired,
  onPress: func, // これが関数である。ことを指定
};

CircleButton.defaultProps = {
  style: null,
  onPress: null,
};

/** もし、isRequiredがないならば
 *初期値を与える必要がある。
 *CircleButton.propTypes = {
    children: string,
 };
 */

const styles = StyleSheet.create({
  circleButton: {
    backgroundColor: '#467FD3',
    width: 64,
    height: 64,
    borderRadius: 32, /** これで線を丸にする */
    justifyContent: 'center', /** どこに中心を置くか */
    alignItems: 'center',
    position: 'absolute', /** 丸の位置はアプリ全体で宙に浮いたものになっている */
    right: 40,
    bottom: 40,
    shadowColor: '#000000', /** shadowプロパティはiosのみに対応 */
    shadowOffset: { width: 0, height: 8 }, /** どのくらい影をずらすか。 */
    shadowOpacity: 0.25, /** 黒に対しての透明度はいくらか */
    shadowRadious: 3, /**  */
    elevation: 8, /** Androidのみ対応 どのくらいの高さにあるのかで影をつける */
  },
  circleButtonLabel: {
    color: '#ffffff',
    fontSize: 40,
    lineHeight: 40,
  },
});
