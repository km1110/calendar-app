import { todoType } from "@/types/todo";
import { TodoDialog } from "../parts/TodoDialog";

type Props = {
  todo: todoType;
  isOpen: boolean;
  onClose: () => void;
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTagChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleProjectChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSumbit: () => void;
};

export const AddTodoDialog = ({
  todo,
  isOpen,
  onClose,
  handleTextChange,
  handleTagChange,
  handleProjectChange,
  handleSumbit,
}: Props) => {
  return (
    <TodoDialog
      todo={todo}
      isOpen={isOpen}
      onClose={onClose}
      handleChange={handleTextChange}
      handleTagChange={handleTagChange}
      handleProjectChange={handleProjectChange}
      handleSumbit={handleSumbit}
    />
  );
};
