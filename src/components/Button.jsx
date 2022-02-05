import { string } from "prop-types";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Button(props) {
  const { label } = props;

  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </View>
  );
}

Button.propTypes = {
  label: string.isRequired,
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "crimson",
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 24,
  },
  buttonLabel: {
    fontSize: 16,
    lineHeight: 32,
    paddingHorizontal: 24,
    paddingVertical: 8,
    color: "#ffffff",
  },
});
