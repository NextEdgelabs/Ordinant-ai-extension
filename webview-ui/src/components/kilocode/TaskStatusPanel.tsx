// kilocode_change - new file
import React, { memo, useMemo } from "react"
import { ThumbsUp, Copy, Clock, Trash2, ChevronDown, Keyboard, Settings2, Link2, Scissors } from "lucide-react"

import { cn } from "@/lib/utils"
import { formatLargeNumber } from "@/utils/format"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { useSelectedModel } from "@/components/ui/hooks/useSelectedModel"
import { getModelMaxOutputTokens } from "@roo/api"
import { calculateTokenDistribution } from "@/utils/model-utils"
import { StandardTooltip } from "@/components/ui"

// --- Types ---

export interface TaskStatusData {
	/** Display label like "Task 1" */
	taskLabel: string
	/** Full task description text */
	taskDescription: string
	/** Tokens used in context so far */
	contextTokens: number
	/** Total context window size */
	contextWindow: number
	/** Input tokens sent */
	tokensIn: number
	/** Output tokens received */
	tokensOut: number
	/** Cache size (reads) */
	cacheReads?: number
	/** Cache writes */
	cacheWrites?: number
	/** Code output lines with optional color */
	codeOutput?: CodeOutputLine[]
	/** Referenced files */
	referencedFiles?: ReferencedFile[]
}

export interface CodeOutputLine {
	text: string
	color?: "green" | "red" | "yellow" | "white" | "gray"
}

export interface ReferencedFile {
	name: string
	type: "ts" | "json" | "txt" | "kt" | "other"
	/** Whether this file reference is highlighted (e.g. mentioned) */
	highlighted?: boolean
}

// --- Sub-components ---

/** File type icon badge */
const FileTypeIcon = ({ type }: { type: ReferencedFile["type"] }) => {
	const iconMap: Record<string, { label: string; className: string }> = {
		ts: { label: "TS", className: "bg-blue-600 text-white" },
		json: { label: "{}", className: "bg-yellow-600 text-white" },
		txt: { label: "≡", className: "bg-gray-500 text-white" },
		kt: { label: "KT", className: "bg-purple-600 text-white" },
		other: { label: "?", className: "bg-gray-600 text-white" },
	}
	const icon = iconMap[type] || iconMap.other
	return (
		<span
			className={cn(
				"inline-flex items-center justify-center text-[9px] font-bold rounded-sm w-[18px] h-[14px] shrink-0",
				icon.className,
			)}>
			{icon.label}
		</span>
	)
}

/** File chip component */
const FileChip = ({ file }: { file: ReferencedFile }) => (
	<span
		className={cn(
			"inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs cursor-pointer",
			"bg-vscode-editor-background border border-vscode-panel-border",
			"hover:bg-vscode-list-hoverBackground transition-colors",
		)}>
		<FileTypeIcon type={file.type} />
		<span className="truncate max-w-[120px]">{file.name}</span>
	</span>
)

/** Code output display */
const CodeOutputArea = ({ lines }: { lines: CodeOutputLine[] }) => {
	const colorMap: Record<string, string> = {
		green: "text-green-400",
		red: "text-red-400",
		yellow: "text-yellow-400",
		white: "text-vscode-foreground",
		gray: "text-vscode-descriptionForeground",
	}

	return (
		<div className="flex-1 overflow-auto font-mono text-xs leading-relaxed p-3 bg-vscode-editor-background rounded border border-vscode-panel-border">
			{lines.map((line, i) => (
				<div key={i} className={cn("whitespace-pre", colorMap[line.color || "white"])}>
					{line.text}
				</div>
			))}
		</div>
	)
}

