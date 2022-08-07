import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
/** proptypesから、型を読み込む */
import { string, bool, shape } from 'prop-types';

/** 親コンポーネントからprops(属性)が渡される */
function Hello(props) {
  const { children, bang, style } = props;
  return (
    <View>
      <Text style={[styles.text, style]}/** style を上書き。優先度は、右から順に。 */>
        {`Hello ${children}${bang ? '!' : ''/** 三項演算子。bangがtrueなら、! */}`/** javascのobjectをjsxで使いたい時は、{}を使う。propsの改行を行いたいときは、``を使う */}
      </Text>
    </View>
  );
}

/** proptypeを指定 */
Hello.propTypes = {
  children: string.isRequired,
  bang: bool,
  style: shape(),
};

/** デフォルトの値を設定 */
Hello.defaultProps = {
  bang: false,
  style: null,
};

const styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    backgroundColor: 'blue',
    fontSize: 40,
    fontWeight: 'bold',
    padding: 16,
  },
});

export default Hello;
