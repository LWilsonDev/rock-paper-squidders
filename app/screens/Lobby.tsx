import React, {useContext, useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import {getDatabase, off, onValue} from '@firebase/database';

import {ref, remove} from 'firebase/database';
import {getAuth} from '@firebase/auth';
import {Box} from '../components/ThemeComponents';
import StartGame from '../components/StartGame';
import GameList from '../components/GameList';
import {FirebaseContext} from '../components/Firebase';

const Lobby = ({route, navigation}: any) => {
  type player = {id: string | null; number: number; username: string};
  const [currentPlayers, setCurrentPlayers] = useState<player[]>([]);
  const firebase = useContext(FirebaseContext);

  // const db = getDatabase();
  // const users = ref(db, 'users/');
  //   onValue(users, (snapshot) => {
  //     const data = snapshot.val();
  //     console.log("WE HAVE USRRS", data);
  //   });
  //const auth = getAuth();
  // const user = {
  //   id: auth.currentUser?.uid,
  //   username: auth.currentUser?.displayName ?? 'anon',
  // };
  // const userRef = ref(db, 'users/' + user.id);

  //   useEffect(() => {
  //     onValue(users, (snapshot) => {
  //         const data = snapshot.val();
  //         console.log("WE HAVE USRRS", data);
  //       });
  //       .onSnapshot(querySnapshot => {
  //         const threads = querySnapshot.docs.map(documentSnapshot => {
  //           return {
  //             _id: documentSnapshot.id,
  //             name: '',
  //             latestMessage: { text: '' },
  //             ...documentSnapshot.data()
  //           }
  //         })

  //         setThreads(threads)
  //         console.log(threads)
  //         if (loading) {
  //           setLoading(false)
  //         }
  //       })

  //     return () => off(users)
  //   }, [])

  //   onValue(users, (snapshot) => {
  //     const players: player[] = [];
  //     snapshot.forEach((childSnapshot) => {
  //       const childKey = childSnapshot.key;
  //       const childData = childSnapshot.val();
  //       console.log("childKey", childKey);
  //       console.log("childData", childData);
  //       players.push({
  //         id: childKey,
  //         number: 1,
  //         username: childData.displayName ?? "anon",
  //       });
  //       // ...
  //     });
  //     setCurrentPlayers(players);
  //   });

  function handleExit() {
    firebase?.exitGame();
    navigation.navigate('Login');
  }

  function handlePlayerPress(id: string) {
    console.log('selected player', id);
  }

  return (
    <View>
      <Button title="exit" onPress={handleExit} />
      <StartGame />
      {/* <Text>{user.username}</Text> */}
      <GameList />
    </View>
  );
};

export default Lobby;

const styles = StyleSheet.create({});
