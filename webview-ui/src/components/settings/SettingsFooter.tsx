import { HTMLAttributes } from "react"

import { VSCodeButton, VSCodeLink } from "@vscode/webview-ui-toolkit/react"

import { vscode } from "@/utils/vscode"
import { cn } from "@/lib/utils"

type SettingsFooterProps = HTMLAttributes<HTMLDivElement> & {
	version: string
}

export const SettingsFooter = ({ version, className, ...props }: SettingsFooterProps) => (
	<div className={cn("text-vscode-descriptionForeground p-5", className)} {...props}>
		<p style={{ wordWrap: "break-word", margin: 0, padding: 0 }}>
			If you have any questions or feedback, feel free to open an issue at{" "}
			<VSCodeLink href="https://github.com/Ordinant-ai/ordinant-ai-extension" style={{ display: "inline" }}>
				github.com/Ordinant-ai/ordinant-ai-extension
			</VSCodeLink>{" "}
			or join{" "}
			<VSCodeLink href="https://www.reddit.com/r/OrdinantAI/" style={{ display: "inline" }}>
				reddit.com/r/OrdinantAI
			</VSCodeLink>
			.
		</p>
		<p style={{ wordWrap: "break-word", margin: 0, padding: 0 }}>
			Regarding financial questions, please contact Customer Service at{" "}
			<VSCodeLink href="mailto:hi@ordinant.ai" style={{ display: "inline" }}>
				hi@ordinant.ai
			</VSCodeLink>{" "}
		</p>
		<p className="italic">Ordinant.ai v{version}</p>
		<div className="flex justify-between items-center gap-3">
			<p>Reset all global state and secret storage in the extension.</p>
			<VSCodeButton
				onClick={() => vscode.postMessage({ type: "resetState" })}
				appearance="secondary"
				className="shrink-0">
				<span className="codicon codicon-warning text-vscode-errorForeground mr-1" />
				Reset
			</VSCodeButton>
		</div>
	</div>
)
