"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon } from "@hugeicons/core-free-icons"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookmarkCard, type Bookmark } from "@/components/bookmark-card"
import { cn } from "@/lib/utils"

interface BookmarkManagerProps {
  userId: string
  className?: string
}

function BookmarkManager({ userId, className }: BookmarkManagerProps) {
  const [bookmarks, setBookmarks] = React.useState<Bookmark[]>([])
  const [title, setTitle] = React.useState("")
  const [url, setUrl] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const supabase = React.useMemo(() => createClient(), [])

  React.useEffect(() => {
    fetchBookmarks()

    const subscription = supabase
      .channel("bookmarks")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setBookmarks((prev) => [payload.new as Bookmark, ...prev])
          } else if (payload.eventType === "DELETE") {
            setBookmarks((prev) =>
              prev.filter((b) => b.id !== payload.old.id)
            )
          } else if (payload.eventType === "UPDATE") {
            setBookmarks((prev) =>
              prev.map((b) =>
                b.id === payload.new.id ? (payload.new as Bookmark) : b
              )
            )
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [userId, supabase])

  async function fetchBookmarks() {
    const response = await fetch("/api/bookmarks")
    if (response.ok) {
      const data = await response.json()
      setBookmarks(data)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !url.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), url: url.trim() }),
      })

      if (response.ok) {
        setTitle("")
        setUrl("")
      }
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete(id: string) {
    const response = await fetch(`/api/bookmarks/${id}`, {
      method: "DELETE",
    })

    if (response.ok) {
      setBookmarks((prev) => prev.filter((b) => b.id !== id))
    }
  }

  return (
    <div className={cn("space-y-6", className)}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter bookmark title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
            />
          </div>
        </div>
        <Button type="submit" disabled={isLoading} className="gap-1.5">
          <HugeiconsIcon icon={Add01Icon} />
          Add Bookmark
        </Button>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {bookmarks.map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            bookmark={bookmark}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {bookmarks.length === 0 && (
        <div className="text-muted-foreground py-12 text-center text-sm">
          No bookmarks yet. Add your first bookmark above!
        </div>
      )}
    </div>
  )
}

export { BookmarkManager }
