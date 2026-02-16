"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Delete01Icon, Link01Icon } from "@hugeicons/core-free-icons"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Bookmark {
  id: string
  title: string
  url: string
  created_at: string
}

interface BookmarkCardProps {
  bookmark: Bookmark
  onDelete: (id: string) => void
  className?: string
}

function BookmarkCard({ bookmark, onDelete, className }: BookmarkCardProps) {
  return (
    <Card className={cn("group", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-1 text-sm font-medium">
            {bookmark.title}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => onDelete(bookmark.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Delete bookmark"
          >
            <HugeiconsIcon icon={Delete01Icon} className="text-destructive" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary flex items-center gap-1.5 text-xs transition-colors"
        >
          <HugeiconsIcon icon={Link01Icon} className="size-3.5 shrink-0" />
          <span className="truncate">{bookmark.url}</span>
        </a>
      </CardContent>
    </Card>
  )
}

export { BookmarkCard }
export type { Bookmark }
