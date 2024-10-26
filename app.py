from flask import Flask, request, jsonify
import os
import openai  # Make sure to install the openai library
import config  # Assuming config.py is in the same directory

app = Flask(__name__)

# Set the API key for Gemini
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = config.GOOGLE_APPLICATION_CREDENTIALS

# Replace this with the actual Gemini client import and initialization
# from google.cloud import dialogflow  # Example if you are using Dialogflow

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    
    if not user_message:
        return jsonify({'response': 'No message received.'})

    # Here you would call the Gemini API
    try:
        # This is a placeholder for calling the Gemini API
        # Replace this with the actual call to the Gemini API
        # For example, if using OpenAI's GPT models:
        openai.api_key = config.GEMINI_API_KEY
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Replace with the specific Gemini model you want to use
            messages=[{"role": "user", "content": user_message}]
        )
        
        bot_response = response['choices'][0]['message']['content']
    except Exception as e:
        print(f"Error: {e}")
        bot_response = "Sorry, I could not fetch an answer. Please try again."

    return jsonify({'response': bot_response})

if __name__ == '__main__':
    app.run(debug=True)