"use client"

import { useEffect, useRef, forwardRef } from "react"
import { useRouter } from "next/navigation"
import { useHover } from "react-use"
import Image from "next/image"

import { cn } from "@/lib/utils"

interface LogoProps {
	width?: number
	height?: number
	className?: string
}

export const Logo = forwardRef<HTMLImageElement, LogoProps>(({ width = 50, height = 32, className }, ref) => {
	const router = useRouter()

	return (
		<Image
			ref={ref}
			src="/ordinant-logo.png"
			width={width}
			height={height}
			onClick={() => router.push("/")}
			className={cn("logo cursor-pointer", className)}
			alt="Ordinant Logo"
		/>
	)
})
Logo.displayName = "Logo"

export const HoppingLogo = (props: LogoProps) => {
	const ref = useRef<HTMLImageElement>(null)
	const logo = <Logo ref={ref} {...props} />
	const [hoverable, hovered] = useHover(logo)

	useEffect(() => {
		const element = ref.current
		const isHopping = element !== null && element.classList.contains("animate-hop")

		if (hovered && element && !isHopping) {
			element.classList.add("animate-hop")
		} else if (element && isHopping) {
			const onAnimationEnd = () => {
				element.classList.remove("animate-hop")
				element.removeEventListener("animationiteration", onAnimationEnd)
			}

			element.addEventListener("animationiteration", onAnimationEnd)
		}
	}, [hovered])

	return hoverable
}
