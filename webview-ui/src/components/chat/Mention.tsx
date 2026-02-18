import React from "react"
import { mentionRegexGlobal } from "@roo/context-mentions"

import { vscode } from "../../utils/vscode"

interface MentionProps {
	text?: string
	withShadow?: boolean
}

// kilocode_change start: Support #file: syntax alongside @ mentions

export const Mention = ({ text, withShadow = false }: MentionProps) => {
	if (!text) {
		return <>{text}</>
	}

	// First pass: split on @ mentions
	const atParts = text.split(mentionRegexGlobal).map((part, index) => {
		if (index % 2 === 0) {
			// This is regular text — check for #file: mentions within it
			const subParts: React.ReactNode[] = []
			let lastIdx = 0
			// Create regex inside render to avoid stale lastIndex from module-level /g regex
			const matches = [...part.matchAll(/#file:([^\s,]+)/g)]
			if (matches.length === 0) {
				return part
			}
			for (const match of matches) {
				const matchStart = match.index!
				if (matchStart > lastIdx) {
					subParts.push(part.slice(lastIdx, matchStart))
				}
				const filename = match[1]
				subParts.push(
					<span
						key={`hashfile-${index}-${matchStart}`}
						className={`${withShadow ? "mention-context-highlight-with-shadow" : "mention-context-highlight"} text-[0.9em] cursor-pointer`}
						onClick={() => vscode.postMessage({ type: "openMention", text: `/${filename}` })}>
						#file:{filename}
					</span>,
				)
				lastIdx = matchStart + match[0].length
			}
			if (lastIdx < part.length) {
				subParts.push(part.slice(lastIdx))
			}
			return <React.Fragment key={`text-${index}`}>{subParts}</React.Fragment>
		} else {
			// This is an @ mention.
			return (
				<span
					key={index}
					className={`${withShadow ? "mention-context-highlight-with-shadow" : "mention-context-highlight"} text-[0.9em] cursor-pointer`}
					onClick={() => vscode.postMessage({ type: "openMention", text: part })}>
					@{part}
				</span>
			)
		}
	})

	return <>{atParts}</>
}
// kilocode_change end
