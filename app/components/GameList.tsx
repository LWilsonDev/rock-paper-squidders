import {onValue, ref} from 'firebase/database';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Game from '../screens/Game';
import {selectGameStatus} from '../store/features/status/gameStatus';
import AcceptGameModal from './AcceptGameModal';
import {FirebaseContext} from './Firebase';
import {IGameData} from './Firebase/types';
import {useSelector} from 'react-redux';
import useStatusListener from './Firebase/hooks/useStatusListener';
import useGamesListener from './Firebase/hooks/useGamesListener';

const GameList = () => {
  const firebase = useContext(FirebaseContext);

  const [showChallengeModal, setShowChallengeModal] = useState<boolean>(false);
  const [games, setGames] = useState<IGameData[]>([]);

  // function setupGameListener() {
  //   if (!firebase) return;

  //   const games: IGameData[] = [];
  //   const gamesRef = ref(firebase.db, 'games/');
  //   onValue(gamesRef, (snapshot) => {
  //     snapshot.forEach(function (childSnapshot) {
  //       var childDataVal = childSnapshot.val();
  //       var childDataKey = childSnapshot.key;

  //       childDataVal.id = childDataKey;
  //       games.push(childDataVal);
  //     });

  //     console.log('GAME CHANGE');

  //     setGames(games);
  //   });
  // }

  // if game status is challenge and hostId == userId, show challenge modal
  // useEffect(() => {
  //   if
  // }, [])

  // const status = useSelector(selectGameStatus);
  const status = useStatusListener();
  const gamesList = useGamesListener();

  useEffect(() => {
    if (gamesList !== games) {
      console.log('games list', gamesList);
      setGames(gamesList);
    }
  }, [gamesList]);

  return (
    <>
      <View>
        <Text>Players waiting:</Text>
        <Text>Status: {status}</Text>
        {games.map((item: IGameData) => {
          return <Text key={item.uid}>{item.displayName}</Text>;
        })}
      </View>
      {/* <AcceptGameModal visible={showChallengeModal} /> */}
    </>
  );
};

export default GameList;

const styles = StyleSheet.create({});
