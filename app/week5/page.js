import ItemList from "./item-list";
import Link from 'next/link';


export default function Page() {
    return (
        <main className='bg-slate-300'>
            <h1 className='text-2xl ml-4'>Shopping List</h1>
            <Link href="/" className='text-xs m-2 text-black'>Home</Link>
            <ItemList/>
        </main>
    );
}