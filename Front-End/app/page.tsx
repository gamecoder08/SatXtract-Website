import ThemeButton from "./components/ThemeButton";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen p-4">
      <div>
        <a className="text-4xl pl-5 font-extrabold">SatXtract</a>
      </div>
      <div className="absolute top-4 right-4">
        <ThemeButton />
      </div>
      <div className="mt-50">
<<<<<<< HEAD
<<<<<<< HEAD
        <Link href="/mainPage"><button className='btn p-4 px-10 ml-10 border-2 border-gray-200 shadow-md'>Main Page</button></Link>
=======
        <Link href="/mainPage">Main Page</Link>
>>>>>>> 24f670abfae010228c974a26388ef3823617a0a5
=======
        <Link href="/mainPage">Main Page</Link>
>>>>>>> 24f670abfae010228c974a26388ef3823617a0a5
      </div>
    </main>
  );
}
