import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import {
  TouchableOpacity,
} from 'react-native';
import { bool, func } from 'prop-types';

export default function Flag(props) {
  const { onPress, isActive } = props;
  // const { route } = props;

  // onPressとisActiveの型は何か。
  // propsをもらっている。

  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <Feather
        name="flag"
        size={16}
        color={isActive ? 'red' : '#B0B0B0'}
        // ? の左は、trueかfalseか。
        // ?は、tureなら、red。
        // isActiveはDBから取ってきたもの、db上では、tureかfalse
        // dbは、全部trueなので、本来は、全部赤になるはず、、
      />
    </TouchableOpacity>
  );
}

Flag.propTypes = {
  isActive: bool,
  onPress: func,
//   route: shape({
//     params: shape({ isActive: bool }),
//   }).isRequired,
};

Flag.defaultProps = {
  isActive: false,
  onPress: null,
};

// 現状：ログアウト後、フラグが立つか立たないかは、usestate(false)に依存する
// falseは立たない。trueはたつ

// proptypesをかく。
// defaultの方も書く。

// MemoDetailscreen14行目
// const { id } = route.params;
// ここの意味を調べる。memolistの18行目
// routeはnavigationによって提供されているrouteも全ての登録されているスクリーンで受け取ることができる。
// routeの中にparams、その中に先ほど渡したidが入っている。
// 渡すには、渡す側でnavigation.navigateの第二引数に入れる必要がある。
// memolistの方でnavigation.navigateの第二引数として渡して、detailscreenで、もらう。

// MemoListの行19目 配列見なおす。
// 配列は、オブジェクト型だから？185行目でmemosは元々配列だから、arrayOfという新しいproptypesを定義している
// memosにはオブジェクトが入るのではなくて、objectの配列が入ってくる。なので、objectが一つだけは間違いなので、arrayOfとして配列だよと定義。
// arrayOfで配列と定義。その中に入ってくるのは、stringやbool型などのidオブジェクトやbodytextオブジェクトです。
// const { isActive } = memos;
// 配列の書き方は後で見直す

// 25行目にconsole.log('できた！');を書くと、ログインしてmemolistを表示したら、memoの数*3できた！ってでる。なんで？

// マウントされるごとに出る。（削除したときも出る。listscreenで監視されているから）

// ログインされた後もhandlePressが実行されてしまう理由：ログイン後に、flagを表示するために、onpressが一度実行される。

// リストの内容を表示するだけ

// memolist 180行目でitem.isActiveを渡すとずっとハンドルプレスがはしる。なぜ
