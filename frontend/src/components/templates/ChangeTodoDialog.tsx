import { todoType } from "@/types/todo";
import { TodoDialog } from "../parts/TodoDialog";

type Props = {
  todo: todoType;
  isOpen: boolean;
  onClose: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSumbit: () => void;
};

export const ChangeTodoDialog = ({
  todo,
  isOpen,
  onClose,
  handleChange,
  handleSumbit,
}: Props) => {
  return (
    <TodoDialog
      todo={todo}
      isOpen={isOpen}
      onClose={onClose}
      handleChange={handleChange}
      handleSumbit={handleSumbit}
    />
  );
};
