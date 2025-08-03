export default function BoardPage({ params }: { params: { boardId: string } }) {
  return (
    <div>
      <h1>Board ID: {params.boardId}</h1>
    </div>
  );
}
