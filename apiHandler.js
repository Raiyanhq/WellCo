// utils/apiHandler.js

export const fetchBotResponse = async (userInput) => {
    try {
      const response = await fetch('/api/get-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: userInput }),
      });
      const data = await response.json();
      return data.response;
    } catch (error) {
      return 'Error occurred';
    }
  };
  