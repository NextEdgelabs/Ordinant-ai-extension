// kilocode_change - new file
import React, { memo, useCallback, useMemo } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FileReference {
	/** The raw mention text (e.g. "/src/extension.ts" or "extension.ts") */
	mentionText: string
	/** Display name (basename of the file) */
	displayName: string
	/** Full path for tooltip */
	fullPath: string
	/** Whether this is a folder */
	isFolder: boolean
}

/**
 * Returns a short file-type label and color based on file extension.
 */
function getFileTypeInfo(filename: string, isFolder: boolean): { label: string; color: string } {
	if (isFolder) {
		return { label: "\u{1F4C1}", color: "#e2b93d" }
	}
	const ext = filename.split(".").pop()?.toLowerCase() || ""
	switch (ext) {
		case "ts":
		case "tsx":
			return { label: "TS", color: "#3178c6" }
		case "js":
		case "jsx":
			return { label: "JS", color: "#f0db4f" }
		case "json":
			return { label: "{}", color: "#e2b93d" }
		case "css":
		case "scss":
		case "less":
			return { label: "#", color: "#a855f7" }
		case "html":
		case "htm":
			return { label: "<>", color: "#e34c26" }
		case "md":
		case "mdx":
			return { label: "MD", color: "#9ca3af" }
		case "py":
			return { label: "PY", color: "#4ade80" }
		case "kt":
		case "kts":
			return { label: "KT", color: "#a78bfa" }
		case "go":
			return { label: "GO", color: "#00add8" }
		case "rs":
			return { label: "RS", color: "#dea584" }
		case "java":
			return { label: "JV", color: "#f87171" }
		case "swift":
			return { label: "SW", color: "#f97316" }
		case "rb":
			return { label: "RB", color: "#ef4444" }
		case "c":
		case "h":
		case "cpp":
		case "cc":
		case "hpp":
			return { label: "C+", color: "#93c5fd" }
		case "sh":
		case "bash":
		case "zsh":
			return { label: "$", color: "#86efac" }
		case "yml":
		case "yaml":
			return { label: "YM", color: "#f87171" }
		case "sql":
			return { label: "SQ", color: "#67e8f9" }
		case "vue":
			return { label: "VU", color: "#4ade80" }
		case "svelte":
			return { label: "SV", color: "#f97316" }
		default:
			return { label: "\u{1F4C4}", color: "#9ca3af" }
	}
}

interface FileReferencePillProps {
	file: FileReference
	onRemove: (mentionText: string) => void
}

const FileReferencePill: React.FC<FileReferencePillProps> = memo(({ file, onRemove }) => {
	const { label, color } = useMemo(
		() => getFileTypeInfo(file.displayName, file.isFolder),
		[file.displayName, file.isFolder],
	)

	const handleRemove = useCallback(
		(e: React.MouseEvent) => {
			e.stopPropagation()
			e.preventDefault()
			onRemove(file.mentionText)
		},
		[onRemove, file.mentionText],
	)

	return (
		<div
			className={cn(
				// Layout
				"inline-flex items-center gap-[6px]",
				// Padding
				"px-[10px] py-[4px]",
				// Background
				"bg-[rgba(255,255,255,0.06)]",
				// Border
				"border border-[rgba(255,255,255,0.12)]",
				// Border radius
				"rounded-[4px]",
				// Text
				"text-[13px] leading-[20px]",
				"whitespace-nowrap",
				"max-w-[240px]",
				// Hover
				"hover:border-[rgba(255,255,255,0.25)]",
				"transition-colors duration-100",
				"cursor-default",
			)}
			title={file.fullPath}>
			{/* File type label: small, colored badge */}
			<span className="text-[11px] font-semibold leading-none shrink-0" style={{ color }}>
				{label}
			</span>
			{/* Filename */}
			<span className="truncate text-[color:var(--vscode-foreground)]">{file.displayName}</span>
			{/* Close button: always visible */}
			<button
				onClick={handleRemove}
				className={cn(
					"shrink-0 p-0 border-none bg-transparent",
					"text-[color:var(--vscode-descriptionForeground)]",
					"opacity-50 hover:opacity-100",
					"cursor-pointer",
					"transition-opacity duration-100",
					"inline-flex items-center justify-center",
					"rounded-sm",
				)}
				aria-label={`Remove ${file.displayName}`}>
				<X className="w-3 h-3" />
			</button>
		</div>
	)
})

FileReferencePill.displayName = "FileReferencePill"

interface FileReferencePillsProps {
	files: FileReference[]
	onRemove: (mentionText: string) => void
}

const FileReferencePills: React.FC<FileReferencePillsProps> = memo(({ files, onRemove }) => {
	if (files.length === 0) {
		return null
	}

	return (
		<div
			className={cn(
				// Layout: wrapping rows
				"flex items-center gap-[8px] flex-wrap",
				// Padding
				"px-[12px] py-[8px]",
				// Overflow: cap at ~3 rows, scroll vertically if more
				"max-h-[120px] overflow-y-auto",
				"scrollbar-none scrollbar-hide",
				// No own rounding or border — lives inside unified container
				// Subtle separator line between pills and text area
				"border-b border-[rgba(255,255,255,0.06)]",
			)}>
			{files.map((file) => (
				<FileReferencePill key={file.mentionText} file={file} onRemove={onRemove} />
			))}
		</div>
	)
})

FileReferencePills.displayName = "FileReferencePills"

export default FileReferencePills
