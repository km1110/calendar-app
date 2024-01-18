import React, { useState } from "react";

import { Box, Button, Card, Grid, IconButton, Typography } from "@mui/material";
import Edit from "@mui/icons-material/Edit";

import { tagType } from "@/types/tag";
import { TagDialog } from "@/components/parts/TagDialog";

type Props = {
  tag: tagType;
  setTag: React.Dispatch<React.SetStateAction<tagType>>;
  tags: tagType[];
  handleCreate: () => void;
  handleUpdate: () => void;
  handleDelete: () => void;
};

export const TagList = ({
  tag,
  setTag,
  tags,
  handleCreate,
  handleUpdate,
  handleDelete,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [typeDialog, setTypeDialog] = useState<"add" | "change">("add");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleAddClick = () => {
    setTypeDialog("add");
    setIsOpen(true);
  };

  const handleChangeClick = (item: tagType) => {
    setTag((prevTag) => ({ ...prevTag, ...item }));
    setTypeDialog("change");
    setIsOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTag((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClosed = () => {
    setTag({
      id: "",
      name: "",
    });
    setIsOpen(false);
  };

  return (
    <Card variant="outlined" sx={{ width: "100%", border: "1px solid #ccc" }}>
      <Box
        display="flex"
        flexDirection="row"
        sx={{ borderBottom: "1px solid #ccc" }}
      >
        <Typography sx={{ flexGrow: 1, marginTop: "5px", marginLeft: "10px" }}>
          カテゴリー
        </Typography>
        <Button style={{ color: "#69BD83" }} onClick={() => handleAddClick()}>
          追加
        </Button>
      </Box>
      <Box
        sx={{
          overflowY: "auto",
          height: "120px",
        }}
      >
        {tags &&
          tags.map((item: tagType, index: number) => (
            <Grid
              container
              key={index}
              alignItems="center"
              style={{ minHeight: "40px" }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Grid item xs={11}>
                <Typography sx={{ marginLeft: "10px" }}>{item.name}</Typography>
              </Grid>
              <Grid item xs={1}>
                {hoveredIndex === index && (
                  <IconButton onClick={() => handleChangeClick(item)}>
                    <Edit />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}
        <TagDialog
          tag={tag}
          typeDialog={typeDialog}
          isOpen={isOpen}
          onClose={handleClosed}
          handleCreate={handleCreate}
          handleChange={handleChange}
          handleUpdate={handleUpdate}
        />
      </Box>
    </Card>
  );
};
