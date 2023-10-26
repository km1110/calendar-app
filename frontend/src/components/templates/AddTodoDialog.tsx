import { todoType } from "@/types/todo";
import { TodoDialog } from "../parts/TodoDialog";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  todo: todoType;
};

export const AddTodoDialog = ({
  isOpen,
  onClose,
  handleChange,
  todo,
}: Props) => {
  return (
    <TodoDialog
      isOpen={isOpen}
      onClose={onClose}
      handleChange={handleChange}
      todo={todo}
    />
  );
};
