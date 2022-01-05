import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface GameButtonProps {
  //   onPress: (id: string) => void;
  displayName: string;
  id: string;
}

const GameButton: React.FC<GameButtonProps> = ({displayName, id}) => {
  function onPress() {
    // change state of game and players
    // show modal to other player
  }

  return (
    <Pressable onPress={() => onPress()} style={styles.pressable}>
      <Text>{displayName}</Text>
    </Pressable>
  );
};

export default GameButton;

const styles = StyleSheet.create({
  pressable: {
    minHeight: 30,
  },
});
