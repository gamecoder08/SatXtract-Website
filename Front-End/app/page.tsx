import ThemeButton from "./components/ThemeButton";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen p-4">
      <h1>Home Page</h1>
      <div className="absolute top-4 right-4">
        <ThemeButton />
      </div>
      <Link href="/mainPage">Main Page</Link>
    </main>
  );
}
