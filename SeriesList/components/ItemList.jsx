import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'

export default function ItemList({ item, markSeries, unmarkSeries, markEpisode, unmarkEpisode, removeSeries }) {
  const handleMarkSeries = () => {
    item.episodes.forEach(ep => {
      if (!ep.completed) markEpisode(item.id, ep.id);
    });
    markSeries(item.id);
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.seriesHeader}>
        <Text style={item.completed ? styles.seriesCompleted : styles.seriesTitle}>{item.name}</Text>
        <View style={styles.actions}>
          {!item.completed ? (
            <TouchableOpacity onPress={handleMarkSeries} style={styles.actionIcon}>
              <Feather name='check-square' size={24} color='#fff' />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => unmarkSeries(item.id)} style={styles.actionIcon}>
              <Ionicons name='refresh-outline' size={24} color='#fff' />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => removeSeries(item.id)} style={[styles.actionIcon, { backgroundColor: 'darkred' }]}>
            <Ionicons name='trash-bin-outline' size={24} color='#fff' />
          </TouchableOpacity>
        </View>
      </View>

      {item.episodes.map((ep) => (
        <View key={ep.id} style={styles.episodeItem}>
          <Text style={ep.completed ? styles.episodeCompleted : styles.episodeText}>{ep.name}</Text>
          {!ep.completed ? (
            <TouchableOpacity onPress={() => markEpisode(item.id, ep.id)} style={styles.episodeIcon}>
              <Ionicons name='checkmark-outline' size={20} color='#fff' />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => unmarkEpisode(item.id, ep.id)} style={styles.episodeIcon}>
              <Ionicons name='remove-circle-outline' size={20} color='#fff' />
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#000000c0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    borderColor: '#fff',
    borderWidth: 2
  },
  seriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  seriesTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    flex: 1
  },
  seriesCompleted: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
    flex: 1
  },
  actions: {
    flexDirection: 'row'
  },
  actionIcon: {
    height: 40,
    width: 40,
    backgroundColor: 'darkgreen',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  episodeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#1c1c1c',
    borderRadius: 6,
    marginVertical: 2
  },
  episodeText: {
    color: '#fff',
    fontSize: 16,
    flex: 1
  },
  episodeCompleted: {
    color: '#aaa',
    fontSize: 16,
    textDecorationLine: 'line-through',
    flex: 1
  },
  episodeIcon: {
    marginLeft: 10
  }
});
