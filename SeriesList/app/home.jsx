import React, { useState, useEffect } from 'react';
import {
  Alert, FlatList, ImageBackground, KeyboardAvoidingView,
  Platform, SafeAreaView, StyleSheet, Text, TextInput,
  TouchableOpacity, View, Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemList from '../components/ItemList';

export default function Home() {
  const [textInput, setTextInput] = useState('');
  const [episodeCount, setEpisodeCount] = useState('');
  const [isAddingEpisodes, setIsAddingEpisodes] = useState(false);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    getSeriesFromDevice();
  }, []);

  useEffect(() => {
    saveSeriesToDevice();
  }, [series]);

  const getSeriesFromDevice = async () => {
    try {
      const seriesMemory = await AsyncStorage.getItem('SeriesList');
      if (seriesMemory != null) setSeries(JSON.parse(seriesMemory));
    } catch (error) {
      console.log(`Erro: ${error}`);
    }
  };

  const saveSeriesToDevice = async () => {
    try {
      const seriesJson = JSON.stringify(series);
      await AsyncStorage.setItem('SeriesList', seriesJson);
    } catch (error) {
      console.log(`Erro: ${error}`);
    }
  };

  const startAddSeries = () => {
    if (textInput === '') {
      Alert.alert("Ocorreu um problema :(", "Por favor, informe o nome da série");
    } else {
      setIsAddingEpisodes(true);
    }
  };

  const addSeries = () => {
    if (episodeCount === '' || isNaN(episodeCount) || parseInt(episodeCount) <= 0) {
      Alert.alert("Ocorreu um problema :(", "Por favor, informe um número válido de episódios");
      return;
    }

    const episodeArray = Array.from({ length: parseInt(episodeCount) }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      name: `Episódio ${i + 1}`,
      completed: false,
    }));

    const newSeries = {
      id: Date.now().toString(),
      name: textInput,
      episodes: episodeArray,
      completed: false
    };

    setSeries([...series, newSeries]);
    setTextInput('');
    setEpisodeCount('');
    setIsAddingEpisodes(false);
    Keyboard.dismiss();
  };

  const markSeriesCompleted = (seriesId) => {
    const updated = series.map((s) => {
      if (s.id === seriesId) {
        const updatedEpisodes = s.episodes.map((ep) => ({
          ...ep,
          completed: true
        }));
        return { ...s, episodes: updatedEpisodes, completed: true };
      }
      return s;
    });
    setSeries(updated);
  };

  const unmarkSeriesCompleted = (seriesId) => {
    const updated = series.map((s) => {
      if (s.id === seriesId) {
        const updatedEpisodes = s.episodes.map((ep) => ({
          ...ep,
          completed: false
        }));
        return { ...s, episodes: updatedEpisodes, completed: false };
      }
      return s;
    });
    setSeries(updated);
  };

  const markEpisodeCompleted = (seriesId, episodeId) => {
    const updated = series.map((s) => {
      if (s.id === seriesId) {
        const updatedEpisodes = s.episodes.map((ep) =>
          ep.id === episodeId ? { ...ep, completed: true } : ep
        );
        return { ...s, episodes: updatedEpisodes };
      }
      return s;
    });
    setSeries(updated);
  };

  const unmarkEpisodeCompleted = (seriesId, episodeId) => {
    const updated = series.map((s) => {
      if (s.id === seriesId) {
        const updatedEpisodes = s.episodes.map((ep) =>
          ep.id === episodeId ? { ...ep, completed: false } : ep
        );
        return { ...s, episodes: updatedEpisodes };
      }
      return s;
    });
    setSeries(updated);
  };

  const removeSeries = (seriesId) => {
    Alert.alert('Excluir Série?', 'Confirma a exclusão desta série?', [
      {
        text: 'Sim',
        onPress: () => {
          const newSeries = series.filter(item => item.id !== seriesId);
          setSeries(newSeries);
        },
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  const removeAll = () => {
    Alert.alert('Limpar Lista?', 'Confirma a exclusão de todas as séries?', [
      {
        text: 'Sim',
        onPress: () => setSeries([]),
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ImageBackground
          source={require('../assets/background.png')}
          style={{ flex: 1, justifyContent: 'flex-start' }}
          resizeMode="repeat"
        >
          <View style={styles.header}>
            <Text style={styles.title}>Lista de Séries</Text>
            <Ionicons name="trash" size={28} color="#fff" onPress={removeAll} />
          </View>

          <FlatList
            contentContainerStyle={{ padding: 20, paddingBottom: 150 }}
            data={series}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ItemList
                item={item}
                markSeries={markSeriesCompleted}
                unmarkSeries={unmarkSeriesCompleted}
                markEpisode={markEpisodeCompleted}
                unmarkEpisode={unmarkEpisodeCompleted}
                removeSeries={removeSeries}
              />
            )}
          />

          <View style={styles.footer}>
            <View style={styles.inputContainer}>
              <TextInput
                color="#fff"
                placeholderTextColor="#aeaeae"
                placeholder="Ex.: Nome da Série - Temporada 1"
                value={textInput}
                onChangeText={(text) => setTextInput(text)}
                editable={!isAddingEpisodes}
                style={{ fontSize: 16 }}
              />
              {isAddingEpisodes && (
                <TextInput
                  color="#fff"
                  placeholderTextColor="#aeaeae"
                  placeholder="Número de episódios"
                  value={episodeCount}
                  onChangeText={(text) => setEpisodeCount(text)}
                  keyboardType="numeric"
                  style={styles.episodeInput}
                />
              )}
            </View>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={isAddingEpisodes ? addSeries : startAddSeries}
            >
              <Ionicons name="add" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 25,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000000c0',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  footer: {
    backgroundColor: '#000000c0',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  iconContainer: {
    height: 45,
    width: 45,
    backgroundColor: '#000',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#000',
    marginVertical: 20,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  episodeInput: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#aeaeae',
    paddingTop: 10,
  },
});
