import { Mail } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonWithIcon({text}) {
  return (
    <Button>
      <Mail className="mr-2 h-4 w-4" /> {text}
    </Button>
  )
}
