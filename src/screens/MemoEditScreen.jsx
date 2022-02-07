import React, { useState } from "react";
import { View, StyleSheet, TextInput, Alert } from "react-native";
import { shape, string } from "prop-types";
import CircleButton from "../components/CircleButton";
import KeyboardSafeView from "../components/KeyboardSafeView";
import firebase from "firebase";
import { translateError } from "../utils";

export default function MemoEditScreen(props) {
  const { navigation, route } = props;
  const { id, bodyText } = route.params;
  const [body, setBody] = useState(bodyText);

  function handlePress() {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      ref
        .set(
          {
            bodyText: body,
            updatedAt: new Date(),
          },
          { merge: true }
        )
        .then(() => {
          navigation.goBack();
        })
        .catch((error) => {
          const errorMsg = translateError(error.code);
          Alert.alert(errorMsg.title, errorMsg.description);
        });
    }
  }
  return (
    <KeyboardSafeView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => {
            setBody(text);
          }}
          value={body}
          multiline
          style={styles.input}
          autoCapitalize="none"
        />
      </View>
      <CircleButton name="check" onPress={handlePress} />
    </KeyboardSafeView>
  );
}

MemoEditScreen.propTypes = {
  route: shape({
    params: shape({
      id: string,
      bodyText: string,
    }),
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inputContainer: {
    paddingVertical: 32,
    paddingHorizontal: 27,
    flex: 1,
  },

  input: {
    flex: 1,
    textAlignVertical: "top",
    fontSize: 16,
    lineHeight: 24,
  },
});
