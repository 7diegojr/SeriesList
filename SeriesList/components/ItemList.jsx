import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function ItemList({ item, markSeries, unmarkSeries, markEpisode, unmarkEpisode, removeSeries }) {
  const renderEpisode = ({ item: episode }) => (
    <View style={styles.episodeContainer}>
      <Text style={episode.completed ? styles.episodeCompleted : styles.episode}>
        {episode.name}
      </Text>
      <TouchableOpacity
        style={styles.actionIcon}
        onPress={() =>
          episode.completed
            ? unmarkEpisode(item.id, episode.id)
            : markEpisode(item.id, episode.id)
        }
      >
        <Ionicons
          name={episode.completed ? 'checkmark-circle-outline' : 'checkmark-circle'}
          size={24}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );


  return (
    <View style={styles.seriesContainer}>
      <View style={styles.seriesHeader}>
        <Text style={item.completed ? styles.seriesCompleted : styles.series}>
          {item.name}
        </Text>
        <View style={styles.seriesActions}>
          <TouchableOpacity
            style={styles.actionIcon}
            onPress={() => (item.completed ? unmarkSeries(item.id) : markSeries(item.id))}
          >
            <Ionicons
              name={item.completed ? 'checkmark-circle-outline' : 'checkmark-circle'}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionIcon, { backgroundColor: 'darkred' }]}
            onPress={() => removeSeries(item.id)}
          >
            <Ionicons name="trash-bin-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={item.episodes}
        renderItem={renderEpisode}
        keyExtractor={(episode) => episode.id.toString()}
        style={styles.episodeList}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  seriesContainer: {
    backgroundColor: '#000000c0',
    padding: 15,
    borderRadius: 7,
    borderColor: 'white',
    borderWidth: 2,
    marginVertical: 5,
  },
  seriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  series: {
    flex: 1,
    color: '#fff',
    fontSize: 24,
    textDecorationLine: 'none',
  },
  seriesCompleted: {
    flex: 1,
    color: '#fff',
    fontSize: 24,
    textDecorationLine: 'line-through',
  },
  seriesActions: {
    flexDirection: 'row',
  },
  episodeList: {
    marginTop: 10,
    marginLeft: 20,
  },
  episodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  episode: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    textDecorationLine: 'none',
  },
  episodeCompleted: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    textDecorationLine: 'line-through',
  },
  actionIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'darkgreen',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});