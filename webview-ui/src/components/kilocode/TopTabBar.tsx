// kilocode_change - new file
import React, { memo } from "react"
import { cn } from "@/lib/utils"

export type TopTab = "chat" | "taskStatus" | "projectSetup" // kilocode_change: add projectSetup

interface TopTabBarProps {
	activeTab: TopTab
	onTabChange: (tab: TopTab) => void
}

const tabs: { id: TopTab; label: string }[] = [
	{ id: "chat", label: "Chat" },
	{ id: "taskStatus", label: "Task Status" },
	{ id: "projectSetup", label: "Project Setup" }, // kilocode_change
]

/**
 * Persistent top-level tab bar that lets users switch between Chat and Task Status views.
 * Renders as a fixed bar at the top of the webview panel.
 */
const TopTabBar: React.FC<TopTabBarProps> = ({ activeTab, onTabChange }) => {
	return (
		<div className="fixed top-0 left-0 right-0 z-50 flex items-center h-9 bg-vscode-sideBar-background border-b border-vscode-panel-border">
			{tabs.map((tab) => (
				<button
					key={tab.id}
					onClick={() => onTabChange(tab.id)}
					className={cn(
						"relative px-4 h-full text-xs font-medium transition-colors",
						"hover:text-vscode-foreground focus:outline-none",
						activeTab === tab.id ? "text-vscode-foreground" : "text-vscode-descriptionForeground",
					)}>
					{tab.label}
					{activeTab === tab.id && (
						<div className="absolute bottom-0 left-1 right-1 h-[2px] bg-vscode-focusBorder rounded-full" />
					)}
				</button>
			))}
		</div>
	)
}

export default memo(TopTabBar)

/** Height constant for the tab bar, used by views to offset their top position */
export const TOP_TAB_BAR_HEIGHT = "36px"
