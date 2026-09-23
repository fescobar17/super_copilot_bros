import Title from '@/components/Title';
import { UI } from '@/content/ui';
import Board from './Board';

export const dynamic = 'force-dynamic';

export default function TableroPage({ searchParams }: { searchParams: { key?: string } }) {
  const key = searchParams.key ?? '';
  if (!process.env.BOARD_KEY || key !== process.env.BOARD_KEY) {
    return (
      <main className="grid min-h-dvh place-items-center bg-sky p-6">
        <Title text={UI.tablero.locked} size="text-4xl" />
      </main>
    );
  }
  return <Board boardKey={key} />;
}