/** Context length progress bar */
const ContextLengthBar = ({
	contextTokens,
	contextWindow,
	maxTokens,
}: {
	contextTokens: number
	contextWindow: number
	maxTokens?: number
}) => {
	const tokenDistribution = useMemo(
		() => calculateTokenDistribution(contextWindow, contextTokens, maxTokens),
		[contextWindow, contextTokens, maxTokens],
	)

	const { currentPercent, reservedPercent } = tokenDistribution

	return (
		<div className="flex items-center gap-2 w-full">
			<span className="text-xs font-semibold whitespace-nowrap">Context Length</span>
			<span className="text-xs text-vscode-descriptionForeground whitespace-nowrap">
				{formatLargeNumber(contextTokens)}
			</span>
			<div className="flex-1 relative">
				<div className="flex items-center h-1.5 rounded-full overflow-hidden w-full bg-[color-mix(in_srgb,var(--vscode-foreground)_15%,transparent)]">
					{/* Used portion */}
					<div
						className="h-full bg-vscode-progressBar-background rounded-full transition-all duration-300 ease-out"
						style={{ width: `${currentPercent}%` }}
					/>
					{/* Reserved portion */}
					<div
						className="h-full bg-[color-mix(in_srgb,var(--vscode-foreground)_25%,transparent)] transition-all duration-300 ease-out"
						style={{ width: `${reservedPercent}%` }}
					/>
				</div>
				{/* Scissor marker at current position */}
				<div
					className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
					style={{ left: `${Math.min(currentPercent, 100)}%` }}>
					<Scissors size={10} className="text-vscode-foreground opacity-60" />
				</div>
			</div>
			<span className="text-xs text-vscode-descriptionForeground whitespace-nowrap">
				{formatLargeNumber(contextWindow)}
			</span>
		</div>
	)
}

/** Metrics row: Tokens and Cache */
const MetricsRow = ({
	tokensIn,
	tokensOut,
	cacheReads,
}: {
	tokensIn: number
	tokensOut: number
	cacheReads?: number
}) => (
	<div className="flex items-center gap-4 text-xs">
		{/* Tokens */}
		<div className="flex items-center gap-2">
			<span className="font-semibold">Tokens</span>
			<span className="flex items-center gap-0.5">
				<i className="codicon codicon-arrow-up text-[10px] font-bold" />
				{formatLargeNumber(tokensIn)}
			</span>
			<span className="flex items-center gap-0.5">
				<i className="codicon codicon-arrow-down text-[10px] font-bold" />
				{formatLargeNumber(tokensOut)}
			</span>
		</div>

		{/* Cache */}
		{typeof cacheReads === "number" && cacheReads > 0 && (
			<div className="flex items-center gap-2">
				<span className="font-semibold">Cache</span>
				<span className="flex items-center gap-0.5">
					<span className="codicon codicon-database text-[10px]" />
					{formatLargeNumber(cacheReads)}
				</span>
			</div>
		)}
	</div>
)

/** Action icons row */
const ActionIcons = ({ onCopy, onDelete }: { onCopy?: () => void; onDelete?: () => void }) => (
	<div className="flex items-center gap-1">
		<StandardTooltip content="Helpful">
			<button className="p-1 rounded hover:bg-vscode-toolbar-hoverBackground transition-colors opacity-70 hover:opacity-100">
				<ThumbsUp size={14} />
			</button>
		</StandardTooltip>
		<StandardTooltip content="Copy">
			<button
				className="p-1 rounded hover:bg-vscode-toolbar-hoverBackground transition-colors opacity-70 hover:opacity-100"
				onClick={onCopy}>
				<Copy size={14} />
			</button>
		</StandardTooltip>
		<StandardTooltip content="History">
			<button className="p-1 rounded hover:bg-vscode-toolbar-hoverBackground transition-colors opacity-70 hover:opacity-100">
				<Clock size={14} />
			</button>
		</StandardTooltip>
		<StandardTooltip content="Delete">
			<button
				className="p-1 rounded hover:bg-vscode-toolbar-hoverBackground transition-colors opacity-70 hover:opacity-100"
				onClick={onDelete}>
				<Trash2 size={14} />
			</button>
		</StandardTooltip>
	</div>
)

/** Bottom dropdown selector */
const BottomDropdown = ({ label, className }: { label: string; className?: string }) => (
	<button
		className={cn(
			"flex items-center gap-1 px-2 py-1 text-xs rounded",
			"bg-transparent hover:bg-vscode-toolbar-hoverBackground transition-colors",
			"text-vscode-foreground",
			className,
		)}>
		<span>{label}</span>
		<ChevronDown size={12} />
	</button>
)

// --- Main Component ---

