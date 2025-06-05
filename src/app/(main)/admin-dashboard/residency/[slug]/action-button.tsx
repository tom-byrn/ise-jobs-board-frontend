"use client"

import { Play, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ActionButtonsProps {
	onResidencyMatch: () => Promise<void>
	onInterviewMatch: () => Promise<void>
}

export function ActionButtons({
	onResidencyMatch,
	onInterviewMatch
}: ActionButtonsProps) {
	return (
		<div className="flex gap-3">
			<Button
				variant="default"
				onClick={() => onResidencyMatch()}
			>
				<Play className="mr-2 h-4 w-4" />
				Run Interview Assignment
			</Button>
			<Button
				variant="secondary"
				onClick={() => onInterviewMatch()}
			>
				<Zap className="mr-2 h-4 w-4" />
				Run Final Matching
			</Button>
		</div>
	)
}
