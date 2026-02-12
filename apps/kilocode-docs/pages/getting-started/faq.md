---
title: "Frequently Asked Questions"
description: "Find answers to common questions about Ordinant.ai"
---

# Frequently Asked Questions

This page answers some common questions about Ordinant.ai.

## General

### What is Ordinant.ai?

Ordinant.ai is an open-source AI agent extension for Visual Studio Code. It helps you write code more efficiently by generating code, automating tasks, and providing suggestions.

### How does Ordinant.ai work?

Ordinant.ai uses large language models (LLMs) to understand your requests and translate them into actions. It can:

- Read, write, and delete files in your project.
- Execute commands in your VS Code terminal.
- Perform web browsing (if enabled).
- Use external tools via the Model Context Protocol (MCP).

You interact with Ordinant.ai through a chat interface, where you provide instructions and review/approve its proposed actions, or you can use the inline autocomplete feature which helps you as you type.

### What can Ordinant.ai do?

Ordinant.ai can help with a variety of coding tasks, including:

- Generating code from natural language descriptions.
- Refactoring existing code.
- Fixing bugs.
- Writing documentation.
- Explaining code.
- Answering questions about your codebase.
- Automating repetitive tasks.
- Creating new files and projects.

### Is Ordinant.ai free to use?

The Ordinant.ai extension itself is free and open-source. In order for Ordinant.ai to be useful, you need an AI model to respond to your queries. Models are hosted by providers and most charge for access.

There are some models available for free. The set of free models if constantly changing based on provider pricing decisions.

You can also use Ordinant.ai with a [local model](advanced-usage/local-models) or "Bring Your Own API Key" for [another model provider](getting-started/connecting-api-provider) (like [Anthropic](providers/anthropic), [OpenAI](providers/openai), [OpenRouter](providers/openrouter), [Requesty](providers/requesty), etc.).

### How do I pay for model usage via Ordinant.ai?

If you choose to pay for models via Ordinant.ai, you do so by buying Ordinant.ai credits. You can [buy Ordinant.ai credits](basic-usage/adding-credits) securely via Stripe with a credit card. We do not charge a markup on Ordinant.ai credits. $1 you give us is $1 in Ordinant.ai credits.

Model usage is metered by the providers in terms of different kinds of tokens. When you use a model, we debit your Ordinant.ai credits by the amount the provider charges us -- with no markup.

You can use any models you like as long as you have credits in your account. When you run out of credits, you can add more. It's that simple!

If you're looking to earn some credits, you could join our <a href={DISCORD_URL} target='_blank'>Discord</a> where we sometimes have promotional offers!

### What are the risks of using Ordinant.ai?

Ordinant.ai is a powerful tool, and it's important to use it responsibly. Here are some things to keep in mind:

- **Ordinant.ai can make mistakes.** Always review Ordinant.ai's proposed changes carefully before approving them.
- **Ordinant.ai can execute commands.** Be very cautious about allowing Ordinant.ai to run commands, especially if you're using auto-approval.
- **Ordinant.ai can access the internet.** If you're using a provider that supports web browsing, be aware that Ordinant.ai could potentially access sensitive information.

## Setup & Installation

### How do I install Ordinant.ai?

See the [Installation Guide](/getting-started/installing) for detailed instructions.

### Which API providers are supported?

Ordinant.ai supports a wide range of API providers, including:

- [Anthropic (Claude)](/providers/ordinant)
- [Anthropic (Claude)](/providers/anthropic)
- [OpenAI](/providers/openai)
- [OpenRouter](/providers/openrouter)
- [Google Gemini](/providers/gemini)
- [Glama](/providers/glama)
- [AWS Bedrock](/providers/bedrock)
- [GCP Vertex AI](/providers/vertex)
- [Ollama](/providers/ollama)
- [LM Studio](/providers/lmstudio)
- [DeepSeek](/providers/deepseek)
- [Mistral](/providers/mistral)
- [Unbound](/providers/unbound)
- [Requesty](/providers/requesty)
- [VS Code Language Model API](/providers/vscode-lm)

### How do I get an API key?

Each API provider has its own process for obtaining an API key. See the [Setting Up Your First AI Provider](/getting-started/connecting-api-provider) for links to the relevant documentation for each provider.

### Can I use Ordinant.ai with local models?

Yes, Ordinant.ai supports running models locally using [Ollama](/providers/ollama) and [LM Studio](/providers/lmstudio). See [Using Local Models](/advanced-usage/local-models) for instructions.

## Usage

### How do I start a new task?

Open the Ordinant panel (<img src="/docs/img/ordinant-dark.png" width="12" />) and type your task in the chat box. Be clear and specific about what you want Ordinant to do. See [The Chat Interface](/basic-usage/the-chat-interface) for best practices.

