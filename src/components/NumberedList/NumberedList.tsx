import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { SxProps } from "@mui/system";

interface ListItemProps {
  number: number;
  content: JSX.Element | string;
}
function ListItem({ number, content }: ListItemProps): JSX.Element {
  return (
    <Box display="flex">
      <Box
        sx={{
          minWidth: "22px",
          fontWeight: "400"
        }}
      >
        {number}.
      </Box>
      <Box>{content}</Box>
    </Box>
  );
}

interface NumberedListProps {
  color: string;
  component: React.ElementType;
  length: number;
  stepOffset: number;
  sx: SxProps;
  translationKey: string;
  translations: (string | JSX.Element)[];
  variant: TypographyProps["variant"];
}

export default function NumberedList({
  color,
  component,
  length,
  stepOffset = 0,
  sx,
  translationKey,
  translations,
  variant = "h6"
}: NumberedListProps): JSX.Element {
  const { t } = useTranslation();
  const list = [];

  if (length) {
    for (let i = 1 + stepOffset; i <= length; i += 1) {
      const translation = t(`${translationKey}${i}`);
      list.push(
        <ListItem key={i} content={translation} number={i - stepOffset} />
      );
    }
  } else if (translations) {
    translations.forEach((translation, index) =>
      list.push(
        <ListItem key={index} content={translation} number={index + 1} />
      )
    );
  }

  return (
    <Typography
      sx={{
        "@media (max-width: 410px)": {
          fontSize: "1rem"
        },
        ...sx
      }}
      color={color}
      variant={variant}
      component={component}
    >
      {list}
    </Typography>
  );
}
