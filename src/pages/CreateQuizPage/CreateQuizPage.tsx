import React, { useEffect, useRef, useState } from "react";
import { Grid } from "@mui/material";
import * as S from "../../components/QuizForm/QuizForm.styled";
import {
  Crop,
  ReactCrop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { canvasPreview } from "../../shared/utils/canvasPreview";
import { useDebounceEffect } from "../../shared/utils/useDebounceEffect";
import QuestionCardPreview from "../../components/QuextionCard/QuestionCardPreview";
import TimeSlider from "../../components/TimeSlider/TimeSlider";
import { TimeValues } from "../../shared/consts/enum";
import { useCreateQuestionMutation } from "../../store/api/questionApi";
import { useNavigate } from "react-router-dom";
import { AppPaths } from "../../shared/consts";

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

const CreateQuizPage = () => {
  // TODO: limit title and description, prevent text overflow
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [time, setTime] = React.useState<number>(TimeValues.DEFAULT);
  const [src, setSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    x: 25,
    y: 25,
    width: 512,
    height: 500,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspect, setAspect] = useState<number | undefined>(9 / 16);

  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const [createQuestion, result] = useCreateQuestionMutation();

  const navigate = useNavigate();

  const selectImage = (file: Blob | MediaSource) => {
    setSrc(URL.createObjectURL(file));
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(event.target.value);
  };

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  async function onDownloadCropClick() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
    );
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    );
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: "image/png",
    });

    createQuestion({
      title,
      description,
      time,
      file: blob,
    });
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      }
    },
    100,
    [completedCrop],
  );

  useEffect(() => {
    if (result.data) {
      navigate(`${AppPaths.EDIT_COORDINATES}/${result.data}`);
    }
  }, [result]);

  return (
    <S.PaperBackground>
      <S.ContentBox>
        <Grid container spacing={2}>
          <S.GridColumn item xl={8} md={6} xs={12} alignItems={"flex-start"}>
            <S.MainTitle>Новый квиз:</S.MainTitle>
            <S.Input
              label="Название"
              value={title}
              onChange={handleTitleChange}
              required
            />
            <S.Input
              label="Описание"
              value={description}
              onChange={handleDescriptionChange}
              multiline
              maxRows={5}
              required
            />
            <S.ImgInputButton variant="contained" component="label">
              Выбрать файл
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={e => {
                  if (e.target.files?.length) {
                    selectImage(e.target.files[0]);
                  }
                }}
              />
            </S.ImgInputButton>
            {src && (
              <div>
                <ReactCrop
                  aspect={aspect}
                  onComplete={c => setCompletedCrop(c)}
                  crop={crop}
                  onChange={setCrop}>
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={src}
                    onLoad={onImageLoad}
                  />
                </ReactCrop>
              </div>
            )}
            <TimeSlider time={time} setTime={setTime} />
          </S.GridColumn>
          <S.GridColumn
            item
            xl={4}
            sm={6}
            xs={12}
            sx={{ alignItems: { md: "flex-end", sm: "flex-start" } }}>
            <S.GridColumn alignItems="flex-start">
              <S.MainTitle>Предпросмотр:</S.MainTitle>
              {!!completedCrop && (
                <QuestionCardPreview
                  title={title}
                  description={description}
                  time={time}>
                  <canvas
                    ref={previewCanvasRef}
                    style={{
                      borderRadius: "10px",
                      objectFit: "contain",
                      width: "288px",
                      height: "512px",
                    }}
                  />
                </QuestionCardPreview>
              )}
            </S.GridColumn>
          </S.GridColumn>
          <S.SubmitButton onClick={onDownloadCropClick}>Создать</S.SubmitButton>
        </Grid>
      </S.ContentBox>
    </S.PaperBackground>
  );
};

export default CreateQuizPage;
