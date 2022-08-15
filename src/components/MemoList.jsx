import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MemoList() {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        style={styles.memoListItem}
        onPress={() => { navigation.navigate('MemoDetail'); }}
      >
        <View /**コンテンツブロック */>
          <Text style={styles.memoListItemTitle}>買い物リスト</Text>
          <Text style={styles.memoListItemDate}>2020年12月24日</Text>
        </View>
        <TouchableOpacity
          style={styles.memodelite}
          onPress={() => { Alert.alert(' Are you sure?'); }}>
          <View>
            <Feather name="x" size={16} color="#B0B0B0" />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.memoListItem}
        onPress={() => { navigation.navigate('MemoDetail'); }}
      >
        <View /**コンテンツブロック */>
          <Text style={styles.memoListItemTitle}>買い物リスト</Text>
          <Text style={styles.memoListItemDate}>2020年12月24日</Text>
        </View>
        <TouchableOpacity
          style={styles.memodelite}
          onPress={() => { Alert.alert(' Are you sure?'); }}>
          <View>
            <Feather name="x" size={16} color="#B0B0B0" />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.memoListItem}
        onPress={() => { navigation.navigate('MemoDetail'); }}
      >
        <View /**コンテンツブロック */>
          <Text style={styles.memoListItemTitle}>買い物リスト</Text>
          <Text style={styles.memoListItemDate}>2020年12月24日</Text>
        </View>
        <TouchableOpacity
          style={styles.memodelite}
          onPress={() => { Alert.alert(' Are you sure?'); }}>
          <View>
            <Feather name="x" size={16} color="#B0B0B0" />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

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