export interface TaskStatusPanelProps {
	data: TaskStatusData
	onClose?: () => void
	className?: string
}

const TaskStatusPanel = ({ data, onClose, className }: TaskStatusPanelProps) => {
	const { apiConfiguration } = useExtensionState()
	const { id: modelId, info: model } = useSelectedModel(apiConfiguration)

	const maxTokens = model ? getModelMaxOutputTokens({ modelId, model, settings: apiConfiguration }) : undefined

	return (
		<div
			className={cn(
				"flex flex-col h-full",
				"bg-vscode-editor-background text-vscode-foreground",
				"overflow-hidden",
				className,
			)}>
			{/* ===== Content Area ===== */}
			<div className="flex-1 flex flex-col overflow-hidden p-3 gap-3">
				{/* Close button */}
				{onClose && (
					<div className="flex justify-end">
						<button
							onClick={onClose}
							className="px-3 py-1 text-xs rounded border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-colors">
							Close
						</button>
					</div>
				)}
				{/* Task label and description */}
				<div className="flex flex-col gap-1">
					<span className="text-xs text-vscode-descriptionForeground">{data.taskLabel}</span>
					<p className="text-sm leading-snug text-vscode-foreground">{data.taskDescription}</p>
				</div>

				{/* Context Length bar */}
				<ContextLengthBar
					contextTokens={data.contextTokens}
					contextWindow={data.contextWindow}
					maxTokens={maxTokens}
				/>

				{/* Tokens + Cache + Action Icons row */}
				<div className="flex items-center justify-between">
					<MetricsRow tokensIn={data.tokensIn} tokensOut={data.tokensOut} cacheReads={data.cacheReads} />
					<ActionIcons />
				</div>

				{/* Code output area */}
				{data.codeOutput && data.codeOutput.length > 0 && <CodeOutputArea lines={data.codeOutput} />}

				{/* File chips */}
				{data.referencedFiles && data.referencedFiles.length > 0 && (
					<div className="flex flex-col gap-2 border-t border-vscode-panel-border pt-2">
						{/* Chip row */}
						<div className="flex flex-wrap gap-1.5">
							{data.referencedFiles.map((file, i) => (
								<FileChip key={i} file={file} />
							))}
						</div>
						{/* Reference text row */}
						<div className="flex flex-wrap items-center gap-1 text-xs text-vscode-descriptionForeground">
							{data.referencedFiles.map((file, i) => (
								<React.Fragment key={i}>
									<span
										className={cn(
											"px-1 py-0.5 rounded cursor-pointer",
											file.highlighted
												? "bg-green-800/40 text-green-300"
												: "bg-vscode-textCodeBlock-background text-vscode-foreground",
										)}>
										#file:{file.name}
									</span>
									{i < data.referencedFiles!.length - 1 && (
										<span className="text-vscode-descriptionForeground">and</span>
									)}
								</React.Fragment>
							))}
						</div>
					</div>
				)}
			</div>

			{/* ===== Bottom Controls Bar ===== */}
			<div className="flex items-center justify-between px-3 py-1.5 border-t border-vscode-panel-border bg-vscode-sideBar-background">
				<div className="flex items-center gap-1">
					<BottomDropdown label="LLM" />
					<BottomDropdown label="Agentic" />
				</div>
				<div className="flex items-center gap-0.5">
					<StandardTooltip content="Keyboard shortcuts">
						<button className="p-1.5 rounded hover:bg-vscode-toolbar-hoverBackground transition-colors opacity-70 hover:opacity-100">
							<Keyboard size={14} />
						</button>
					</StandardTooltip>
					<StandardTooltip content="Settings">
						<button className="p-1.5 rounded hover:bg-vscode-toolbar-hoverBackground transition-colors opacity-70 hover:opacity-100">
							<Settings2 size={14} />
						</button>
					</StandardTooltip>
					<StandardTooltip content="Links">
						<button className="p-1.5 rounded hover:bg-vscode-toolbar-hoverBackground transition-colors opacity-70 hover:opacity-100">
							<Link2 size={14} />
						</button>
					</StandardTooltip>
				</div>
			</div>
		</div>
	)
}

export default memo(TaskStatusPanel)
