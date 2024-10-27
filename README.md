# WellCo - AI-Powered Wellness Companion

WellCo is an AI-powered wellness assistant designed to support both mental and physical health. It serves as a holistic companion that helps users manage stress, anxiety, and fitness routines through multimodal interactions (voice, text, and video). Powered by Google’s Gemini API, WellCo engages users in meaningful conversations, offers personalized coaching routines, and provides mental health support based on user data.

## Table of Contents
- [Project Overview](#project-overview)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Impact](#impact)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Setup and Installation](#setup-and-installation)
- [Challenges Faced](#challenges-faced)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
WellCo combines mental health support with fitness coaching in a single, user-friendly platform. It uses AI-powered chat interactions to provide personalized guidance, helping users maintain their mental well-being and achieve fitness goals. The integration of Google’s Gemini API allows WellCo to deliver accurate and context-aware responses in real time.

## Problem Statement
With increasing stress levels and a growing focus on fitness, people often struggle to find a unified platform that addresses both their mental and physical well-being. Most available solutions are fragmented, focusing either on mental health or fitness coaching, leaving a gap for users seeking holistic support.

## Solution
WellCo addresses this gap by leveraging Google’s Gemini API to create a conversational AI that supports both mental health and physical fitness. By analyzing user inputs and historical data, WellCo tailors its responses to provide personalized advice, mental health exercises, fitness routines, and motivational tips. This comprehensive approach bridges the gap between mental and physical wellness.

## Impact
The impact of WellCo is significant, offering users a consolidated platform to address their mental and physical health. It promotes a balanced lifestyle by providing personalized recommendations, encouraging fitness routines, and delivering mental health support. This AI-driven approach enables users to access tailored advice 24/7, fostering healthier habits and reducing stress.

## Technologies Used
- **Front-end**: React.js, CSS, HTML
- **Back-end**: Node.js, Express.js
- **Database**: Firebase Firestore
- **AI Integration**: Google Gemini API, Hugging Face Transformers
- **Styling and UI Design**: Figma for designing the front-end layout

## Architecture
The architecture consists of a React.js front-end that communicates with the Node.js/Express.js back-end through API requests. The back-end handles user authentication, data management, and API integrations. The AI models and Gemini API are accessed via well-defined endpoints to generate responses based on user queries. User inputs are stored securely in Firebase Firestore to maintain context and enable personalized responses in future interactions.

**High-Level Architecture Flow:**
1. User sends a query via the front-end chatbot interface.
2. The query is passed to the back-end, where it is processed for context.
3. The back-end communicates with the Gemini API for generating responses.
4. The generated response is returned to the user via the front-end chat interface.
5. All interactions are securely logged for enhancing future responses.

## Setup and Installation
### Prerequisites
- Node.js (v16 or higher)
- Firebase account for Firestore database
- API Key for Google Gemini API
- A modern browser (Google Chrome, Firefox, etc.)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/WellCo.git
   cd WellCo
## Challenges Faced
During development, integrating the Google Gemini API posed several challenges due to context management and real-time processing requirements. Additionally, aligning the conversational flow with personalized recommendations demanded restructuring of the API handling and data processing architecture. These challenges were overcome through efficient request handling, context-based session storage, and debugging integration issues by referring to detailed API documentation.

## Future Improvements
- **Voice Interaction**: Implement voice recognition capabilities for hands-free interactions.
- **Enhanced Personalization**: Incorporate more user-specific recommendations based on health data and activity history.
- **Multi-Modal Coaching**: Expand support to include video tutorials for fitness routines and guided meditation.

## Contributing
Contributions are welcome! If you would like to contribute to WellCo, please fork the repository and submit a pull request. For significant changes, please open an issue first to discuss what you would like to change.

--------------------------------------------------------------

Thank you for checking out WellCo! Stay well, stay fit! 🌱💪
