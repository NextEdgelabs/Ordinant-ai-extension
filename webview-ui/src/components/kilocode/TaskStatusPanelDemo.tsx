// kilocode_change - new file
/**
 * Demo component for TaskStatusPanel.
 * Shows the panel with sample data matching the design mockup.
 * This can be used for development/testing and removed later.
 */
import React from "react"
import TaskStatusPanel, { type TaskStatusData } from "./TaskStatusPanel"

const sampleData: TaskStatusData = {
	taskLabel: "Task 1",
	taskDescription:
		"Can you identify the overarching design of Caching as it pertains to Context/prompt/messageHistory sent in to the LLMs in each calls between the user and AI Assistant, and the recursive LLM calling as the Agentic Orchestration is recursively making LLM calls?",
	contextTokens: 107200,
	contextWindow: 256000,
	tokensIn: 368400,
	tokensOut: 1800,
	cacheReads: 108300,
	codeOutput: [
		{ text: "        await expect(page).toHaveURL(/.*dashboard/);", color: "green" },
		{ text: "", color: "white" },
		{ text: "    });", color: "gray" },
		{ text: "", color: "white" },
		{ text: "        await expect(page).toHaveURL(/.*dashboard/);", color: "white" },
		{ text: "        await expect(page).toHaveURL(/.*dashboard/);", color: "white" },
		{ text: "        await expect(page).toHaveURL(/.*dashboard/);", color: "red" },
		{ text: "        await expect(page).toHaveURL(/.*dashboard/);", color: "yellow" },
	],
	referencedFiles: [
		{ name: "extension.ts", type: "ts" },
		{ name: "excludes.ts", type: "ts" },
		{ name: "tasks.json", type: "json" },
		{ name: "package.json", type: "json" },
		{ name: "testfile1.txt", type: "txt" },
		{ name: "webview-helpers.ts", type: "ts", highlighted: true },
		{ name: "WebviewEvents.kt", type: "kt" },
	],
}

export const TaskStatusPanelDemo = () => {
	return (
		<div className="w-full h-full p-4">
			<div className="max-w-2xl mx-auto h-[600px]">
				<TaskStatusPanel data={sampleData} onClose={() => console.log("Close clicked")} />
			</div>
		</div>
	)
}

export default TaskStatusPanelDemo
