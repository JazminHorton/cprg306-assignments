import Link from "next/link";

export function StudentInfo() {
    return (
        <div className = "text-2xl items-center font-sans">
        <p>Jazmin Horton</p>
        <p>CPRG306-C</p>
        <Link href="https://github.com/JazminHorton/cprg306-assignments">Github
        </Link>
        </div>
    )
}