import React from "react"
import { Icon } from "./Icon"

interface KiloCodeIconProps {
	size?: string
}

export function KiloCodeIcon({ size = "1.2em" }: KiloCodeIconProps) {
	return (
		<Icon
			src="/docs/img/ordinant-dark.png"
			srcDark="/docs/img/ordinant-light.png"
			alt="Ordinant Icon"
			size={size}
		/>
	)
}
