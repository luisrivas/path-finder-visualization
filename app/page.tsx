import type { NextPage } from 'next';
import Head from 'next/head';
import PathFinderVisualization from '@/components/PathFinderVisualization';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <Head>
        <title>Path Finder Visualization</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-4">
        <PathFinderVisualization />
      </main>
    </div>
  );
};

export default Home;
