import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const generateAIResponse = async (mood) => {
  try {
    const prompt = `How can I improve my mood when I'm feeling ${mood}?`;

    const res = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a friendly and supportive mental health assistant.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 60,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer YOUR_API_KEY_HERE`, // replace this with your OpenAI API key
        },
      }
    );

    return res.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating AI response:', error.message);
    return 'Sorry, I could not generate a response at this time.';
  }
};

export default function MoodTrackerScreen() {
  const moods = ['😊 Happy', '😐 Okay', '😢 Sad', '😡 Angry', '😞 Lonely'];

  const handleMoodSelect = async (mood) => {
    const aiResponse = await generateAIResponse(mood);
    Alert.alert(`You selected: ${mood}`, aiResponse);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Mood Tracker</Text>

      {/* Mood buttons */}
      {moods.map((mood, index) => (
        <TouchableOpacity key={index} style={styles.button} onPress={() => handleMoodSelect(mood)}>
          <Text style={styles.buttonText}>{mood}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    marginVertical: 8,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { 
    fontSize: 18,
  },
});
