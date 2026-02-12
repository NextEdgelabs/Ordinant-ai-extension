---
title: "Slack"
description: "Using Ordinant.ai in Slack"
---

# Ordinant.ai for Slack

Ordinant.ai for Slack brings the power of Ordinant.ai directly into your Slack workspace. Ask questions about your repositories, request code implementations, or get help with issues—all without leaving Slack.

---

## What You Can Do With Ordinant.ai for Slack

- **Ask questions about your repositories** — Get explanations about code, architecture, or implementation details
- **Request code implementations** — Tell the bot to implement fixes or features suggested in Slack threads
- **Get help with debugging** — Share error messages or issues and get AI-powered assistance
- **Collaborate with your team** — Mention the bot in any channel to get help in context

---

## Prerequisites

Before using Ordinant.ai for Slack:

- You must have a **Ordinant.ai account** with available credits
- Your **GitHub Integration must be configured** via the [Integrations tab](https://app.ordinant.ai/integrations) so Ordinant.ai can access your repositories

To install Ordinant.ai for Slack, simply go to the integrations menu in the sidebar on https://app.ordinant.ai and set up the Slack integration.

---

## How to Interact with Ordinant.ai

### Direct Messages

You can message Ordinant.ai directly through Slack DMs for private conversations:

1. Find **Ordinant.ai** in your Slack workspace's app list
2. Start a direct message conversation
3. Ask your question or describe what you need

This is ideal for:

- Private questions about your code
- Sensitive debugging sessions
- Personal productivity tasks

### Channel Mentions

Mention the bot in any channel where it's been added:

```
@Ordinant.ai can you explain how the authentication flow works in our backend?
```

This is great for:

- Team discussions where AI assistance would help
- Collaborative debugging sessions
- Getting quick answers during code reviews

---

## Use Cases

### Ask Questions About Your Repositories

Get instant answers about your codebase without switching contexts:

```
@Ordinant.ai what does the UserService class do in our main backend repo?
```

```
@Ordinant.ai how is error handling implemented in the payment processing module?
```

### Implement Fixes from Slack Discussions

When your team identifies an issue or improvement in a Slack thread, ask the bot to implement it:

```
@Ordinant.ai based on this thread, can you implement the fix for the null pointer exception in the order processing service?
```

The bot can:

- Read the context from the thread
- Understand the proposed solution
- Create a branch with the implementation
- Push the changes to your repository

### Debug Issues

Share error messages or stack traces and get help:

```
@Ordinant.ai I'm seeing this error in production:
[paste error message]
Can you help me understand what's causing it?
```

---

## How It Works

1. **Message Ordinant.ai** — Either through DMs or by mentioning it in a channel
2. **Ordinant.ai processes your request** — Ordinant.ai uses your connected GitHub repositories to understand context
3. **AI generates a response** — Ordinant.ai's AI analyzes your request and provides helpful responses
4. **Code changes (if requested)** — For implementation requests, Ordinant.ai can create pull requests

---

## Cost

- **Ordinant.ai credits are used** when Ordinant.ai performs work (model usage, operations, etc.)
- Credit usage is similar to using Ordinant.ai through other interfaces

---

## Tips for Best Results

- **Be specific** — The more context you provide, the better the response
- **Reference specific files or functions** — Help the bot understand exactly what you're asking about
- **Use threads** — Keep related conversations in threads for better context
- **Specify the repository** — If you have multiple repos connected, mention which one you're asking about

---

## Limitations

- Ordinant.ai can only access repositories you've connected through the [Integrations](https://app.ordinant.ai/integrations) page
- Complex multi-step implementations may require follow-up messages
- Response times may vary based on the complexity of your request

---

## Changing the Model

You can customize which AI model Ordinant.ai uses for generating responses. The model affects the quality, speed, and capabilities of Ordinant.ai's responses.

1. Go to your [Ordinant.ai Workspace](https://app.ordinant.ai/)
2. Navigate to **Integrations** > **Slack**
3. Select your preferred model for Ordinant.ai for Slack

Ordinant.ai will start using the new model immediately for subsequent requests.

### Available Models

Ordinant.ai for Slack supports over 400+ models across different providers.

---

## Troubleshooting

**"Ordinant.ai isn't responding."**
Ensure Ordinant.ai for Slack is installed in your workspace and has been added to the channel you're using.

**"Ordinant.ai can't access my repository."**
Verify your GitHub integration is configured correctly in the [Integrations tab](https://app.ordinant.ai/integrations).

**"I'm getting incomplete responses."**
Try breaking your request into smaller, more specific questions.

**"Ordinant.ai doesn't understand my codebase."**
Make sure the repository you're asking about is connected and accessible through your GitHub integration.
