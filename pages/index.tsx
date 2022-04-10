import type { GetServerSideProps, NextPage } from 'next'
import styles from '../styles/Home.module.css'
import {
  gql
} from "@apollo/client";
import Link from 'next/link';
import { doAccess } from '../cache';

export const getServerSideProps: GetServerSideProps = async () => {
  const query = gql`
  query Home {
    common {
      number
    }
    authors {
      name
    }
  }
`

  const res = await doAccess(async client => {
    return await client
      .query({
        query
      })
  })
  return {
    props: {
      data: res?.data
    }
  }
}

const Home: NextPage<{ data: any }> = ({ data }) => {
  return (
    <div className={styles.container}>
      <code>{JSON.stringify(data)}</code>
      <Link href="/books">
        books
      </Link>
    </div>
  )
}

export default Home
