"use client"
import { useMutation } from "@blitzjs/rpc"
import { useRouter } from "next/navigation"
import logout from "../mutations/logout"

export function LogoutButton() {
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)
  return (
    <>
      <button
        // className="bg-gradient-to-r from-primary to-[#06b6d4] text-white font-bold py-2 px-4 rounded-lg hover:from-[#6d28d9] hover:to-[#0891b2] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#0a0a0f]"
        onClick={async () => {
          await logoutMutation()
          router.refresh()
        }}
      >
        Logout
      </button>
    </>
  )
}
