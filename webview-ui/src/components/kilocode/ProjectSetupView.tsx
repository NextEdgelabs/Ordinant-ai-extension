// kilocode_change - new file
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { vscode } from "@/utils/vscode"

// ─── Types ───────────────────────────────────────────────────────────────────

interface SteeringFileInfo {
	name: string
	path: string
	isFoundation: boolean
	exists: boolean
}

interface FoundationFileInfo {
	filename: string
	label: string
	description: string
	exists: boolean
	path: string
}

interface SteeringData {
	workspaceFiles: SteeringFileInfo[]
	globalFiles: SteeringFileInfo[]
	foundationFiles: FoundationFileInfo[]
}

interface ProjectSetupViewProps {
	onDone: () => void
}

// ─── Icon Components ─────────────────────────────────────────────────────────

const FileDocIcon: React.FC<{ className?: string }> = ({ className }) => (
	<svg
		className={className}
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M13.85 4.44L10.57 1.14C10.45 1.05 10.31 1 10.15 1H3.5C2.67 1 2 1.67 2 2.5v11c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5V4.85c0-.16-.05-.3-.15-.41zM10.5 2.71L12.29 4.5H10.5V2.71zM12.5 14h-9c-.28 0-.5-.22-.5-.5v-11c0-.28.22-.5.5-.5h6v3.5c0 .28.22.5.5.5H13v7.5c0 .28-.22.5-.5.5z"
			fill="currentColor"
		/>
		<path d="M5 8h6v1H5V8zM5 10h6v1H5v-1zM5 6h3v1H5V6z" fill="currentColor" />
	</svg>
)

const FolderIcon: React.FC<{ className?: string }> = ({ className }) => (
	<svg
		className={className}
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M14.5 3H7.71l-.85-.85L6.5 1.79 6.15 2H1.5l-.5.5v11l.5.5h13l.5-.5v-10L14.5 3zm-.51 8.49V13H2V5h5.29l.85.85.36.15H14v5.49z"
			fill="currentColor"
		/>
	</svg>
)

const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
	<svg
		className={className}
		width="14"
		height="14"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path d="M14 7v1H8v6H7V8H1V7h6V1h1v6h6z" fill="currentColor" />
	</svg>
)

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
	<svg
		className={className}
		width="14"
		height="14"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M11 1.75V3h2.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675a.75.75 0 10-1.492.15l.66 6.6A1.75 1.75 0 005.405 15h5.19a1.75 1.75 0 001.741-1.575l.66-6.6a.75.75 0 00-1.492-.15l-.66 6.6a.25.25 0 01-.249.225h-5.19a.25.25 0 01-.249-.225l-.66-6.6zM6.75 1.5a.25.25 0 00-.25.25V3h3V1.75a.25.25 0 00-.25-.25h-2.5z"
			fill="currentColor"
		/>
	</svg>
)

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
	<svg
		className={className}
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path d="M7.5 0L9.09 5.41L14.5 7L9.09 8.59L7.5 14L5.91 8.59L0.5 7L5.91 5.41L7.5 0z" fill="currentColor" />
		<path
			d="M12 10l.82 2.68L15.5 13.5l-2.68.82L12 17l-.82-2.68L8.5 13.5l2.68-.82L12 10z"
			fill="currentColor"
			opacity="0.6"
		/>
	</svg>
)

const EditIcon: React.FC<{ className?: string }> = ({ className }) => (
	<svg
		className={className}
		width="14"
		height="14"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M13.23 1h-1.46L3.52 9.25l-.16.22L1 13.59 2.41 15l4.12-2.36.22-.16L15 4.23V2.77L13.23 1zM2.41 13.59l1.51-3 1.46 1.46-2.97 1.54zm3.83-2.06L4.47 9.76 11 3.23l1.77 1.77-6.53 6.53z"
			fill="currentColor"
		/>
	</svg>
)

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
	<svg
		className={className}
		width="14"
		height="14"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path d="M5.7 13.7L5 13l4.6-4.6L5 3.7l.7-.7 5.3 5.3-5.3 5.4z" fill="currentColor" />
	</svg>
)

// ─── Foundation File Card ────────────────────────────────────────────────────

