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
         
          "What is WellCo?": "WellCo is your wellness companion, dedicated to helping you achieve a balanced and fulfilling lifestyle by offering guidance on physical health, mental well-being, and self-care. I'm here to walk alongside you on your journey to a healthier and happier life.",
          "Can you tell me about WellCo?": "WellCo is designed to be your wellness guide, providing support for both physical health and emotional well-being. Think of me as a friend you can rely on when you're feeling lost or need that extra boost of motivation.",
          "What does WellCo do?": "WellCo serves as your wellness coach, helping you manage stress, stay fit, and cultivate healthy habits. I'm here to encourage you and provide personalized advice to help you make positive changes in your life.",
          // Greetings
          "Hi, how are you?": "Thank you for asking! As a chatbot, I don’t experience emotions, but I’m here to help and listen to whatever you need to talk about. How can I assist you today?",
          "Hi! how are you?": "I'm doing well, thank you for reaching out! Let’s focus on how I can support you today.",
          "Hello! How are you?": "Hello! I’m always here and ready to chat with you. How can I make your day a little brighter?",
          "Hello, how are you?": "Hello! I’m here to help in any way I can. What’s on your mind today?",
          "Hey! What’s up?": "Hey there! I’m ready to listen and assist you. How can I support you today?",
          "Hey, what’s up?": "Hello! It’s good to hear from you. What’s on your mind?",
          "Hey! How are you?": "Hi! I’m here for you. Let me know what’s going on, and I’ll do my best to help.",
          "Hey, how are you?": "Hello! I’m here, and I’m ready to help with whatever you need. How are you feeling today?",
        
          // Mental Health Improvement
          "How can I improve my mental health?": "Taking care of your mental health can make a big difference. Regular exercise releases endorphins that help lift your mood, mindfulness practices can reduce stress, and talking to someone you trust or a mental health professional can be really therapeutic. Remember, it's okay to ask for help when you need it.",
          "What are ways to improve mental health?": "Improving mental health often involves small, consistent steps. You might consider activities like journaling, meditation, and staying connected with loved ones. Also, don't underestimate the power of self-compassion and patience with yourself during tough times.",
          "Can you give me tips for better mental health?": "Of course! Regularly moving your body, even just a short walk, practicing gratitude, and allowing yourself moments of calm can do wonders. If things get overwhelming, speaking to a professional can provide valuable support.",
        
          // Fitness Tips
          "What are some tips for staying fit?": "Staying fit is all about balance. Try to include a variety of physical activities you enjoy, like dancing, jogging, or yoga. Stay hydrated, eat a balanced diet with plenty of fruits and veggies, and remember to give your body rest when it needs it.",
          "How do I stay fit?": "Finding activities you genuinely enjoy is key. Try to make exercise a routine rather than a chore, and be kind to yourself on days when you’re not feeling your best. Consistency and self-compassion go hand in hand in fitness.",
          "What should I do to keep fit?": "A balanced approach to fitness involves nourishing your body with healthy foods, drinking enough water, and engaging in activities that bring you joy. It’s not just about working out; it’s about treating your body with care.",
        
          // Stress Management
          "How do I manage stress effectively?": "Stress can be tough, but there are ways to manage it. Deep breathing exercises or even a simple meditation session can help center your mind. Taking short breaks throughout the day and connecting with loved ones can make a big difference too. Remember, you don’t have to face stress alone.",
          "What can I do to reduce stress?": "It’s okay to feel stressed at times. When it happens, give yourself permission to pause. Deep breathing, progressive muscle relaxation, or taking a short walk outside can help ease your mind. Reach out to a friend if you need someone to listen.",
          "How can I handle stress better?": "Handling stress better starts with acknowledging it without judgment. Once you’re aware, focus on what you can control. Relaxation techniques like deep breathing or yoga, combined with self-kindness, can be very helpful. Reach out if you ever need extra support.",
        
          // Balanced Diet
          "What is a balanced diet?": "A balanced diet means eating a variety of foods that nourish your body. Try to include a mix of colorful fruits and vegetables, whole grains, lean proteins, and healthy fats. Listen to your body’s hunger cues and allow yourself to enjoy food without guilt.",
          "Can you explain what a balanced diet is?": "Of course! A balanced diet includes eating a little bit from each food group to get all the nutrients your body needs. It’s all about finding what works best for you and embracing a flexible, non-restrictive approach to food.",
        
          // Anxiety Management
          "What should I do if I'm feeling anxious?": "When anxiety hits, it can be overwhelming. In those moments, focus on your breathing or try grounding techniques like naming five things you can see. Don’t hesitate to reach out to someone you trust or a therapist to talk things through. Remember, you’re not alone.",
          "How can I deal with anxiety?": "Coping with anxiety takes practice and patience. Try journaling your thoughts to help release them or listen to calming music. Speaking with a professional can also provide you with additional strategies tailored to your needs.",
        
          // Positive Mindset Development
          "How can I develop a positive mindset?": "Developing a positive mindset takes time and self-compassion. Start by surrounding yourself with positive influences, practicing gratitude, and being mindful of your self-talk. It's okay to have down days; what's important is treating yourself with kindness even then.",
          "What are ways to cultivate a positive mindset?": "Cultivating a positive mindset involves intentionally focusing on the good, no matter how small it may seem. Practicing gratitude, challenging negative thoughts, and finding joy in simple moments can help shift your perspective over time.",
        
          // Meditation Benefits
          "What are the benefits of meditation?": "Meditation can be incredibly grounding. It helps lower stress, increase self-awareness, and improve your focus. You might find that a few minutes of quiet breathing each day helps you reconnect with yourself and the present moment.",
          "How does meditation help?": "Meditation can create a space of calm within you. It helps in managing stress, reducing anxiety, and enhancing clarity of thought. Think of it as a way to tune into your mind and find a moment of peace in the chaos of everyday life.",

            // Motivational Encouragement
            "How can I stay motivated?": "Staying motivated is about finding your ‘why.’ Think about why your goals matter to you and celebrate every small win along the way. Take breaks when needed, and don’t be too hard on yourself.",
            "What are some ways to stay motivated?": "Keep your goals visible and remind yourself of your purpose. Surround yourself with positive influences, break your goals into smaller, achievable steps, and don’t forget to reward yourself for progress.",
            "How do I get back on track when I lose motivation?": "It’s natural to lose motivation sometimes. Take a step back, rest if you need to, and reflect on why you started. When you’re ready, set small goals to rebuild momentum gradually.",

            // Building Self-Confidence
            "How can I build self-confidence?": "Building self-confidence takes time and practice. Start by setting small, achievable goals and celebrating your achievements. Surround yourself with supportive people and remind yourself of your strengths.",
            "What are some ways to improve self-confidence?": "Improving self-confidence involves positive self-talk, facing your fears step by step, and focusing on your strengths. Remember, confidence comes with practice and self-acceptance.",
            "How do I become more confident?": "To become more confident, start by embracing your uniqueness and focusing on progress over perfection. Practicing gratitude and being kind to yourself during challenges can help boost your self-esteem over time.",

            // Building Resilience
            "How do I build resilience?": "Building resilience is about bouncing back from challenges. Focus on what you can control, seek support from friends and family, and be kind to yourself during tough times. Every setback is an opportunity for growth.",
            "What are some ways to be more resilient?": "To build resilience, practice adaptability, maintain a positive perspective, and learn to view failures as stepping stones to success. Surround yourself with people who uplift and encourage you.",
            "How can I become more resilient?": "Resilience comes from accepting that challenges are part of life. Embrace your strengths, maintain a hopeful outlook, and be open to learning from every experience.",

            // Boosting Productivity
            "How can I be more productive?": "Being more productive often starts with prioritizing tasks and setting clear goals. Break larger tasks into smaller steps, minimize distractions, and reward yourself for progress.",
            "What are some ways to boost productivity?": "To boost productivity, try scheduling your day, taking regular breaks, and setting specific goals. Remember, rest is just as important as work to maintain long-term productivity.",
            "How do I increase my productivity?": "Increasing productivity involves creating a clear plan, focusing on one task at a time, and allowing yourself moments of rest. A balance of work and self-care can lead to more consistent results.",

            // Improving Sleep Quality
            "How can I improve my sleep?": "Improving sleep quality can start with establishing a bedtime routine, limiting screen time before bed, and creating a calming environment. Aim for consistency to help regulate your body’s internal clock.",
            "What are some ways to get better sleep?": "For better sleep, try to go to bed and wake up at the same time each day. Creating a relaxing pre-sleep routine, like reading or meditating, can help signal your body that it’s time to wind down.",
            "How do I get a good night's sleep?": "To get a good night's sleep, avoid heavy meals and caffeine before bed, keep your bedroom cool and comfortable, and try relaxation techniques like deep breathing to ease your mind.",

            // Overcoming Challenges
            "How can I overcome challenges?": "Overcoming challenges starts with a positive mindset and a willingness to learn. Break the challenge into smaller steps, seek support when needed, and believe in your ability to adapt and grow.",
            "What can I do when faced with a difficult situation?": "When facing a difficult situation, take a deep breath and assess the situation with a clear mind. Focus on what you can control, reach out for help if needed, and remind yourself that every problem has a solution.",
            "How do I deal with setbacks?": "Dealing with setbacks requires self-compassion and resilience. Allow yourself to feel and process your emotions, then shift your focus to what you can learn from the experience and how you can move forward.",

            // Self-Reflection and Growth
            "How can I practice self-reflection?": "Self-reflection involves taking time to sit with your thoughts and evaluate your experiences. Journaling, meditating, or simply taking a quiet moment to think about your day can help you gain clarity and insight.",
            "What are some ways to reflect on my life?": "To reflect on your life, consider writing about your experiences, your feelings, and your goals. Regular reflection can help you identify patterns, celebrate achievements, and identify areas for growth.",
            "How do I grow as a person?": "Personal growth involves embracing change, being open to new experiences, and reflecting on your journey. Focus on progress rather than perfection, and allow yourself to learn from every step you take.",

            // Mindfulness Practices
            "What is mindfulness?": "Mindfulness is the practice of being present in the moment without judgment. It involves focusing on your thoughts, feelings, and surroundings with acceptance and awareness.",
            "How can I practice mindfulness?": "You can practice mindfulness by taking deep breaths, observing your thoughts without reacting, and grounding yourself in the present. Activities like mindful eating, walking, or simply sitting quietly can help you stay in the moment.",
            "What are the benefits of mindfulness?": "Mindfulness helps you stay grounded and reduces stress by encouraging you to focus on the present. It can enhance self-awareness, improve focus, and promote a sense of calm in your everyday life.",

            // Healthy Habit Formation
            "How do I build healthy habits?": "Building healthy habits starts with small, achievable goals and consistency. Choose one habit to focus on, set realistic milestones, and reward yourself for progress along the way.",
            "What are some tips for forming new habits?": "When forming new habits, start small and be specific. Create reminders, stay patient with yourself, and remember that consistency is key to making new behaviors stick.",
            "How can I break bad habits?": "Breaking bad habits involves awareness and replacing them with healthier alternatives. Identify triggers, set clear intentions, and seek support from friends or accountability partners when needed.",

            // Managing Emotions
            "How do I manage my emotions?": "Managing emotions starts with recognizing and accepting them without judgment. Take deep breaths, express your feelings through writing or talking to someone, and practice self-kindness during emotional moments.",
            "What are some ways to deal with difficult emotions?": "To deal with difficult emotions, practice deep breathing or grounding exercises. Allow yourself to feel without suppressing emotions, and consider talking to someone you trust for support.",
            "How can I stay calm in stressful situations?": "Staying calm in stressful situations takes practice. Deep breathing, grounding techniques, and positive self-talk can help you stay centered. Remember, it’s okay to take a break and regroup if needed."
        };

    // Effect to add an initial greeting message
    useEffect(() => {
      setChatHistory([{ user: '', bot: 'Hi, I am WellBot! How can I assist you today?' }]);
  }, []);
  
  const handleInputChange = (event) => {
      setUserInput(event.target.value);
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          { user: userInput, bot: '...' },
      ]);
      const botResponse = qaPairs[userInput] || "I'm sorry, I don't have an answer for that.";
      setTimeout(() => {
          setChatHistory((prevChatHistory) => [
              ...prevChatHistory.slice(0, -1),
              { user: userInput, bot: botResponse },
          ]);
          setLoading(false);
          setUserInput('');
      }, 1000);
  };

  return (
      <div className="chat-container">
          <h1 className="app-title">WellBot</h1>
          <div ref={chatContainerRef} style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {chatHistory.map((chat, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                      {chat.user && (
                          <>
                              <strong style={{ color: '#ff6a88' }}>You:</strong> <span>{chat.user}</span>
                              <br />
                          </>
                      )}
                      {chat.bot && (
                          <>
                              <strong style={{ color: '#ff9a8b' }}>WellBot:</strong> <span>{chat.bot}</span>
                              <hr style={{ borderColor: '#ff6a88' }} />
                          </>
                      )}
                  </div>
              ))}
              {loading && <div style={{ color: '#333' }}><em>Typing...</em></div>}
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', marginTop: '10px' }}>
              <input
                  type="text"
                  value={userInput}
                  onChange={handleInputChange}
                  placeholder="Ask me anything..."
                  style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ff6a88', marginRight: '10px', backgroundColor: '#f7e9df', color: '#333', transition: 'all 0.3s ease' }}
                  disabled={loading}
              />
              <button type="submit" disabled={loading} style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#ff9a8b', color: 'white', border: 'none', transition: 'all 0.3s ease' }}>Send</button>
          </form>
      </div>
  );
};

export default Chatbot;
