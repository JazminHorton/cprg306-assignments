import Link from 'next/link';
import ItemList from './item-list';

export default function Page() {
  return (
    <main className="container mx-auto p-4">
        
      <h1 className="text-2xl font-bold mb-4">Shopping List</h1>
      <ItemList />
      <Link href="/" className="text-white hover:underline mt-5">
        Homepage
        </Link>
    </main>
  );
}

