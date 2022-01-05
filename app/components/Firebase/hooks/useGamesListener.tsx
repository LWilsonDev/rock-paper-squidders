import {ref, onValue} from 'firebase/database';
import {useCallback, useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FirebaseContext} from '..';

import {GAME_STATUS, IGameData} from '../types';

const useGamesListener = () => {
  const [games, setGames] = useState<IGameData[]>([]);

  const firebase = useContext(FirebaseContext);
  const db = firebase?.db;

  const setGamesArr = useCallback(
    (gamesArr) => {
      if (gamesArr !== games) {
        setGames(gamesArr);
      }
    },
    [games]
  );
  const gamesArr: IGameData[] = [];

  useEffect(() => {
    if (!db) {
      return;
    }
    // console.log('current game id', currentGameId);

    // TODO change to a single call and move elsewhere? listener is being hit too many times as any change to children causes change
    const gamesRef = ref(db, 'games/');
    const listenerUnsubscribe = onValue(gamesRef, (snapshot) => {
      console.log('SNAPSHOT', snapshot);
      snapshot.forEach(function (childSnapshot) {
        var childDataVal = childSnapshot.val();
        var childDataKey = childSnapshot.key;

        childDataVal.id = childDataKey;
        gamesArr.push(childDataVal);
      });
      //setGamesArr(gamesArr);
    });

    return () => {
      listenerUnsubscribe();
      console.log('unsubscribed games listener');
    };
  });

  return gamesArr;
};

export default useGamesListener;
