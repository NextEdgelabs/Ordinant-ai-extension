import { useState } from "react"

const RooHero = () => {
	const [imagesBaseUri] = useState(() => {
		const w = window as any
		return w.IMAGES_BASE_URI || ""
	})
	const [isHovered, setIsHovered] = useState(false)

	return (
		<div
			className="mb-2 relative forced-color-adjust-none group flex flex-col items-center pt-4"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<div
				style={{
					animation: isHovered ? "smooth-bounce 1s ease-in-out infinite" : "none",
				}}
				className="z-5 translate-y-0 transition-transform duration-500">
				<img src={imagesBaseUri + "/ordinant-logo.png"} alt="Ordinant.ai logo" className="h-12" />
			</div>
			<span className="mt-2 text-sm font-semibold text-vscode-foreground/70 tracking-wide">Ordinant.ai</span>
		</div>
	)
}

export default RooHero
