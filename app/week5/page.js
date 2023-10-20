import Link from 'next/link';
import ItemsList from './item-list';

function Page() {
    // State for the shopping list items
  return (
    <main className="min-h-screen flex flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-white mb-4 group">
        Shopping List 
      </h1>
      <div className="bg-black p-6 rounded-md shadow-md w-full md:w-3/4 lg:w-1/2 border border-gray-400">
        <ItemsList />
      </div>
      <Link href="/" className="text-white hover:underline mt-5">
        Homepage
      </Link>
    </main>
  );
}

export default Page;