import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { BookmarkManager } from "@/components/bookmark-manager";

export default async function DashboardPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-6">My Bookmarks</h1>
            <BookmarkManager userId={user.id} />
        </div>
    );
}
