import Image from 'next/image';
import Link from 'next/link';
import firstPost from './posts/firstPost';
import Head from 'next/head';
import Layout, { siteTitle } from '@/components/Layout';
import utilStyles from '../styles/utils.module.css';
import styles from "../styles/Home.module.css";
import { getPostsData } from "../lib/post";

//SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData();
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}



export default function Home({ allPostsData }: any) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p className={utilStyles.headingMd}>私はエンジニア志望です</p>
      </section>

      <section>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({id, title, date, thumbnail}: any) => (
            <article key={id}>
            <Link href={`/posts/${id}`}>
              <img src={`${thumbnail}`}
                className={styles.thumbnailImage}
              />
            </Link>
            <Link href={`/posts/${id}`}>
              <p className={utilStyles.boldText}>{title}</p>
            </Link>
            <br />
            <small className={utilStyles.lightText}>{date}</small>
          </article>

          ))}
        </div>
      </section>

    </Layout>
  );
}
