import { Box } from "@mui/material";

import { HeaderView } from "@/components/views/HeaderView";
import { TodoListView } from "@/components/views/TodoListView";
import { ProjectListView } from "@/components/views/ProjectListView";
import { TagListView } from "../views/TagListView";

export const TodoListPage = () => {
  return (
    <div>
      <HeaderView />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
      >
        <Box width="100%" height="50%">
          <TodoListView />
        </Box>
        <Box width="100%" height="50%" display="flex" justifyContent="center">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            gap="20px"
            width="60%"
            marginTop="20px"
          >
            <ProjectListView />
            <TagListView />
          </Box>
        </Box>
      </Box>
    </div>
  );
};
