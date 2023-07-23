import { canSSRAuth } from "../../utils/canSSrAuth"

export default function Dashboard() {
  return (
    <h1>Dashboard</h1>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  return {
    props: {}
  }
})