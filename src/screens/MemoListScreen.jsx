import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Memolist from "../components/MemoList";
import CircleButton from "../components/CircleButton";

export default function MemoListScreen(props) {
  const { navigation } = props;
  return (
    <TouchableOpacity style={styles.container}>
      <Memolist />
      <CircleButton
        name="plus"
        onPress={() => {
          navigation.navigate("MemoCreate");
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
});
