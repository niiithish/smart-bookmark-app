import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { BookmarkManager } from "@/components/bookmark-manager";
import { AddBookmarkDialog } from "@/components/add-bookmark-dialog";
import { UserNav } from "@/components/user-nav";

export default async function DashboardPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen">
            <header className="border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Image src="/logo.svg" alt="Logo" width={32} height={32} className="size-8" />
                        <h1 className="text-xl font-semibold">Smart Bookmarks</h1>
                    </div>
                    <UserNav user={user} />
                </div>
            </header>
            <main className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold">My Bookmarks</h2>
                    <AddBookmarkDialog />
                </div>
                <BookmarkManager userId={user.id} />
            </main>
        </div>
    );
}
