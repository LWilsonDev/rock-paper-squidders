import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {changeUser} from '../store/features/user/user';

import {FirebaseContext} from './Firebase';

interface SignInProps {
  onSuccess: () => void;
}

const SignInForm: React.FC<SignInProps> = ({onSuccess}) => {
  const [username, setUsername] = useState<string>('');
  const firebase = React.useContext(FirebaseContext);

  const dispatch = useDispatch();

  const enter = () => {
    firebase?.doSignIn().then((res) => {
      firebase.addPlayerDetails(username);
      dispatch(changeUser({username: username, id: res.user.uid}));
      onSuccess();
    });
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
      />
      <Button title="Enter" onPress={() => enter()} />
    </View>
  );
};

export default SignInForm;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
