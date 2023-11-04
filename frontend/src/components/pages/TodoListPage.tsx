import { Box } from "@mui/material";

import { HeaderView } from "@/components/views/HeaderView";
import { TodoListView } from "@/components/views/TodoListView";
import { ProjectListView } from "@/components/views/ProjectListView";

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
        <Box width="100%" height="50%">
          <Box
            display="flex"
            flexDirection="row"
            // alignItems="center"
            justifyContent="center"
            // gap="20px"
            width="100%"
          >
            <ProjectListView />
          </Box>
        </Box>
      </Box>
    </div>
  );
};
