// =============================================================
// Express Backend Server — ZAIN AI Agency Dashboard API
// Supports industry-specific data & API key forwarding
// =============================================================
const express = require('express');
const cors = require('cors');
const {
  dashboardStats,
  revenueData,
  automations,
  chatResponses,
  defaultChatResponse,
  activityFeed,
  leadScrapingResults
} = require('./data/mockData');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Helper: get industry-specific data or default
const getByIndustry = (dataMap, industry) => {
  if (typeof dataMap === 'object' && !Array.isArray(dataMap) && dataMap.default) {
    return dataMap[industry] || dataMap.default;
  }
  return dataMap;
};

// In-memory state (mutable copy for toggles/edits)
let automationState = JSON.parse(JSON.stringify(automations));
let statsOverrides = {};

// ─── Dashboard Stats ─────────────────────────────────────────
app.get('/api/stats', (req, res) => {
  const industry = req.query.industry || 'default';
  const baseStats = getByIndustry(dashboardStats, industry);
  res.json({ ...baseStats, ...statsOverrides });
});

app.patch('/api/stats', (req, res) => {
  statsOverrides = { ...statsOverrides, ...req.body };
  const industry = req.query.industry || 'default';
  const baseStats = getByIndustry(dashboardStats, industry);
  res.json({ ...baseStats, ...statsOverrides });
});

// ─── Revenue / Chart Data ────────────────────────────────────
app.get('/api/revenue', (req, res) => {
  const industry = req.query.industry || 'default';
  res.json(getByIndustry(revenueData, industry));
});

// ─── Automations CRUD ────────────────────────────────────────
app.get('/api/automations', (req, res) => {
  res.json(automationState);
});

app.patch('/api/automations/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const automation = automationState.find(a => a.id === id);
  if (!automation) return res.status(404).json({ error: 'Automation not found' });
  Object.assign(automation, req.body);
  res.json(automation);
});

// ─── Chat (with optional real API forwarding) ────────────────
app.post('/api/chat', async (req, res) => {
  const { message, provider, apiKey, industry } = req.body;
  const ind = industry || 'default';

  // If API key is provided, forward to real AI provider
  if (apiKey && provider) {
    try {
      let aiResponse;

      if (provider === 'openai') {
        const resp = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'You are a helpful AI assistant for a business automation agency called ZAIN. Be concise, professional, and helpful.' },
              { role: 'user', content: message }
            ],
            max_tokens: 300
          })
        });
        const data = await resp.json();
        if (data.error) throw new Error(data.error.message);
        aiResponse = data.choices[0].message.content;

      } else if (provider === 'claude') {
        const resp = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-haiku-20240307',
            max_tokens: 300,
            messages: [{ role: 'user', content: message }],
            system: 'You are a helpful AI assistant for a business automation agency called ZAIN. Be concise, professional, and helpful.'
          })
        });
        const data = await resp.json();
        if (data.error) throw new Error(data.error.message);
        aiResponse = data.content[0].text;

      } else if (provider === 'gemini') {
        const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: message }] }],
            systemInstruction: { parts: [{ text: 'You are a helpful AI assistant for a business automation agency called ZAIN. Be concise, professional, and helpful.' }] },
            generationConfig: { maxOutputTokens: 300 }
          })
        });
        const data = await resp.json();
        if (data.error) throw new Error(data.error.message);
        aiResponse = data.candidates[0].content.parts[0].text;

      } else if (provider === 'custom') {
        // Custom endpoint: apiKey is treated as the full endpoint URL
        const resp = await fetch(apiKey, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message })
        });
        const data = await resp.json();
        aiResponse = data.response || data.message || JSON.stringify(data);
      }

      return res.json({ response: aiResponse, timestamp: new Date().toISOString(), source: 'api' });
    } catch (err) {
      // Fall through to mock if API fails
      console.error('API error, falling back to mock:', err.message);
    }
  }

  // Mock response (industry-aware)
  const lowerMsg = (message || '').toLowerCase();
  const responses = getByIndustry(chatResponses, ind);
  const match = responses.find(cr => cr.triggers.some(t => lowerMsg.includes(t)));
  const fallback = getByIndustry(defaultChatResponse, ind);

  // Simulate AI "thinking" delay (400-900ms)
  const delay = Math.floor(Math.random() * 500) + 400;
  setTimeout(() => {
    res.json({
      response: match ? match.response : fallback,
      timestamp: new Date().toISOString(),
      source: 'mock'
    });
  }, delay);
});

// ─── Activity Feed ───────────────────────────────────────────
app.get('/api/activity', (req, res) => {
  const industry = req.query.industry || 'default';
  res.json(getByIndustry(activityFeed, industry));
});

// ─── Lead Scraping Results ───────────────────────────────────
app.get('/api/leads', (req, res) => {
  const industry = req.query.industry || 'default';
  res.json(getByIndustry(leadScrapingResults, industry));
});

// ─── CTA Form Submission (fake) ──────────────────────────────
app.post('/api/contact', (req, res) => {
  const { name, businessType, phone } = req.body;
  console.log(`📩 New lead: ${name} | ${businessType} | ${phone}`);
  setTimeout(() => {
    res.json({ success: true, message: 'Thank you! Our team will contact you within 24 hours.' });
  }, 1200);
});

// ─── Start Server ────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`⚡ ZAIN AI Backend running on http://localhost:${PORT}`);
});
