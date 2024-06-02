import { IconButton } from "@mui/material";
import React, { FC, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useAction } from "../../shared/hooks/useAction";
import { AppPaths } from "../../shared/consts";
import { useDeleteQuestionMutation } from "../../store/api/questionApi";

interface IQuestionCardMenuProps {
  id: number;
  isUserOptionAvailable: boolean;
}

const QuestionCardMenu: FC<IQuestionCardMenuProps> = ({
  id,
  isUserOptionAvailable,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const addSnack = useAction();
  const [deleteQuestion, result] = useDeleteQuestionMutation();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    deleteQuestion(id);
  };

  const handleNavigateToEdit = () => {
    navigate(`${AppPaths.EDIT_QUIZ}/${id}`);
  };

  const handleNavigateToLeaderboard = () => {
    navigate(`${AppPaths.LEADERBOARD}/${id}`);
  };

  useEffect(() => {
    if (result.isSuccess) {
      addSnack("Викторина удалена", "success");
    }
  }, [result]);

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        sx={{ p: 0 }}
        onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}>
        {isUserOptionAvailable && (
          <>
            <MenuItem onClick={handleNavigateToEdit}>Редактировать</MenuItem>
            <MenuItem onClick={handleDelete} disabled={result.isLoading}>
              Удалить
            </MenuItem>
          </>
        )}
        <MenuItem onClick={handleNavigateToLeaderboard}>
          Таблица лидеров
        </MenuItem>
      </Menu>
    </div>
  );
};

export default QuestionCardMenu;
