import type { GetServerSideProps, NextPage } from 'next'
import {
    gql,
} from "@apollo/client";
import { doAccess } from '../cache';

export const getServerSideProps: GetServerSideProps = async () => {
    const res = await doAccess(async client => {
        return await client
            .query({
                query: gql`
          query Book {
            common {
                number
            }
            books {
                title
                author
            }
          }
        `
            })
    })
    return {
        props: {
            data: res?.data
        }
    }
}

const BookView: NextPage<{ data: any }> = ({ data }) => {
    return <code>{JSON.stringify(data)}</code>
}

export default BookView;