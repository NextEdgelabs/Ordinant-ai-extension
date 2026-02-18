// kilocode_change - new file
import os from "os"
import * as path from "path"
import fs from "fs/promises"
import * as vscode from "vscode"
import { fileExistsAtPath } from "../../utils/fs"
import { openFile } from "../../integrations/misc/open-file"
import { getWorkspacePath } from "../../utils/path"
import { GlobalFileNames } from "../../shared/globalFileNames"
import { allowedExtensions } from "../../shared/kilocode/rules"

// Foundation file definitions
export const FOUNDATION_FILES = [
	{
		filename: "product.md",
		label: "Product Overview",
		description: "Defines your product's purpose, target users, key features, and business objectives.",
	},
	{
		filename: "tech.md",
		label: "Technology Stack",
		description: "Documents your chosen frameworks, libraries, development tools, and technical constraints.",
	},
	{
		filename: "structure.md",
		label: "Project Structure",
		description: "Outlines file organization, naming conventions, import patterns, and architectural decisions.",
	},
] as const

export interface SteeringFileInfo {
	name: string
	path: string
	isFoundation: boolean
	exists: boolean
}

export interface SteeringData {
	workspaceFiles: SteeringFileInfo[]
	globalFiles: SteeringFileInfo[]
	foundationFiles: { filename: string; label: string; description: string; exists: boolean; path: string }[]
}

/**
 * Reads workspace and global steering directories and returns file lists with metadata.
 */
export async function getSteeringData(workspacePath: string): Promise<SteeringData> {
	const homedir = os.homedir()
	const wsSteeringDir = path.join(workspacePath, GlobalFileNames.steering)
	const globalSteeringDir = path.join(homedir, GlobalFileNames.steering)

	const workspaceFiles = await getSteeringFilesFromDirectory(wsSteeringDir)
	const globalFiles = await getSteeringFilesFromDirectory(globalSteeringDir)

	// Check foundation files existence
	const foundationFiles = await Promise.all(
		FOUNDATION_FILES.map(async (f) => {
			const filePath = path.join(wsSteeringDir, f.filename)
			const exists = await fileExistsAtPath(filePath)
			return {
				filename: f.filename,
				label: f.label,
				description: f.description,
				exists,
				path: filePath,
			}
		}),
	)

	return { workspaceFiles, globalFiles, foundationFiles }
}

async function getSteeringFilesFromDirectory(dirPath: string): Promise<SteeringFileInfo[]> {
	const exists = await fileExistsAtPath(dirPath)
	if (!exists) {
		return []
	}

	const files = await fs.readdir(dirPath, { withFileTypes: true })
	const result: SteeringFileInfo[] = []

	for (const file of files) {
		if (file.isFile() && allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))) {
			const filePath = path.join(dirPath, file.name)
			const isFoundation = FOUNDATION_FILES.some((f) => f.filename === file.name)
			result.push({
				name: file.name,
				path: filePath,
				isFoundation,
				exists: true,
			})
		}
	}

	return result.sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * Creates a new steering file in workspace or global steering directory.
 */
export async function createSteeringFile(filename: string, isGlobal: boolean, content?: string): Promise<void> {
	const workspacePath = getWorkspacePath()
	if (!workspacePath && !isGlobal) {
		vscode.window.showErrorMessage("No workspace found. Open a folder first.")
		return
	}

	const baseDir = isGlobal ? os.homedir() : workspacePath
	const steeringDir = path.join(baseDir, GlobalFileNames.steering)

	await fs.mkdir(steeringDir, { recursive: true })

	const filePath = path.join(steeringDir, filename)

	if (await fileExistsAtPath(filePath)) {
		vscode.window.showErrorMessage(`Steering file "${filename}" already exists.`)
		return
	}

	const fileContent =
		content ||
		`# ${path.basename(filename, path.extname(filename))}

Add your steering guidance here. Use natural language to describe your requirements.
`

	await fs.writeFile(filePath, fileContent, "utf8")
	await openFile(filePath)
}

/**
 * Deletes a steering file after user confirmation.
 */
