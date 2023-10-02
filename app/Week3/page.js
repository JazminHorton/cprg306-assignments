import Link from 'next/link';
import ItemList from './item-list';

export default function Page() {
  return (
    <main className="container mx-auto p-4">
        <p><Link href="/">Home</Link></p>
      <h1 className="text-2xl font-bold mb-4">Shopping List</h1>
      <ItemList />
    </main>
  );
}

