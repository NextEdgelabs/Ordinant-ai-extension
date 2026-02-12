// kilocode_change - new file
import React, { useMemo } from "react"

import type { ClineMessage } from "@roo-code/types"

import { combineApiRequests } from "@roo/combineApiRequests"
import { combineCommandSequences } from "@roo/combineCommandSequences"
import { getApiMetrics } from "@roo/getApiMetrics"

import { useExtensionState } from "@/context/ExtensionStateContext"
import { useSelectedModel } from "@/components/ui/hooks/useSelectedModel"

import TaskStatusPanel, { type TaskStatusData, type CodeOutputLine, type ReferencedFile } from "./TaskStatusPanel"

interface TaskStatusViewProps {
	onDone: () => void
}

/**
 * Extracts referenced file info from a ClineMessage by looking at mention patterns.
 */
function extractReferencedFiles(messages: ClineMessage[]): ReferencedFile[] {
	const fileSet = new Map<string, ReferencedFile>()

	for (const msg of messages) {
		if (!msg.text) continue

		// Match @file:path patterns and #file:path patterns
		const mentionRegex = /[@#](?:file:)?([^\s,]+\.\w+)/g
		let match: RegExpExecArray | null

		while ((match = mentionRegex.exec(msg.text)) !== null) {
			const fileName = match[1]
			if (!fileSet.has(fileName)) {
				const ext = fileName.split(".").pop()?.toLowerCase() || ""
				let type: ReferencedFile["type"] = "other"
				if (["ts", "tsx"].includes(ext)) type = "ts"
				else if (["json", "jsonc"].includes(ext)) type = "json"
				else if (["txt", "md", "log"].includes(ext)) type = "txt"
				else if (["kt", "kts"].includes(ext)) type = "kt"

				fileSet.set(fileName, { name: fileName, type })
			}
		}
	}

	return Array.from(fileSet.values())
}

/**
 * Extracts code-like output lines from recent messages for display.
 */
function extractCodeOutput(messages: ClineMessage[]): CodeOutputLine[] {
	const lines: CodeOutputLine[] = []

	// Look for the most recent tool or command output
	for (let i = messages.length - 1; i >= 0; i--) {
		const msg = messages[i]
		if (!msg.text) continue

		// Look for command output or text messages from the assistant
		if (msg.say === "command_output" || msg.say === "text") {
			const outputLines = msg.text.split("\n").slice(0, 20) // limit to 20 lines
			for (const line of outputLines) {
				let color: CodeOutputLine["color"] = "white"
				// Simple heuristic coloring
				if (line.includes("✓") || line.includes("pass") || line.includes("PASS")) {
					color = "green"
				} else if (
					line.includes("✗") ||
					line.includes("fail") ||
					line.includes("FAIL") ||
					line.includes("Error")
				) {
					color = "red"
				} else if (line.includes("warn") || line.includes("WARN") || line.includes("⚠")) {
					color = "yellow"
				} else if (line.trim() === "" || line.startsWith("//") || line.startsWith("#")) {
					color = "gray"
				}
				lines.push({ text: line, color })
			}
			break // Only take the most recent output
		}
	}

	return lines
}

const TaskStatusView: React.FC<TaskStatusViewProps> = ({ onDone }) => {
	const { clineMessages: messages, apiConfiguration } = useExtensionState()
	const { info: model } = useSelectedModel(apiConfiguration)

	// Get the task (first message)
	const task = useMemo(() => messages.at(0), [messages])

	// Compute API metrics from messages
	const modifiedMessages = useMemo(() => combineApiRequests(combineCommandSequences(messages.slice(1))), [messages])
	const apiMetrics = useMemo(() => getApiMetrics(modifiedMessages), [modifiedMessages])

	// Extract data for the panel
	const referencedFiles = useMemo(() => extractReferencedFiles(messages), [messages])
	const codeOutput = useMemo(() => extractCodeOutput(messages), [messages])

	const contextWindow = model?.contextWindow || 128000

	const taskStatusData: TaskStatusData = useMemo(
		() => ({
			taskLabel: "Task 1",
			taskDescription: task?.text || "No active task",
			contextTokens: apiMetrics.contextTokens || 0,
			contextWindow,
			tokensIn: apiMetrics.totalTokensIn || 0,
			tokensOut: apiMetrics.totalTokensOut || 0,
			cacheReads: apiMetrics.totalCacheReads,
			cacheWrites: apiMetrics.totalCacheWrites,
			codeOutput,
			referencedFiles,
		}),
		[task, apiMetrics, contextWindow, codeOutput, referencedFiles],
	)

	return (
		<div className="flex-1 flex flex-col min-h-0 overflow-hidden">
			<TaskStatusPanel data={taskStatusData} onClose={onDone} className="h-full border-0 rounded-none" />
		</div>
	)
}

export default TaskStatusView
