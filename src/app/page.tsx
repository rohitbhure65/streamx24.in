import { invoke, useAuthenticatedBlitzContext } from "./blitz-server"
import { HomeClient } from "./components/Home/Home"
import getCurrentUser from "./users/queries/getCurrentUser"

export default async function Home() {
  await useAuthenticatedBlitzContext({
    redirectTo: "/login",
  })
  const currentUser = await invoke(getCurrentUser, null)
  return <HomeClient currentUser={currentUser} />
}
