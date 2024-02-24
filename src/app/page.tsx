import HomeAuthLinks from '@/components/auth/links/authLinks';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-8xl">HOME PAGE</h1>
      <HomeAuthLinks />
    </main>
  );
}
