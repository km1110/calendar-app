import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";

import { tagState } from "@/atoms/tagState";
import { tagType } from "@/types/tag";
import { makeInstance } from "@/libs/api/axios";
import { Box } from "@mui/material";
import { TagList } from "../templates/TagList";

export const TagListView = () => {
  const [tags, setTags] = useRecoilState<tagType[]>(tagState);

  const [tag, setTag] = useState<tagType>({
    id: "",
    name: "",
  });

  const instance = makeInstance();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tags = await instance.get("/tags");
        setTags(tags.data);
      } catch (error) {
        console.error("An error occurred while fetching the todo:", error);
      }
    };
    fetchData();
  }, []);

  const handleCreate = async () => {
    const body = {
      name: tag.name,
    };
    await instance.post("/tags", body);
    instance.get("/tags").then(({ data }) => {
      setTags(data);
    });

    setTag({
      id: "",
      name: "",
    });
  };

  const handleUpdate = async () => {
    const body = {
      name: tag.name,
    };
    await instance.patch(`/tags/${tag.id}`, body);
    instance.get("/tags").then(({ data }) => {
      setTags(data);
    });

    setTag({
      id: "",
      name: "",
    });
  };

  const handleDelete = () => {};

  return (
    <Box width="100%">
      <TagList
        tags={tags}
        tag={tag}
        setTag={setTag}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </Box>
  );
};
