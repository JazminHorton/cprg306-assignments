import { StudentInfo } from "./StudentInfo";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
      <h1 className="text-5xl font-bold">CPRG 306: Web Development 2 - Assignments</h1>
      </div>
      <div>
      <StudentInfo></StudentInfo>
      </div>
      <div className ="flex items-center text-2xl font-bold">
      <Link href="./week2">week2</Link>
      </div>
    </main>
  )
}
