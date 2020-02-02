import React, { useState } from 'react';
import { View, Image, TouchableOpacity, TextInput, StyleSheet, FlatList, Text } from 'react-native';
import { colors } from '../styles/colors';
import { getVideos } from '../services/ReceipeService';
import { Card } from 'react-native-paper';

const Videos = props => {
  const [searchText, setSearchText] = useState('');
  const [videoList, setVideoList] = useState([]);

  const handleOnClickSearch = () => {
    getVideos(searchText).then((response: any) => {
      if (response && response.videos.length) {
        setVideoList(response.videos);
      } else {
        alert('No videos found');
      }
    });
  };

  const handleOnClickVideo = item => {
    props.navigation.navigate('VideoScreen', {
      url: item.youTubeId
    });
  };

  const renderRecipeList = ({ item, index }) => {
    return (
      <Card elevation={1} style={{ marginTop: 10 }}>
        <TouchableOpacity style={{ width: '100%', height: 300 }} onPress={() => handleOnClickVideo(item)}>
          <View>
            <Image
              style={{ width: '100%', height: 200, borderRadius: 5, resizeMode: 'cover' }}
              source={{ uri: item.thumbnail }}
            />
            <View style={{ height: 100, width: '100%', padding: 10 }}>
              <Text style={styles.titleStyle}>{item.title}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <View style={{ width: '100%', height: '100%', padding: 10 }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          marginTop: 10
        }}
      >
        <View style={styles.textInputContainerStyle}>
          <TextInput
            placeholder={'Search videos'}
            style={styles.textInputStyle}
            value={searchText}
            onChangeText={text => setSearchText(text)}
          />
          {!!searchText && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Image source={require('../../assets/cancel.png')} style={styles.cancelImage} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={handleOnClickSearch}
          style={{
            borderRadius: 100,
            backgroundColor: colors.primary,
            width: 40,
            height: 40,
            alignItems: 'center',
            marginLeft: 5,
            marginRight: 10,
            justifyContent: 'center'
          }}
        >
          <Image
            source={require('../../assets/search.png')}
            style={{ width: 10, height: 10, padding: 10, tintColor: 'white' }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, marginTop: 10 }}>
        <FlatList
          data={videoList}
          renderItem={renderRecipeList}
          keyExtractor={(item, index) => item.youTubeId + index}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    height: 40,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 10
  },
  titleStyle: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'left',
    width: '100%',
    padding: 3,
    color: colors.primary
  },
  textInputStyle: {
    width: '95%',
    height: 40
  },
  cancelImage: {
    width: 13,
    height: 13,
    resizeMode: 'contain'
  }
});

export default Videos;
