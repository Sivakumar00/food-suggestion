import React, { useEffect, useState } from 'react';
import { Provider } from 'mobx-react';
import Store from './src/store/Store';
import AppContainer from './src/container/AppContainer';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { colors } from './src/styles/colors';
import { Keys } from './src/utils/Keys';
import NetInfo from '@react-native-community/netinfo';
import NoConnection from './src/presentation/NoConnection';

const App = () => {
  const [isLoading, setisLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    getApiKey();
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const getApiKey = () => {
    fetch('https://api.myjson.com/bins/1fb4k8')
      .then(response => response.json())
      .then(response => {
        Keys.API_KEY = response.key;
        setisLoading(false);
      })
      .catch(error => {
        setisLoading(false);
      });
  };

  return (
    <Provider {...Store}>
      {isConnected ? (
        isLoading ? (
          <View style={styles.container}>
            <ActivityIndicator size={'large'} color={colors.primary} />
          </View>
        ) : (
          <AppContainer />
        )
      ) : (
        <NoConnection />
      )}
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});

export default App;
