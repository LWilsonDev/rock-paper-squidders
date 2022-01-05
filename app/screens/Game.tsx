import React, {useEffect} from "react";
import {Button, StyleSheet, Text, View} from "react-native";

import Constants from "expo-constants";
import shortid from "shortid";
import {getDatabase, ref, onValue, set} from "firebase/database";

const Game = ({route}: any) => {
  const {userId} = route.params;

  function storeScore(score: number) {
    const db = getDatabase();
    const reference = ref(db, "users/" + userId);
    set(reference, {
      highscore: score,
    });
  }

  return (
    <View>
      <Text>GAME</Text>
      <Text>{userId}</Text>
      <Button title="Add score" onPress={() => storeScore(3)} />
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({});
