import { View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import{db} from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';


const auth = getAuth();

const now = new Date();
const dateString = now.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export default function JournalScreen() {
  const [entry, setEntry] = useState('');
  const router = useRouter();
  const auth = getAuth();

  const handleSave = async () => {
    if(!entry.trim()) {
      Alert.alert('Empty Entry', 'Write Something');
      return;
    }

    try {

      const user = auth.currentUser;
      await addDoc(collection(db, 'journals'), {
        uid: user.uid || 'anonymous',
        text: entry,
        createdAt:serverTimestamp(),
        date: dateString,
      });

      Alert.alert('Saved', 'Journal entry saved!');
      router.back();
    } catch (error) {
      console.error(" Error saving journal entry: ", error.message);
      Alert.alert('Error', error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Journaling Screen</Text>
      <TextInput
        style = {styles.input}
        multiline 
        value={entry}
        onChangeText = {setEntry}
        placeholder='Write your journal entry here...'
      />
      <Button title='Save' onPress={handleSave} />
        </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  label: { fontSize: 18, marginBottom: 10 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input:{
    height: 150, 
    borderWidth: 2,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  }
});
