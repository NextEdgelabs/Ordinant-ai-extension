import React from "react"
import "./Logo.css"

export default function Logo({ width = 100, height = 100 }: { width?: number; height?: number }) {
	return (
		<div
			className="ordinant-logo mb-4 mt-4"
			style={{
				width: width,
				height: height,
				backgroundSize: "contain",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
			}}
		/>
	)
}
