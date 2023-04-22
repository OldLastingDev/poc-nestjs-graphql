import Link from 'next/link'
import { gql, useQuery } from '@apollo/client'
import Layout from '../components/Layout'

const QUERY = gql`
query FindAllUsersQuery {
  users {
    id
    name
  }
}
`;

const GraphQLPage = () => {
  const { data, loading } = useQuery(QUERY);

  return loading === true ? (
  <Layout title="GraphQL API | Next.js + TypeScript Example">
    <h1>GraphQL API</h1>
    <p>Now loading...</p>
    <p>
      <Link href="/">Go home</Link>
    </p>
  </Layout>) : (
  <Layout title="GraphQL API | Next.js + TypeScript Example">
    <h1>GraphQL API</h1>
    <ol>
      {data.users.map((user) => {
        return (
          <li key={user.id}>
            <ul>
              <li>ID: {user.id}</li>
              <li>Name: {user.name}</li>
            </ul>
          </li>
        )
      })}
    </ol>
    <p>
      <Link href="/">Go home</Link>
    </p>
  </Layout>
)}

export default GraphQLPage
