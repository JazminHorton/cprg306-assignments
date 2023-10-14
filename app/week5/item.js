export default function Item({ item, quantity, category }) {
    return (
        <ul className="border-4 rounded-lg border-slate-500 bg-slate-800 w-full max-w-xs m-1 p-2">
            <li className='text-white'>{item}</li>
            <li className='text-white'>Buy {quantity} in {category}</li>
        </ul>
    );
}
  