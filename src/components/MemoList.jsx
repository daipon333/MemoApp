import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { shape, string, instanceOf, arrayOf } from "prop-types";
import Icon from "./icon";
import { dateToString } from "../utils";
import firebase from "firebase";

export default function Memolist(props) {
  const { memos } = props;
  const navigation = useNavigation();
  function deleteMemo(id) {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      Alert.alert("メモを削除します", "よろしいですか？", [
        {
          text: "キャンセル",
          onPress: () => {},
        },
        {
          text: "削除する",
          style: "destructive",
          onPress: () => {
            ref.delete().catch(() => {
              Alert.alert("削除に失敗しました");
            });
          },
        },
      ]);
    }
  }

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.memoListItem}
        onPress={() => {
          navigation.navigate("MemoDetail", { id: item.id });
        }}
      >
        <View>
          <Text style={styles.memoListItemTitle} numberOfLines={1}>
            {item.bodyText}
          </Text>
          <Text style={styles.memoListItemDate}>
            {dateToString(item.updatedAt)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.MemoDelete}
          onPress={() => {
            deleteMemo(item.id);
          }}
        >
          <Icon name="delete" size={16} color="#B0B0B0" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={memos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

Memolist.propTypes = {
  memos: arrayOf(
    shape({
      id: string,
      bodyText: string,
      updateAt: instanceOf(Date),
    })
  ).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  memoListItem: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 19,
    paddingVertical: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: "#848484",
  },
  MemoDelete: {
    padding: 8,
  },
});
