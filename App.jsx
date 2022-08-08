import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.appbar}>
        <View style={styles.appbarInner}>
          <Text style={styles.appbarTitle}>Memo App</Text>
          <Text style={styles.appbarRight}>ログアウト</Text>
        </View>
      </View>

      <View /** div的な */>
        <View style={styles.memoListItem}>
          <View /**コンテンツブロック */>
            <Text style={styles.memoListItemTitle}>買い物リスト</Text>
            <Text style={styles.memoListItemDate}>2020年12月24日</Text>
          </View>
          <Text>X</Text>
        </View>
      </View>

      <View /** div的な */>
        <View style={styles.memoListItem}>
          <View /**コンテンツブロック */>
            <Text style={styles.memoListItemTitle}>買い物リスト</Text>
            <Text style={styles.memoListItemDate}>2020年12月24日</Text>
          </View>
          <Text>X</Text>
        </View>
      </View>

      <View /** div的な */>
        <View style={styles.memoListItem}>
          <View /**コンテンツブロック */>
            <Text style={styles.memoListItemTitle}>買い物リスト</Text>
            <Text style={styles.memoListItemDate}>2020年12月24日</Text>
          </View>
          <Text>X</Text>
        </View>
      </View>

      <View style={styles.circleButton}>
        <Text style={styles.circleButtonLabel}>+</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, /** コンテナの設定を画面いっぱいに反映してくださいね。一番外側のviewに */
    backgroundColor: '#F0F4F8', /** white */
    /** alignItems: 'center',
    justifyContent: 'flex-start', /** flex-start上にflex-end下に */
  },

  appbar: {
    width: '100%',
    height: 104,
    backgroundColor: '#467FD3', /** blue */
    justifyContent: 'flex-end',
  },

  appbarInner: {
    alignItems: 'center',
  },

  appbarRight: {
    position: 'absolute', /** ログアウト の位置  */
    right: 19,
    bottom: 16,
    color: 'rgba(255,255,255,0.8)',
  },

  appbarTitle: {
    marginBottom: 8,
    fontSize: 22,
    lineHeight: 32,
    color: '#ffffff',
    fontWeight: 'bold',
  },

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
