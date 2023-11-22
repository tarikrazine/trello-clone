import { createBoard } from "@/actions/createBoard";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

export default async function OrganizationId({
  params,
}: {
  params: { organizationId: string };
}) {
  const boards = await db.board.findMany();

  return (
    <div className="flex flex-col space-y-4">
      <form action={createBoard}>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="Enter a board title"
          className="border border-black p-1"
          required
        />
        <Button type="submit">Create</Button>
      </form>
      <div className="space-y-2">
        {boards.map((board) => (
          <div key={board.id}>Board name: {board.title}</div>
        ))}
      </div>
    </div>
  );
}