const FoundationFileCard: React.FC<{
	file: FoundationFileInfo
	onOpenFile: (path: string) => void
	onCreateFile: (filename: string) => void
}> = ({ file, onOpenFile, onCreateFile }) => {
	const statusColor = file.exists ? "text-[#4ec9b0]" : "text-vscode-descriptionForeground"
	const statusLabel = file.exists ? "Configured" : "Not created"

	return (
		<div className="flex items-start gap-3 p-3 rounded-md border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.05)] transition-colors">
			<div className="flex-shrink-0 mt-0.5">
				<FileDocIcon className="text-vscode-descriptionForeground" />
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2">
					<span className="text-xs font-semibold text-vscode-foreground">{file.label}</span>
					<span className={`text-[10px] font-medium ${statusColor}`}>{statusLabel}</span>
				</div>
				<p className="text-[11px] text-vscode-descriptionForeground mt-0.5 leading-relaxed">
					{file.description}
				</p>
			</div>
			<button
				className="flex-shrink-0 px-2.5 py-1 text-[11px] font-medium rounded border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] text-vscode-foreground transition-colors"
				onClick={() => (file.exists ? onOpenFile(file.path) : onCreateFile(file.filename))}>
				{file.exists ? "Edit" : "Create"}
			</button>
		</div>
	)
}

// ─── Steering File Row ───────────────────────────────────────────────────────

const SteeringFileRow: React.FC<{
	file: SteeringFileInfo
	onOpen: (path: string) => void
	onDelete: (path: string) => void
}> = ({ file, onOpen, onDelete }) => (
	<div className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-[rgba(255,255,255,0.04)] group transition-colors">
		<FileDocIcon className="flex-shrink-0 text-vscode-descriptionForeground w-3.5 h-3.5" />
		<span className="flex-1 text-xs text-vscode-foreground truncate">{file.name}</span>
		<button
			className="opacity-0 group-hover:opacity-70 hover:!opacity-100 transition-opacity p-0.5"
			onClick={() => onOpen(file.path)}
			title="Edit file">
			<EditIcon className="text-vscode-descriptionForeground w-3 h-3" />
		</button>
		<button
			className="opacity-0 group-hover:opacity-70 hover:!opacity-100 transition-opacity p-0.5"
			onClick={() => onDelete(file.path)}
			title="Delete file">
			<TrashIcon className="text-vscode-descriptionForeground w-3 h-3" />
		</button>
	</div>
)

// ─── New File Form ───────────────────────────────────────────────────────────

const NewFileForm: React.FC<{
	isGlobal: boolean
	onSubmit: (filename: string, isGlobal: boolean) => void
	onCancel: () => void
}> = ({ isGlobal, onSubmit, onCancel }) => {
	const [filename, setFilename] = useState("")

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const name = filename.trim()
		if (!name) return
		// Auto-add .md extension if missing
		const finalName = /\.\w+$/.test(name) ? name : `${name}.md`
		onSubmit(finalName, isGlobal)
		setFilename("")
	}

	return (
		<form onSubmit={handleSubmit} className="flex items-center gap-2 mt-1">
			<input
				autoFocus
				type="text"
				value={filename}
				onChange={(e) => setFilename(e.target.value)}
				placeholder="filename.md"
				className="flex-1 text-xs px-2 py-1 rounded border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.04)] text-vscode-foreground placeholder:text-vscode-descriptionForeground focus:outline-none focus:border-vscode-focusBorder"
			/>
			<button
				type="submit"
				className="text-[11px] px-2 py-1 rounded bg-vscode-button-background text-vscode-button-foreground hover:bg-vscode-button-hoverBackground transition-colors">
				Add
			</button>
			<button
				type="button"
				onClick={onCancel}
				className="text-[11px] px-2 py-1 rounded border border-[rgba(255,255,255,0.12)] text-vscode-descriptionForeground hover:text-vscode-foreground transition-colors">
				Cancel
			</button>
		</form>
	)
}

// ─── Section Header ──────────────────────────────────────────────────────────

const SectionHeader: React.FC<{
	title: string
	count?: number
	icon?: React.ReactNode
	action?: React.ReactNode
}> = ({ title, count, icon, action }) => (
	<div className="flex items-center gap-2 mb-2">
		{icon}
		<h3 className="text-xs font-semibold text-vscode-foreground uppercase tracking-wider">{title}</h3>
		{count !== undefined && (
			<span className="text-[10px] font-medium text-vscode-descriptionForeground bg-[rgba(255,255,255,0.06)] px-1.5 py-0.5 rounded-full">
				{count}
			</span>
		)}
		<div className="flex-1" />
		{action}
	</div>
)

