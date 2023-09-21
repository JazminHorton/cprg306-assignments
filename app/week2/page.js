import { StudentInfo } from "../StudentInfo";

export default function Home() {
    return (
  
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <h1 className="text-6xl font-bold">My Shopping List</h1>
        </div>
        <div className="flex flex-col text-left">
          <StudentInfo></StudentInfo>
        </div>
      </main>
  
    );
  }