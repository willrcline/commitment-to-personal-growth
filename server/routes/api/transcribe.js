const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
require('dotenv').config();

async function transcribeAudioFile() {
  try {
    const form = new FormData();
    form.append('file', fs.createReadStream('audio/whisper_test.mp3'));
    form.append('model', 'whisper-1');
    
    const config = {
      headers: {
        ...form.getHeaders(),
        "Authorizatio": `Bearer ${process.env.OPENAI_API_KEY}`,
      }
    };

    const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', form, config);
    console.log('Transcription:', response.data.text);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