### When should I use chat vs autocomplete?

Use **chat** when you need to:

- Make complex, multi-file changes
- Refactor code across your project
- Get explanations or ask questions
- Have Ordinant.ai execute commands or browse the web
- Work on tasks that require planning and multiple steps

Use **autocomplete** when you need to:

- Complete the current line or block of code quickly
- Get suggestions for common patterns and boilerplate
- Make quick, localized edits without context switching
- Speed up typing repetitive code

In general, autocomplete is best for quick, in-flow coding assistance, while chat is better for larger tasks that require more context and interaction.

### What are modes in Ordinant.ai?

[Modes](/basic-usage/using-modes) are different personas that Ordinant.ai can adopt, each with a specific focus and set of capabilities. The built-in modes are:

- **Code:** For general-purpose coding tasks.
- **Architect:** For planning and technical leadership.
- **Ask:** For answering questions and providing information.
- **Debug:** For systematic problem diagnosis.
  You can also create [Custom Modes](/agent-behavior/custom-modes).

### How do I switch between modes?

Use the dropdown menu in the chat input area to select a different mode, or use the `/` command to switch to a specific mode.

### What are tools and how do I use them?

[Tools](/basic-usage/how-tools-work) are how Ordinant.ai interacts with your system. Ordinant.ai automatically selects and uses the appropriate tools to complete your tasks. You don't need to call tools directly. You will be prompted to approve or reject each tool use.

### What are context mentions?

[Context mentions](/basic-usage/context-mentions) are a way to provide Ordinant.ai with specific information about your project, such as files, folders, or problems. Use the "@" symbol followed by the item you want to mention (e.g., `@/src/file.ts`, `@problems`).

### Can Ordinant.ai access the internet?

Yes, if you are using a provider with a model that support web browsing. Be mindful of the security implications of allowing this.

### Can Ordinant.ai run commands in my terminal?

Yes, Ordinant.ai can execute commands in your VS Code terminal. You will be prompted to approve each command before it's executed, unless you've enabled auto-approval for commands. Be extremely cautious about auto-approving commands. If you're experiencing issues with terminal commands, see the [Shell Integration Guide](/features/shell-integration) for troubleshooting.

### How do I provide feedback to Ordinant.ai?

You can provide feedback by approving or rejecting Ordinant.ai's proposed actions. You can provide additional feedback by using the feedback field.

### Can I customize Ordinant.ai's behavior?

Yes, you can customize Ordinant.ai in several ways:

- **Custom Instructions:** Provide general instructions that apply to all modes, or mode-specific instructions.
- **Custom Modes:** Create your own modes with tailored prompts and tool permissions.
- **`.clinerules` Files:** Create `.clinerules` files in your project to provide additional guidelines.
- **Settings:** Adjust various settings, such as auto-approval, diff editing, and more.

### Does Ordinant.ai have any auto approval settings?

Yes, Ordinant.ai has a few settings that when enabled will automatically approve actions. Find out more [here](/features/auto-approving-actions).

## Advanced Features

### Can I use Ordinant.ai offline?

Yes, if you use a [local model](/advanced-usage/local-models).

### What is MCP (Model Context Protocol)?

[MCP](/features/mcp/overview) is a protocol that allows Ordinant.ai to communicate with external servers, extending its capabilities with custom tools and resources.

### Can I create my own MCP servers?

Yes, you can create your own MCP servers to add custom functionality to Ordinant.ai. See the [MCP documentation](https://github.com/modelcontextprotocol) for details.
Yes, you can create your own MCP servers to add custom functionality to Ordinant.ai. See the [MCP documentation](https://github.com/modelcontextprotocol) for details.

## Troubleshooting

### Ordinant.ai isn't responding. What should I do?

- Make sure your API key is correct and hasn't expired.
- Check your internet connection.
- Check the status of your chosen API provider.
- Try restarting VS Code.
- If the problem persists, report the issue on [GitHub](https://github.com/Ordinant-ai/ordinant-ai-extension/issues) or [Discord](https://ordinant.ai/discord).

### I'm seeing an error message. What does it mean?

The error message should provide some information about the problem. If you're unsure how to resolve it, seek help in the community forums.

### Ordinant.ai made changes I didn't want. How do I undo them?

Ordinant.ai uses VS Code's built-in file editing capabilities. You can use the standard "Undo" command (Ctrl/Cmd + Z) to revert changes. Also, if experimental checkpoints are enabled, Ordinant.ai can revert changes made to a file.

### How do I report a bug or suggest a feature?

Please report bugs or suggest features on the Ordinant.ai [Issues page](https://github.com/Ordinant-ai/ordinant-ai-extension/issues) and [Feature Requests page](https://github.com/Ordinant-ai/ordinant-ai-extension/discussions/categories/ideas).
