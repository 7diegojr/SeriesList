import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';


export default function Welcome() {
  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>
          Crie sua lista de séries e acompanhe os episódios que já assistiu!
        </Text>
        <Link style={styles.button} href={"/home"}>
          <Text style={styles.buttonText}>Acessar</Text>
        </Link>
      </View>
      <StatusBar style="light" backgroundColor='#000' />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ac2727',
  },
  containerImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 370,
    height: 370,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    backgroundColor: '#dadada',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: '5%',
  },

  text: {
    fontSize: 16,
    color: 'grey',
    alignSelf: 'center',
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    backgroundColor: '#000',
    bottom: -20,
    alignSelf: 'center',
    borderRadius: 50,
    paddingVertical: 15,
    width: '60%',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
});