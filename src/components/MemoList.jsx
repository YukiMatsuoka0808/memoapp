import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Alert, FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  shape, string, instanceOf, arrayOf,
} from 'prop-types';
import { dateToString } from '../utils';

export default function MemoList(props) {
  const { memos } = props;
  const navigation = useNavigation();

  function renderItem({ item }) {
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
          style={styles.memodelite}
          onPress={() => { Alert.alert(' Are you sure?'); }}
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
        keyExtractor={(item) => item.id} // ()の中でitemというobjectを受け取り、{}を実施する。
      />
    </View>
  );
}

MemoList.propTypes = {
  memos: arrayOf(shape({
    id: string,
    bodyText: string,
    updatedAt: instanceOf(Date),
  })).isRequired,
};

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

});
