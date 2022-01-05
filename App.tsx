import React from 'react';
import {StyleSheet} from 'react-native';
import {ThemeProvider} from '@shopify/restyle';
import theme from './theme';
import Firebase, {FirebaseContext} from './app/components/Firebase';
import {store} from './app/store/store';
import {Provider} from 'react-redux';
import AppInner from './AppInner';

const App = () => {
  const firebase = new Firebase();

  return (
    <FirebaseContext.Provider value={firebase}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AppInner />
        </ThemeProvider>
      </Provider>
    </FirebaseContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
