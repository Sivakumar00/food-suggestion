import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

const VideoScreen = props => {
  const { url } = props.route.params;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ecf0f1'
        }}
        javaScriptEnabled={true}
        source={{
          uri: 'https://www.youtube.com/embed/' + url + '?rel=0&autoplay=0&showinfo=0'
        }}
      />
    </View>
  );
};

export default VideoScreen;
