import { useEffect, useRef } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { dehydrate, QueryClient, useInfiniteQuery } from 'react-query';
import { nanoid } from 'nanoid';
import { useInView } from 'framer-motion';

// Componentns
import Divider from '../../components/Divider';
import PageList from '../../components/PageList';
import PageItem from '../../components/PageItem';
import ErrorCard from '../../components/ErrorCard';
import LoadingCard from '../../components/LoadingCard';
import PageHeading from '../../components/PageHeading';

// Helpers
import RAWG from '../../lib/rawg';

// Types
import { DataType } from '../../lib/types/index';

interface DataProps {
  results: DataType[];
}

const fetchDevelopers = async ({ pageParam = 1 }): Promise<DataType[]> => {
  const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;

  const { data } = await RAWG.get<DataProps>(
    `/developers?page_size=40&page=${pageParam}&key=${apiKey}`
  );

  return data?.results;
};
export default function Developers() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const {
    data: developers,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(['getDevelopers'], fetchDevelopers, {
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 40) return undefined;

      if (allPages.length < 10) return allPages.length + 1;

      return undefined;
    },
  });

  useEffect(() => {
    fetchNextPage();
  }, [isInView]);

  if (isLoading) return <LoadingCard size={20} />;

  if (isError) return <ErrorCard />;

  return (
    <>
      <Head>
        <title>GE | Developers</title>
        <meta name="description" content="List of developers" />
      </Head>

      <PageHeading heading="Developers" />

      <Divider />

      <div className="flex flex-col items-center gap-4 pb-14">
        <PageList key={nanoid()}>
          {developers?.pages?.map((page) =>
            page.map((data) => (
              <PageItem key={data.name} route="developer" data={data} />
            ))
          )}
        </PageList>

        <button
          type="button"
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => hasNextPage && fetchNextPage()}
          className="rounded-md bg-primary-light px-6 py-2 text-white"
        >
          {/* eslint-disable-next-line no-nested-ternary */}
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </button>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['getDevelopers'], fetchDevelopers);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
