import { useEffect, useRef } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { dehydrate, QueryClient, useInfiniteQuery } from 'react-query';
import { useInView } from 'framer-motion';

// Componentns
import Divider from '../../components/Divider';
import PageItem from '../../components/PageItem';
import PageList from '../../components/PageList';
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

const fetchTags = async ({ pageParam = 1 }): Promise<DataType[]> => {
  const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;

  const { data } = await RAWG.get<DataProps>(
    `/tags?page_size=40&page=${pageParam}&key=${apiKey}`
  );

  return data?.results;
};
export default function Tags() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const {
    data: tags,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(['getTags'], fetchTags, {
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 40) return undefined;

      if (allPages.length) return allPages.length + 1;

      return undefined;
    },
    keepPreviousData: true,
  });

  useEffect(() => {
    fetchNextPage();
  }, [isInView]);

  if (isLoading) return <LoadingCard size={20} />;

  if (isError) return <ErrorCard />;

  return (
    <>
      <Head>
        <title>GE | Tags</title>
        <meta name="description" content="List of tags" />
      </Head>

      <PageHeading heading="Tags" />

      <Divider />

      <div className="flex flex-col items-center gap-4 pb-14">
        <PageList>
          {tags?.pages?.map((page) =>
            page.map((data) => (
              <PageItem key={data.slug} route="tag" data={data} />
            ))
          )}
        </PageList>

        <button
          ref={ref}
          type="button"
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => hasNextPage && fetchNextPage()}
          className="rounded-md bg-primary-light px-6 py-2 text-white"
        >
          {/* eslint-disable-next-line no-nested-ternary */}
          {isFetchingNextPage
            ? 'Loading...'
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
  await queryClient.prefetchQuery(['getTags'], fetchTags);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
