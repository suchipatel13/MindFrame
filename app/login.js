import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseAuth';
import { useRouter } from 'expo-router';

const router = useRouter();

export default function Login() {
  // Track input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle login
  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill in all fields');
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert('Success', `Welcome back, ${email}`, [
          {
            text: "OK",
            onPress: () => router.replace("/home"),
          },
        ]);
      } catch (error) {
        Alert.alert('Login Error', error.message);
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Link href="/" style={{ marginTop: 20 }}>
        <Text style={{ color: 'black', fontWeight: '600' }}>← Back to Home</Text>
      </Link>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 30,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 30,
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#aaa',
      borderRadius: 8,
      padding: 12,
      marginBottom: 20,
    },
    button: {
      backgroundColor: 'black',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: 'white',
      fontWeight: '600',
      fontSize: 16,
    },

    
  });
