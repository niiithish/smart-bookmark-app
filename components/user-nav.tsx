"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Logout01Icon } from "@hugeicons/core-free-icons"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface UserNavProps {
  user: {
    id: string
    email?: string | null
    user_metadata?: {
      name?: string | null
    }
  }
  className?: string
}

function UserNav({ user, className }: UserNavProps) {
  const supabase = React.useMemo(() => createClient(), [])
  const displayName = user.user_metadata?.name || user.email?.split("@")[0] || "User"

  async function handleSignOut() {
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="text-sm">
        Hey, <span className="font-medium">{displayName}</span>
      </span>
      <Button variant="outline" size="sm" onClick={handleSignOut} className="gap-1.5">
        Sign out
        <HugeiconsIcon icon={Logout01Icon} className="size-3" />
      </Button>
    </div>
  )
}

export { UserNav }
