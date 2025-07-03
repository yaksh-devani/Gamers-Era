import Head from 'next/head';

// Componentns
import Divider from '../components/Divider';
import GamesList from '../components/GamesList';
import TrendingGamesList from '../components/TrendingGamesList';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Gamers Era</title>
        <meta name="description" content="Main page of Gamers Era" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full overflow-hidden">
        <TrendingGamesList />

        <Divider />

        <GamesList />
      </div>
    </div>
  );
}
