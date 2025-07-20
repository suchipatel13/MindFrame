import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';

const auth = getAuth();

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MindFrame 🧠</Text>

      <TouchableOpacity style={styles.card} onPress={() => router.push('/journal')}>
        <Text style={styles.cardText}>📝 Journaling Screen</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => router.push('/mood')}>
        <Text style={styles.cardText}>📊 Mood Tracker</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => router.push('/calendar')}>
        <Text style={styles.cardText}>📅 Calendar View</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => Alert.alert('Soon!', '🌈 Light/Dark mode toggle coming soon!')}>
        <Text style={styles.cardText}>🌈 Light/Dark Mode Toggle</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    padding: 18,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    fontWeight: '500',
  },
  logout: {
    marginTop: 40,
    alignItems: 'center',
  },
  logoutText: {
    color: 'red',
    fontWeight: 'bold',
  },
});
