import Constants from 'expo-constants';
import app, {initializeApp} from 'firebase/app';
import {Auth, getAuth, signInAnonymously} from 'firebase/auth';
import {
  child,
  Database,
  get,
  getDatabase,
  onValue,
  ref,
  remove,
  set,
} from 'firebase/database';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {IGameData, GAME_STATUS} from './types';

const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.firebaseApiKey,
  authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
  projectId: Constants.manifest?.extra?.firebaseProjectId,
  storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.manifest?.extra?.firebaseMessagingId,
  appId: Constants.manifest?.extra?.firebaseAppId,
  measurementId: Constants.manifest?.extra?.firebaseMeasurementId,
  databaseURL: Constants.manifest?.extra?.firebaseDatabaseURL,
};

class Firebase {
  auth: Auth;
  db: Database;

  constructor() {
    initializeApp(firebaseConfig);
    this.auth = getAuth();
    this.db = getDatabase();
  }

  doSignOut = () => this.auth.signOut();
  doSignIn = () => signInAnonymously(this.auth);

  userRef = () => ref(this.db, 'users/' + this.auth.currentUser?.uid);

  addPlayerDetails = (username: string | null) => {
    // const reference = ref(this.db, 'users/' + this.auth.currentUser?.uid);
    const playerNumber = this.generateValidPlayerNumber();
    set(this.userRef(), {
      displayName: username ?? 'anon.',
      number: playerNumber,
    });
  };

  getPlayerNumber = async () => {
    const userId = this.auth.currentUser?.uid;
    let number = 0;
    get(child(ref(this.db), `users/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        number = data['number'];
      }
      return number;
    });
  };

  generateValidPlayerNumber = () => {
    //TODO check for existing
    const dec = Math.random() * 1000;
    const num = Math.floor(dec);
    return num;
  };

  doCreateGame = async () => {
    let number = 0;
    const userId = this.auth.currentUser?.uid;
    await get(child(ref(this.db), `users/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        number = data['number'];
      }
    });

    const data: IGameData = {
      uid: userId,
      displayName: number,
      status: GAME_STATUS.WAITING,
      host: {id: userId},
      challenger: {id: ''},
      timestamp: Date.now(),
      round: '',
      currentPlayer: '',
      score: {player1: 0, player2: 0},
      turnTime: 60000,
    };

    set(ref(this.db, 'games/' + userId), data);
  };

  updateGameStatus = (status: GAME_STATUS) => {
    const userId = this.auth.currentUser?.uid;
    set(ref(this.db, 'games/' + userId), {
      status: status,
    });
  };

  initiateGameChallenge = () => {
    const userId = this.auth.currentUser?.uid;
    set(ref(this.db, 'games/' + userId), {
      status: GAME_STATUS.CHALLENGING,
      challenger: {id: userId},
    });
  };

  getGames = () => {
    const gamesRef = ref(this.db, 'games/');
    onValue(gamesRef, (snapshot: {val: () => any}) => {
      const data = snapshot.val();
      return data;
    });
  };

  exitGame = () => {
    this.auth.signOut().then(() => {
      //remove(this.userRef());
    });
    remove(this.userRef());
    this.updateGameStatus(GAME_STATUS.EXITED);
  };
}

export default Firebase;
