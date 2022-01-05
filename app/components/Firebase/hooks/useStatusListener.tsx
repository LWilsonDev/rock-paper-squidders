import {ref, onValue} from 'firebase/database';
import {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FirebaseContext} from '..';
import {changeStatus} from '../../../store/features/status/gameStatus';
import {selectUserInfo} from '../../../store/features/user/user';
import {GAME_STATUS} from '../types';

const useStatusListener = () => {
  const [status, setStatus] = useState<GAME_STATUS | null>(null);

  const dispatch = useDispatch();

  const firebase = useContext(FirebaseContext);
  const db = firebase?.db;
  const user = useSelector(selectUserInfo);
  const currentGameId = user.currentGameId ?? firebase?.auth?.currentUser?.uid;

  useEffect(() => {
    if (!db || !currentGameId) {
      return;
    }
    console.log('current game id', currentGameId);
    const statusRef = ref(db, 'games/' + currentGameId + '/status');
    const listenerUnsubscribe = onValue(statusRef, (snapshot) => {
      const data = snapshot.val();
      //console.log('got data from status listener', data);
      if (status !== data) {
        setStatus(data);
        //console.log('setting status');
        dispatch(changeStatus(data));
      }
    });

    return () => {
      listenerUnsubscribe();
      console.log('unsubscribed status listener');
    };
  });

  return status;
};

export default useStatusListener;
