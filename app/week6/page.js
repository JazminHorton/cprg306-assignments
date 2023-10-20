import ItemList from "./item-list";
import Link from 'next/link';


export default function Page() {
    return (
        <main>
            <h1 className='text-2xl ml-4 text-white'>Shopping List</h1>
            <Link href="/" className='text-2xl ml-4 text-white'>Home</Link>
            <ItemList/>
        </main>
    );
}