import React, {useContext} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {changeStatus} from '../store/features/status/gameStatus';
import {FirebaseContext} from './Firebase';
import {GAME_STATUS} from './Firebase/types';
import {useDispatch} from 'react-redux';
import {changeUser} from '../store/features/user/user';

const StartGame = () => {
  const firebase = useContext(FirebaseContext);
  const dispatch = useDispatch();
  function startGame() {
    firebase?.doCreateGame().then((res) => {
      dispatch(changeStatus(GAME_STATUS.WAITING));
      dispatch(
        changeUser({
          isHost: true,
          currentGameId: firebase.auth.currentUser?.uid,
        })
      );
    });
  }

  return (
    <View>
      <Button onPress={startGame} title="Start game" />
    </View>
  );
};

export default StartGame;

const styles = StyleSheet.create({});
