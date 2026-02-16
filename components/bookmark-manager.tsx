"use client"

import * as React from "react"

import { createClient } from "@/lib/supabase/client"
import { BookmarkCard, type Bookmark } from "@/components/bookmark-card"
import { cn } from "@/lib/utils"

interface BookmarkManagerProps {
  userId: string
  className?: string
}

interface RealtimePayload {
  eventType: "INSERT" | "DELETE" | "UPDATE"
  new: Bookmark
  old: { id: string }
}

function BookmarkManager({ userId, className }: BookmarkManagerProps) {
  const [bookmarks, setBookmarks] = React.useState<Bookmark[]>([])
  const supabase = React.useMemo(() => createClient(), [])

  const fetchBookmarks = React.useCallback(async () => {
    try {
      const response = await fetch("/api/bookmarks")
      if (response.ok) {
        const data = await response.json()
        setBookmarks(data)
      } else {
        console.error("Failed to fetch bookmarks:", await response.text())
      }
    } catch (error) {
      console.error("Error fetching bookmarks:", error)
    }
  }, [])

  React.useEffect(() => {
    fetchBookmarks()
  }, [fetchBookmarks])

  React.useEffect(() => {
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
        (payload: RealtimePayload) => {
          if (payload.eventType === "INSERT") {
            setBookmarks((prev) => {
              const exists = prev.find((b) => b.id === payload.new.id)
              if (exists) return prev
              return [payload.new, ...prev]
            })
          } else if (payload.eventType === "DELETE") {
            setBookmarks((prev) =>
              prev.filter((b) => b.id !== payload.old.id)
            )
          } else if (payload.eventType === "UPDATE") {
            setBookmarks((prev) =>
              prev.map((b) =>
                b.id === payload.new.id ? payload.new : b
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
