import { createClient } from "@/lib/server"
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient"
import { redirect } from "next/navigation"

export default async function MyProfile() {

    const supabase = await createClient()
    const {
        data: { user }
    } = await supabase.auth.getUser()

    if(!user) {
        redirect(`/auth/login`)
    }

    // Fetch the account info for this user
    const { data: account, error } = await supabase
        .from('account')
        .select('student_id')
        .eq('user_id', user.id)
        .single()

    if (error || !account) {
        return redirect('/auth/login')
    }

    if (!account.student_id) {
        return redirect('/') //The user is not a student, this redirect could go to another page
    }

    //The user is confirmed to be a student
    redirect(`/student/${user.id}`)

    return (
        <h1>Loading...</h1>
    )

}