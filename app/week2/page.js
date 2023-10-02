import { StudentInfo } from "../StudentInfo";
import Link from "next/link";


export default function Home() {
    return (
  
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <h1 className="text-6xl font-bold">My Shopping List</h1>
        </div>
        <div className="container mx-auto p-4">
          <StudentInfo></StudentInfo>
            <Link href="/">Home</Link>
        </div>
      </main>
  
    );
  }