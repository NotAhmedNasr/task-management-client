import BoardsList from './components/boardsList';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-10 items-center sm:p-10 md:p-16 lg:p-28">
      <h1 className="text-4xl sm:text-6xl xl:text-8xl">TASK MANAGEMENT</h1>
      <BoardsList />
    </main>
  );
}
