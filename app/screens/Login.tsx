import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, Box} from '../components/ThemeComponents';
import SignInForm from '../components/SignInForm';

const Login = ({navigation}: any) => {
  function onSuccess() {
    navigation.navigate('Lobby');
  }

  return (
    <Box>
      <Text variant="header">Welcome</Text>
      <Text variant="body">
        Set a username so your friends will recognize you, or stay anonymous...
      </Text>

      <SignInForm onSuccess={onSuccess} />
    </Box>
  );
};

export default Login;

const styles = StyleSheet.create({});
