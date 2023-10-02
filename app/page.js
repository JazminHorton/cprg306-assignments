import { StudentInfo } from "./StudentInfo";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
      <h1 className="text-5xl font-bold">CPRG 306: Web Development 2 - Assignments</h1>
      </div>
      <StudentInfo></StudentInfo>
      <div className ="flex items-center text-2xl font-bold">
      <p>
        <Link href="/week2">Week 2</Link>
        <br />
        <Link href="/Week3">Week 3</Link>
      </p>
      </div>
    </main>
  )
}