export async function deleteSteeringFile(filePath: string): Promise<void> {
	const filename = path.basename(filePath)
	const result = await vscode.window.showWarningMessage(
		`Are you sure you want to delete "${filename}"?`,
		{ modal: true },
		"Delete",
	)

	if (result === "Delete") {
		await fs.unlink(filePath)
		vscode.window.showInformationMessage(`Deleted "${filename}".`)
	}
}

/**
 * Generates the three foundation steering files (product.md, tech.md, structure.md)
 * with template content. Skips files that already exist.
 */
export async function generateFoundationFiles(
	workspacePath: string,
): Promise<{ created: string[]; skipped: string[] }> {
	const steeringDir = path.join(workspacePath, GlobalFileNames.steering)
	await fs.mkdir(steeringDir, { recursive: true })

	const created: string[] = []
	const skipped: string[] = []

	const templates: Record<string, string> = {
		"product.md": `---
inclusion: always
---

# Product Overview

## Purpose
Describe what this product does and the problem it solves.

## Target Users
Who are the primary users of this product?

## Key Features
- Feature 1
- Feature 2
- Feature 3

## Business Objectives
What are the key goals and success metrics?
`,
		"tech.md": `---
inclusion: always
---

# Technology Stack

## Frameworks & Libraries
List your primary frameworks and libraries.

## Development Tools
What tools are used for building, testing, and deploying?

## Technical Constraints
Any limitations or requirements to be aware of.

## Coding Standards
Key conventions the AI should follow when writing code.
`,
		"structure.md": `---
inclusion: always
---

# Project Structure

## File Organization
Describe how files and directories are organized.

## Naming Conventions
What naming patterns are used for files, components, functions, variables?

## Import Patterns
How should imports be organized and what conventions are followed?

## Architectural Decisions
Key architectural patterns and decisions that guide the codebase.
`,
	}

	for (const [filename, content] of Object.entries(templates)) {
		const filePath = path.join(steeringDir, filename)
		if (await fileExistsAtPath(filePath)) {
			skipped.push(filename)
		} else {
			await fs.writeFile(filePath, content, "utf8")
			created.push(filename)
		}
	}

	return { created, skipped }
}

/**
 * Reads all steering file contents for inclusion in the system prompt.
 * Returns an array of { name, content } for files with inclusion: always or no frontmatter.
 */
export async function getSteeringContentsForPrompt(
	workspacePath: string,
): Promise<{ name: string; content: string }[]> {
	const homedir = os.homedir()
	const wsDir = path.join(workspacePath, GlobalFileNames.steering)
	const globalDir = path.join(homedir, GlobalFileNames.steering)

	const results: { name: string; content: string }[] = []

	for (const dir of [globalDir, wsDir]) {
		const exists = await fileExistsAtPath(dir)
		if (!exists) continue

		const files = await fs.readdir(dir, { withFileTypes: true })
		for (const file of files) {
			if (!file.isFile() || !allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))) {
				continue
			}
			const filePath = path.join(dir, file.name)
			const content = await fs.readFile(filePath, "utf8")

			// Check frontmatter for inclusion mode
			const inclusionMode = parseInclusionMode(content)
			if (inclusionMode === "manual") {
				continue // Skip manual-inclusion files
			}

			// Strip frontmatter from content before including
			const strippedContent = stripFrontmatter(content)
			if (strippedContent.trim()) {
				results.push({ name: file.name, content: strippedContent.trim() })
			}
		}
	}

	return results
}

function parseInclusionMode(content: string): "always" | "manual" | "auto" {
	const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---/)
	if (!fmMatch) return "always" // Default: always included
	const fm = fmMatch[1]
	const inclusionMatch = fm.match(/inclusion:\s*(\w+)/)
	if (!inclusionMatch) return "always"
	const mode = inclusionMatch[1].toLowerCase()
	if (mode === "manual") return "manual"
	if (mode === "auto") return "auto"
	return "always"
}

function stripFrontmatter(content: string): string {
	return content.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/, "")
}
