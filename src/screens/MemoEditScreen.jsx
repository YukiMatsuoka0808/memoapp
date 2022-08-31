import React, { useState } from 'react';
import {
  View, TextInput, StyleSheet, KeyboardAvoidingView, Alert,
} from 'react-native';
import { shape, string } from 'prop-types';
import firebase from 'firebase';
import CircleButton from '../components/CircleButton';
import { translateErrors } from '../utils';

export default function MemoEditScreen(props) {
  const { navigation, route } = props; // この仕組みはnavigationが提供している
  const { id, bodyText, aa } = route.params; // bodytextは、memodetailスクリーンから取り出してきたbody
  const [body, setBody] = useState(bodyText);

  const [aaa, setAaa] = useState(aa);

  function handlePress() {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      ref.set({
        bodyText: body,
        updatedAt: new Date(),
      }, { merge: true })
        .then(() => {
          navigation.goBack();
        })
        .catch((error) => {
          const errorMsg = translateErrors(error.code);
          Alert.alert(errorMsg.title, errorMsg.description);
        });
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.inputContainer}>
        <TextInput
          value={body}
          multiline
          style={styles.input}
          onChangeText={(text) => { setBody(text); }}
        />
      </View>
      <CircleButton
        name="check"
        onPress={handlePress}
      />
    </KeyboardAvoidingView>
  );
}

MemoEditScreen.propTypes = {
  route: shape({
    params: shape({ id: string, bodyText: string }),
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inputContainer: {
    paddingHorizontal: 27,
    paddingVertical: 32,
    flex: 1,
  },

  input: {
    flex: 1,
    textAlignVertical: 'top', /** Androidで、真ん中に保つ */
    fontSize: 16,
    lineHeight: 24,
  },

});
