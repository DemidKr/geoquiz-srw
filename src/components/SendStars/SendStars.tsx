import React, { FC, useEffect } from "react";
import { Box, Rating } from "@mui/material";
import {
  useCreateStarsMutation,
  useFetchQuestionStarsQuery,
} from "../../store/api/starsApi";
import { CustomDialogContentText } from "../Dialogs/Dialog.styled";

interface ISendStarsProps {
  questionId: number;
}

const SendStars: FC<ISendStarsProps> = ({ questionId }) => {
  const [value, setValue] = React.useState<number | null>(null);

  const { data, error, isLoading, isFetching } =
    useFetchQuestionStarsQuery(questionId);
  const [createStars, result] = useCreateStarsMutation();

  const handleCreate = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number | null,
  ) => {
    setValue(newValue);

    if (newValue) {
      createStars({
        number: newValue,
        questionId,
      });
    }
  };

  const isRatingDisabled = isFetching || isLoading;

  useEffect(() => {
    if (data) {
      setValue(data.number);
    }
  }, [data]);

  return (
    <Box sx={{ display: "flex", gap: "10px" }}>
      <CustomDialogContentText>Оценить викторину</CustomDialogContentText>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={handleCreate}
        disabled={isRatingDisabled}
      />
    </Box>
  );
};

export default SendStars;
