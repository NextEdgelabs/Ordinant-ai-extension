// kilocode_change - new file
import React, { memo, useCallback, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import TaskStatusView from "./TaskStatusView"
import ProjectSetupView from "./ProjectSetupView"

export type PopupTab = "taskStatus" | "projectSetup"

interface TaskInfoPopupProps {
	isOpen: boolean
	onClose: () => void
	initialTab?: PopupTab
}

const popupTabs: { id: PopupTab; label: string }[] = [
	{ id: "taskStatus", label: "Task Status" },
	{ id: "projectSetup", label: "Project Setup" },
]

/**
 * Full-width inline panel that renders Task Status or Project Setup views,
 * replacing the chat content when open. Feels like part of the main window.
 */
const TaskInfoPopup: React.FC<TaskInfoPopupProps> = ({ isOpen, onClose, initialTab = "taskStatus" }) => {
	const [activeTab, setActiveTab] = useState<PopupTab>(initialTab)

	// Sync initialTab when panel opens
	useEffect(() => {
		if (isOpen) {
			setActiveTab(initialTab)
		}
	}, [isOpen, initialTab])

	// Close on Escape key
	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) {
				onClose()
			}
		},
		[isOpen, onClose],
	)

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [handleKeyDown])

	if (!isOpen) {
		return null
	}

	return (
		<div className="absolute inset-0 z-50 flex flex-col bg-vscode-sideBar-background">
			{/* Tab header - matches ChatView header style */}
			<div className="flex h-9 shrink-0 border-b border-vscode-panel-border bg-[rgba(255,255,255,0.04)]">
				{popupTabs.map((tab, index) => (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={cn(
							"relative flex-1 h-full text-xs font-medium flex items-center justify-center transition-colors",
							"hover:text-vscode-foreground focus:outline-none",
							index < popupTabs.length - 1 && "border-r border-vscode-panel-border",
							activeTab === tab.id ? "text-vscode-foreground" : "text-vscode-descriptionForeground",
						)}>
						{tab.label}
						{activeTab === tab.id && (
							<div className="absolute bottom-0 left-0 right-0 h-[2px] bg-vscode-focusBorder" />
						)}
					</button>
				))}
			</div>

			{/* Content area - fills remaining space */}
			<div className="flex-1 min-h-0 overflow-hidden">
				{activeTab === "taskStatus" ? (
					<TaskStatusView onDone={onClose} />
				) : (
					<ProjectSetupView onDone={onClose} />
				)}
			</div>
		</div>
	)
}

export default memo(TaskInfoPopup)
