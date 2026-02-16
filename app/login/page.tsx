"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { HugeiconsIcon } from "@hugeicons/react"
import { GoogleIcon } from "@hugeicons/core-free-icons"
import Image from "next/image"

export default function LoginPage() {
    const [isLoading, setIsLoading] = React.useState(false)

    const handleGoogleLogin = async () => {
        setIsLoading(true)
        const supabase = createClient()
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/api/auth/callback`,
                },
            })
            if (error) {
                console.error("Login failed:", error)
            }
        } catch (error) {
            console.error("Login failed:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 p-4">
            {/* Subtle background decoration */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-primary/5 via-secondary/5 to-accent/5 blur-3xl" />
            </div>

            <Card className="relative w-full max-w-sm border-border/50 bg-card/80 shadow-lg backdrop-blur-sm">
                <CardHeader className="text-center space-y-4">
                    <div className="flex justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                            <Image
                                src="/logo.svg"
                                alt="Smart Bookmarks"
                                width={32}
                                height={32}
                                className="h-8 w-8"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <CardTitle className="text-xl font-bold tracking-tight">
                            Welcome back
                        </CardTitle>
                        <CardDescription>
                            Sign in with your Google account to access your bookmarks
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <Button
                        variant="outline"
                        className="w-full transition-all hover:border-primary/30 hover:bg-muted/50"
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Connecting...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <HugeiconsIcon icon={GoogleIcon} className="h-4 w-4" />
                                Continue with Google
                            </span>
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
