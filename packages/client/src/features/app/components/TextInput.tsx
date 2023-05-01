import { CSS } from "@stitches/core";
import type { FC, InputHTMLAttributes } from "react";
import { css, theme } from "../../../lib/style";

type TextInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "type" | "children"
>;

export const TextInput: FC<TextInputProps> = ({ ...inputProps }) => {
  return <input {...inputProps} type="text" className={inputStyle()} />;
};

export const smallInputStyleCss: CSS = {
  height: "56px",
};

export const inputStyle = css({
  width: "100%",
  height: "70px",
  padding: theme(({ space }) => space[1]),
  borderRadius: theme(({ radii }) => radii.radius1),
  backgroundColor: theme(({ colors }) => colors.backgroundBase),
  border: "none",
  boxSizing: "border-box",
  fontFamily: theme(({ fonts }) => fonts.base),
  color: theme(({ colors }) => colors.text),
  fontSize: theme(({ fontSizes }) => fontSizes[2]),
  boxShadow: theme(({ shadows }) => shadows.elevationMid),
});
