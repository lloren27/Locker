import React from 'react';
import {Image, TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-ionicons';

// View incluye display flex --> por defecto es colunm

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  image: {
    width: 100,
    height: 70,
  },
  icon: {
    color: 'black',
    marginLeft: 'auto',
  },
  text: {
    paddingLeft: 10,
    justifyContent: 'center',
    display: 'flex',
  },
});

const SneakerListItem = ({sneakers, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: sneakers.cover}} />
        <Text style={styles.text}>{sneakers.name}</Text>
        <Icon ios="ios-add" android="md-add" style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

export default SneakerListItem;
