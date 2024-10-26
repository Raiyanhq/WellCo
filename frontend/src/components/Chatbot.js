import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatContainerRef = useRef(null); // Reference to the chat history container

    // Predefined questions and answers
    const qaPairs = {
         // WellCo Information
         "What is WellCo?": "WellCo is your wellness companion designed to help you achieve a healthier lifestyle.",
         "Can you tell me about WellCo?": "WellCo is your wellness companion designed to help you achieve a healthier lifestyle.",
         "What does WellCo do?": "WellCo is your wellness companion designed to help you achieve a healthier lifestyle.",
         
         // Greetings
         "Hi, how are you?": "I'm just a bot, but I'm here to help you!",
         "Hi! how are you?": "I'm just a bot, but I'm here to help you!",
         "Hello! How are you?": "I'm just a bot, but I'm here to help you!",
         "Hello, how are you?": "I'm just a bot, but I'm here to help you!",
         "Hey! hat’s up?": "I'm just a bot, but I'm here to help you!",
         "Hey, what’s up?": "I'm just a bot, but I'm here to help you!",
         "Hey! How are you": "I'm just a bot, but I'm here to help you!",
         "Hey, how are you": "I'm just a bot, but I'm here to help you!",
         
         // Mental Health Improvement
         "How can I improve my mental health?": "Regular exercise, mindfulness, and talking to a professional can greatly improve your mental health.",
         "What are ways to improve mental health?": "Regular exercise, mindfulness, and talking to a professional can greatly improve your mental health.",
         "Can you give me tips for better mental health?": "Regular exercise, mindfulness, and talking to a professional can greatly improve your mental health.",
         
         // Fitness Tips
         "What are some tips for staying fit?": "Maintain a balanced diet, stay hydrated, and find an exercise routine you enjoy.",
         "How do I stay fit?": "Maintain a balanced diet, stay hydrated, and find an exercise routine you enjoy.",
         "What should I do to keep fit?": "Maintain a balanced diet, stay hydrated, and find an exercise routine you enjoy.",
         
         // Stress Management
         "How do I manage stress effectively?": "Practice deep breathing, yoga, and take breaks to clear your mind.",
         "What can I do to reduce stress?": "Practice deep breathing, yoga, and take breaks to clear your mind.",
         "How can I handle stress better?": "Practice deep breathing, yoga, and take breaks to clear your mind.",
         
         // Balanced Diet
         "What is a balanced diet?": "A balanced diet includes a variety of foods from all food groups: fruits, vegetables, grains, proteins, and dairy.",
         "Can you explain what a balanced diet is?": "A balanced diet includes a variety of foods from all food groups: fruits, vegetables, grains, proteins, and dairy.",
         
         // Anxiety Management
         "What should I do if I'm feeling anxious?": "Consider talking to a friend, practicing relaxation techniques, or seeking professional help.",
         "How can I deal with anxiety?": "Consider talking to a friend, practicing relaxation techniques, or seeking professional help.",
         
         // Positive Mindset Development
         "How can I develop a positive mindset?": "Surround yourself with positive influences and practice gratitude daily.",
         "What are ways to cultivate a positive mindset?": "Surround yourself with positive influences and practice gratitude daily.",
         
         // Benefits of Meditation
         "What are the benefits of meditation?": "Meditation can reduce stress, improve focus, and enhance overall well-being.",
         "How does meditation help?": "Meditation can reduce stress, improve focus, and enhance overall well-being.",
         
         // Sleep Requirements
         "How much sleep do I need?": "Most adults need about 7-9 hours of sleep per night for optimal health.",
         "What’s the ideal amount of sleep for adults?": "Most adults need about 7-9 hours of sleep per night for optimal health.",
         
         // Importance of Hydration
         "What is the importance of hydration?": "Staying hydrated helps your body function properly and can improve your mood and energy levels.",
         "Why is hydration important?": "Staying hydrated helps your body function properly and can improve your mood and energy levels.",
         
         // Building Healthy Habits
         "How can I build healthy habits?": "Start small, set realistic goals, and stay consistent with your efforts.",
         "What are effective ways to build healthy habits?": "Start small, set realistic goals, and stay consistent with your efforts.",
         
         // Signs of Burnout
         "What are some signs of burnout?": "Signs include fatigue, irritability, lack of motivation, and feeling overwhelmed.",
         "How do I know if I'm burned out?": "Signs include fatigue, irritability, lack of motivation, and feeling overwhelmed.",
         
         // Motivation for Exercise
         "How do I stay motivated to exercise?": "Set achievable goals, track your progress, and find a workout buddy.",
         "What can keep me motivated to work out?": "Set achievable goals, track your progress, and find a workout buddy.",
         
         // Stress-Relief Activities
         "What are some good stress-relief activities?": "Consider hobbies, exercise, or spending time with loved ones.",
         "How can I relieve stress?": "Consider hobbies, exercise, or spending time with loved ones.",
         
         // Improving Nutrition
         "How can I improve my nutrition?": "Focus on whole foods, minimize processed foods, and plan your meals ahead.",
         "What are tips for better nutrition?": "Focus on whole foods, minimize processed foods, and plan your meals ahead.",
         
         // Self-Care
         "What is self-care?": "Self-care involves taking the time to care for your physical, mental, and emotional health.",
         "Can you explain self-care?": "Self-care involves taking the time to care for your physical, mental, and emotional health.",
         
         // Time Management
         "How can I manage my time better?": "Prioritize tasks, set deadlines, and eliminate distractions.",
         "What are some tips for better time management?": "Prioritize tasks, set deadlines, and eliminate distractions.",
         
         // Effects of Social Media on Mental Health
         "What are the effects of social media on mental health?": "It can both positively and negatively impact mental health; moderation is key.",
         "How does social media affect mental health?": "It can both positively and negatively impact mental health; moderation is key.",
         
         // Mindfulness Practice
         "How can I practice mindfulness?": "Incorporate mindfulness into your daily routine by focusing on the present moment.",
         "What are some ways to practice mindfulness?": "Incorporate mindfulness into your daily routine by focusing on the present moment.",
         
         // Role of Exercise in Mental Health
         "What role does exercise play in mental health?": "Exercise releases endorphins, which can improve mood and reduce anxiety.",
         "How is exercise related to mental health?": "Exercise releases endorphins, which can improve mood and reduce anxiety.",
         
         // Supporting a Friend in Need
         "How can I support a friend in need?": "Be there to listen, offer help, and encourage them to seek professional help if necessary.",
         "What should I do to help a friend who is struggling?": "Be there to listen, offer help, and encourage them to seek professional help if necessary.",
         
         // Additional Questions
         "What are some strategies for coping with depression?": "Seek professional help, stay connected with loved ones, and engage in activities you enjoy.",
         "How can I enhance my emotional intelligence?": "Practice self-awareness, empathize with others, and improve your communication skills.",
         "What are the best ways to practice gratitude?": "Keep a gratitude journal, express appreciation to others, and reflect on positive experiences.",
         "How do I set achievable goals?": "Use the SMART criteria: Specific, Measurable, Achievable, Relevant, and Time-bound.",
         "What should I do if I'm feeling overwhelmed?": "Take a break, prioritize tasks, and practice relaxation techniques.",
         "How can I improve my focus?": "Minimize distractions, break tasks into smaller parts, and take regular breaks.",
         "What are the benefits of regular exercise?": "Regular exercise boosts mood, enhances energy levels, and promotes overall health.",
         "How do I establish a morning routine?": "Set a consistent wake-up time, include physical activity, and plan your day ahead.",
         "What are effective breathing techniques for relaxation?": "Try deep breathing, box breathing, or 4-7-8 breathing for relaxation.",
         "How can I develop resilience?": "Embrace challenges, maintain a positive outlook, and seek support from others.",
         "What are some healthy snacks I can try?": "Consider fruits, nuts, yogurt, or whole-grain options as healthy snacks.",
         "How can I improve my relationships?": "Communicate openly, practice empathy, and spend quality time with others.",
         "What are the signs of good mental health?": "Signs include emotional stability, positive relationships, and a sense of purpose.",
         "How do I know if I need to talk to a therapist?": "If you're feeling persistently sad, overwhelmed, or struggling with daily life, consider talking to a therapist.",
         "What role does nutrition play in mental health?": "Nutrition can significantly impact mood and cognitive function, so a balanced diet is important.",
         "How can I avoid negative thinking?": "Challenge negative thoughts, focus on solutions, and practice self-compassion."
    };

    // Effect to add an initial greeting message
    useEffect(() => {
        setChatHistory([{ user: '', bot: 'Hi, I am WellBot! How can I assist you today?' }]);
    }, []);

    // Effect to scroll to the bottom of the chat container when chat history updates
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        // Add the user's question to the chat history
        setChatHistory((prevChatHistory) => [
            ...prevChatHistory,
            { user: userInput, bot: '...' }, // Placeholder while waiting for response
        ]);

        // Check if the user's input matches any predefined question
        const botResponse = qaPairs[userInput] || "I'm sorry, I don't have an answer for that.";

        // Simulate loading time for the bot response
        setTimeout(() => {
            // Update chat history with the bot's response
            setChatHistory((prevChatHistory) => [
                ...prevChatHistory.slice(0, -1), // Remove the placeholder
                { user: userInput, bot: botResponse },
            ]);
            setLoading(false);
            setUserInput(''); // Clear input field
        }, 1000); // Simulate a 1-second delay for the response
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #007BFF', borderRadius: '10px', boxShadow: '2px 2px 15px rgba(0, 123, 255, 0.5)', backgroundColor: '#1a1a2e' }}>
            <h1 style={{ textAlign: 'center', color: '#fff' }}>WellBot</h1>
            <div 
                ref={chatContainerRef} // Attach the ref to the chat container
                style={{ border: '1px solid #007BFF', padding: '10px', height: '300px', overflowY: 'scroll', borderRadius: '5px', backgroundColor: '#0f3460', color: '#fff' }}
            >
                {chatHistory.map((chat, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        {chat.user && (
                            <>
                                <strong style={{ color: '#007BFF' }}>You:</strong> <span style={{ color: '#fff' }}>{chat.user}</span>
                                <br />
                            </>
                        )}
                        {chat.bot && (
                            <>
                                <strong style={{ color: '#00ffcc' }}>WellBot:</strong> <span style={{ color: '#fff' }}>{chat.bot}</span>
                                <hr style={{ borderColor: '#007BFF' }} />
                            </>
                        )}
                    </div>
                ))}
                {loading && <div style={{ color: '#fff' }}><em>Typing...</em></div>}
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', marginTop: '10px' }}>
                <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    placeholder="Ask me anything..."
                    style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #007BFF', marginRight: '10px', backgroundColor: '#0f3460', color: '#fff' }}
                    disabled={loading} // Disable input while waiting for response
                />
                <button type="submit" disabled={loading} style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#007BFF', color: 'white', border: 'none' }}>Send</button>
            </form>
        </div>
    );
};

export default Chatbot;
