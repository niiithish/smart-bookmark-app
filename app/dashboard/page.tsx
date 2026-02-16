import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { BookmarkManager } from "@/components/bookmark-manager";
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
                    <h1 className="text-xl font-semibold">Smart Bookmarks</h1>
                    <UserNav user={user} />
                </div>
            </header>
            <main className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-semibold mb-6">My Bookmarks</h2>
                <BookmarkManager userId={user.id} />
            </main>
        </div>
    );
}
