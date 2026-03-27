const express = require('express');
const axios = require('axios');
const Interaction = require('../models/Interaction');

const router = express.Router();

// 🔥 ASK AI (OPENROUTER)
router.post('/ask-ai', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        
        model: 'openai/gpt-3.5-turbo',

        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'AI Flow App',
        },
        timeout: 20000,
      }
    );

    const aiResponse =
      response.data?.choices?.[0]?.message?.content ||
      'No response from AI';

    res.json({ response: aiResponse });

  } catch (error) {
    console.error('🔥 OPENROUTER ERROR:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    res.status(500).json({
      error: 'Failed to fetch response from OpenRouter AI',
      details: error.response?.data || error.message,
    });
  }
});

// 🔥 SAVE API
router.post('/save', async (req, res) => {
  try {
    const { prompt, response } = req.body;

    if (!prompt || !response) {
      return res.status(400).json({
        error: 'Prompt and response are required',
      });
    }

    const interaction = new Interaction({
      prompt: prompt.trim(),
      response: response.trim(),
    });

    await interaction.save();

    res.status(201).json({
      message: 'Interaction saved successfully',
      interaction,
    });

  } catch (error) {
    console.error('🔥 SAVE ERROR:', error.message);

    res.status(500).json({
      error: 'Failed to save interaction',
    });
  }
});

module.exports = router;