// src/__tests__/Chatbot.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Chatbot from '../components/Chatbot';

describe('Chatbot Component', () => {
  test('renders greeting message', () => {
    render(<Chatbot />);
    const greetingMessage = screen.getByText(/Hi, I am WellBot! How can I assist you today?/i);
    expect(greetingMessage).toBeInTheDocument();
  });

  test('allows user input and displays bot response', async () => {
    render(<Chatbot />);
    
    const inputElement = screen.getByPlaceholderText(/Type your message here/i);
    fireEvent.change(inputElement, { target: { value: 'What is WellCo?' } });
    
    const submitButton = screen.getByText(/Send/i);
    fireEvent.click(submitButton);

    const botResponse = await screen.findByText(/WellCo is your wellness companion/i);
    expect(botResponse).toBeInTheDocument();
  });
});