// ─── Main Component ──────────────────────────────────────────────────────────

const ProjectSetupView: React.FC<ProjectSetupViewProps> = ({ onDone }) => {
	const [steeringData, setSteeringData] = useState<SteeringData | null>(null)
	const [showNewWorkspaceFile, setShowNewWorkspaceFile] = useState(false)
	const [showNewGlobalFile, setShowNewGlobalFile] = useState(false)

	// Request data on mount
	useEffect(() => {
		vscode.postMessage({ type: "refreshSteering" })
	}, [])

	// Listen for steering data from extension
	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			const message = event.data
			if (message.type === "steeringData") {
				setSteeringData({
					workspaceFiles: message.workspaceFiles || [],
					globalFiles: message.globalFiles || [],
					foundationFiles: message.foundationFiles || [],
				})
			}
		}
		window.addEventListener("message", handleMessage)
		return () => window.removeEventListener("message", handleMessage)
	}, [])

	const handleOpenFile = useCallback((filePath: string) => {
		vscode.postMessage({ type: "openFile", text: filePath })
	}, [])

	const handleCreateFoundationFile = useCallback((filename: string) => {
		vscode.postMessage({ type: "createSteeringFile", filename, isGlobal: false })
	}, [])

	const handleDeleteFile = useCallback((filePath: string) => {
		vscode.postMessage({ type: "deleteSteeringFile", steeringFilePath: filePath })
	}, [])

	const handleCreateSteeringFile = useCallback((filename: string, isGlobal: boolean) => {
		vscode.postMessage({ type: "createSteeringFile", filename, isGlobal })
		setShowNewWorkspaceFile(false)
		setShowNewGlobalFile(false)
	}, [])

	const handleGenerateAll = useCallback(() => {
		vscode.postMessage({ type: "generateFoundationFiles" })
	}, [])

	// Separate workspace steering files (non-foundation) for the custom section
	const customWorkspaceFiles = useMemo(
		() => (steeringData?.workspaceFiles || []).filter((f) => !f.isFoundation),
		[steeringData],
	)

	const globalFiles = useMemo(() => steeringData?.globalFiles || [], [steeringData])

	const foundationFiles = useMemo(() => steeringData?.foundationFiles || [], [steeringData])
	const foundationConfigured = useMemo(() => foundationFiles.filter((f) => f.exists).length, [foundationFiles])

	const allMissing = useMemo(
		() => foundationFiles.length > 0 && foundationFiles.every((f) => !f.exists),
		[foundationFiles],
	)

	return (
		<div className="flex-1 flex flex-col min-h-0 overflow-hidden">
			<div className="flex-1 overflow-y-auto">
				<div className="px-4 py-4 space-y-6">
					{/* Close button */}
					<div className="flex justify-end">
						<button
							onClick={onDone}
							className="px-3 py-1 text-xs rounded border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-colors">
							Close
						</button>
					</div>
					{/* Header */}
					<div>
						<h2 className="text-sm font-semibold text-vscode-foreground">Project Setup</h2>
						<p className="text-[11px] text-vscode-descriptionForeground mt-1 leading-relaxed">
							Configure foundation files and steering guidance to help the AI understand your project.
						</p>
					</div>

					{/* Section A: Foundation Steering Files */}
					<div>
						<SectionHeader
							title="Foundation Files"
							count={foundationConfigured}
							icon={<SparklesIcon className="text-[#dcdcaa] w-3.5 h-3.5" />}
							action={
								allMissing ? (
									<button
										onClick={handleGenerateAll}
										className="flex items-center gap-1 text-[11px] px-2 py-1 rounded bg-vscode-button-background text-vscode-button-foreground hover:bg-vscode-button-hoverBackground transition-colors">
										<SparklesIcon className="w-3 h-3" />
										Generate All
									</button>
								) : null
							}
						/>
						<p className="text-[11px] text-vscode-descriptionForeground mb-3 leading-relaxed">
							Define core project context — product goals, technology choices, and structural patterns.
						</p>

						{steeringData ? (
							<div className="space-y-2">
								{foundationFiles.map((file) => (
									<FoundationFileCard
										key={file.filename}
										file={file}
										onOpenFile={handleOpenFile}
										onCreateFile={handleCreateFoundationFile}
									/>
								))}
							</div>
						) : (
							<div className="text-[11px] text-vscode-descriptionForeground py-4 text-center">
								Loading...
							</div>
						)}
					</div>

					{/* Divider */}
					<div className="border-t border-[rgba(255,255,255,0.06)]" />

					{/* Section B: Custom Steering Files */}
					<div>
						<SectionHeader
							title="Custom Steering"
							count={customWorkspaceFiles.length + globalFiles.length}
							icon={<FolderIcon className="text-[#c586c0] w-3.5 h-3.5" />}
						/>
						<p className="text-[11px] text-vscode-descriptionForeground mb-3 leading-relaxed">
							Add additional guidance files scoped to this workspace or shared globally.
						</p>

						{/* Workspace Steering Files */}
						<div className="mb-4">
							<div className="flex items-center justify-between mb-1.5">
								<span className="text-[11px] font-medium text-vscode-descriptionForeground uppercase tracking-wide">
									Workspace
								</span>
								<button
									onClick={() => setShowNewWorkspaceFile(true)}
									className="flex items-center gap-1 text-[10px] text-vscode-descriptionForeground hover:text-vscode-foreground transition-colors"
									title="Add workspace steering file">
									<PlusIcon className="w-3 h-3" />
									Add
								</button>
							</div>

							{customWorkspaceFiles.length > 0 ? (
								<div className="space-y-0.5">
									{customWorkspaceFiles.map((file) => (
										<SteeringFileRow
											key={file.path}
											file={file}
											onOpen={handleOpenFile}
											onDelete={handleDeleteFile}
										/>
									))}
								</div>
							) : (
								<p className="text-[10px] text-vscode-descriptionForeground py-2 px-2 italic">
									No custom workspace steering files yet.
								</p>
							)}

							{showNewWorkspaceFile && (
								<NewFileForm
									isGlobal={false}
									onSubmit={handleCreateSteeringFile}
									onCancel={() => setShowNewWorkspaceFile(false)}
								/>
							)}
						</div>

						{/* Global Steering Files */}
						<div>
							<div className="flex items-center justify-between mb-1.5">
								<span className="text-[11px] font-medium text-vscode-descriptionForeground uppercase tracking-wide">
									Global
								</span>
								<button
									onClick={() => setShowNewGlobalFile(true)}
									className="flex items-center gap-1 text-[10px] text-vscode-descriptionForeground hover:text-vscode-foreground transition-colors"
									title="Add global steering file">
									<PlusIcon className="w-3 h-3" />
									Add
								</button>
							</div>

							{globalFiles.length > 0 ? (
								<div className="space-y-0.5">
									{globalFiles.map((file) => (
										<SteeringFileRow
											key={file.path}
											file={file}
											onOpen={handleOpenFile}
											onDelete={handleDeleteFile}
										/>
									))}
								</div>
							) : (
								<p className="text-[10px] text-vscode-descriptionForeground py-2 px-2 italic">
									No global steering files yet.
								</p>
							)}

							{showNewGlobalFile && (
								<NewFileForm
									isGlobal={true}
									onSubmit={handleCreateSteeringFile}
									onCancel={() => setShowNewGlobalFile(false)}
								/>
							)}
						</div>
					</div>

					{/* Divider */}
					<div className="border-t border-[rgba(255,255,255,0.06)]" />

					{/* Section C: Rules & Workflows Quick Access */}
					<div>
						<SectionHeader
							title="Rules & Workflows"
							icon={<ChevronRightIcon className="text-[#569cd6] w-3.5 h-3.5" />}
						/>
						<p className="text-[11px] text-vscode-descriptionForeground mb-3 leading-relaxed">
							Manage rules that define coding standards and workflows that automate tasks.
						</p>

						<div className="flex gap-2">
							<button
								onClick={() =>
									window.postMessage({ type: "action", action: "settingsButtonClicked" }, "*")
								}
								className="flex-1 flex items-center justify-center gap-1.5 py-2 text-[11px] font-medium rounded border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] text-vscode-foreground transition-colors">
								<EditIcon className="w-3 h-3" />
								Manage Rules
							</button>
							<button
								onClick={() =>
									window.postMessage({ type: "action", action: "settingsButtonClicked" }, "*")
								}
								className="flex-1 flex items-center justify-center gap-1.5 py-2 text-[11px] font-medium rounded border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] text-vscode-foreground transition-colors">
								<FolderIcon className="w-3 h-3" />
								Manage Workflows
							</button>
						</div>
					</div>

					{/* Bottom spacing */}
					<div className="h-4" />
				</div>
			</div>
		</div>
	)
}

export default ProjectSetupView
