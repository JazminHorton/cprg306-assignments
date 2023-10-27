import NewItem from "./new-item";
import Link from 'next/link';

export default function Page() {
    return (
        <main className="flex items-center flex-col">
            <h1 className="text-2xl">Week 4</h1>
            <NewItem/>
            <Link href="/" className="text-white hover:underline mt-5">
            Homepage
            </Link>
        </main>
    )
}