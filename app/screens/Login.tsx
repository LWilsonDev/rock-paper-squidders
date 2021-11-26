import React, {useState} from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Constants from "expo-constants";

import Pusher from "pusher-js/react-native";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const PUSHER_API_KEY = Constants.manifest?.extra?.pusherApiKey;
  const APP_CLUSTER = Constants.manifest?.extra?.appClusterApiKey;

  return (
    <View>
      <Text>LOGIN</Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
