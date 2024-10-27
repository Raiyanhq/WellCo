// __tests__/Chatbot.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Chatbot from '../components/Chatbot'; // Assuming the path to your component

describe('Chatbot Component', () => {
  it('renders the initial greeting message', () => {
    render(<Chatbot />);
    const greetingMessage = screen.getByText(/Hi, I am WellBot! How can I assist you today?/i);
    expect(greetingMessage).toBeInTheDocument();
  });

  it('allows the user to type and send a message', async () => {
    render(<Chatbot />);
    
    const inputField = screen.getByPlaceholderText(/Ask me anything/i);
    const sendButton = screen.getByText(/Send/i);
    
    // Simulate typing in the input field
    fireEvent.change(inputField, { target: { value: 'What is WellCo?' } });
    expect(inputField.value).toBe('What is WellCo?');
    
    // Simulate clicking the send button
    fireEvent.click(sendButton);

    // Check that the user's message is displayed
    const userMessage = await screen.findByText(/What is WellCo\?/i);
    expect(userMessage).toBeInTheDocument();
  });

  it('displays a response from the bot', async () => {
    render(<Chatbot />);
    
    const inputField = screen.getByPlaceholderText(/Ask me anything/i);
    const sendButton = screen.getByText(/Send/i);
    
    // Simulate typing and sending a message
    fireEvent.change(inputField, { target: { value: 'Tell me about fitness' } });
    fireEvent.click(sendButton);

    // Check that the bot's response is displayed after a delay
    await waitFor(() => {
      const botResponse = screen.getByText(/I’m sorry, I don’t have an answer for that./i);
      expect(botResponse).toBeInTheDocument();
    });
  });
});
