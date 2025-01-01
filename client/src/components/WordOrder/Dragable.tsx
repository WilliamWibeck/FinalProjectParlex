import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface DragableProps {
  id: string;
  word: string;
  correctFlash: boolean;
  incorrectFlash: boolean;
}

const Dragable = ({
  id,
  word,
  correctFlash,
  incorrectFlash,
}: DragableProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={`inline-flex items-center justify-center bg-inherit rounded text-center text-white text-2xl 
        border-2 cursor-grab px-4 py-2 
        min-w-[50px] max-w-full 
        ${
          correctFlash
            ? "border-green-500"
            : incorrectFlash
            ? "border-red-500"
            : "border-zinc-400"
        } 
        overflow-hidden break-words transition-colors duration-500`}
      {...attributes}
      {...listeners}
    >
      {word}
    </div>
  );
};

export default Dragable;
