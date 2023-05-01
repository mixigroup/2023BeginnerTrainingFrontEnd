import type { CSS } from "@stitches/core";
import type { ButtonHTMLAttributes, FC } from "react";
import { css, theme } from "../../../lib/style";

export type ButtonProps = {
  variant: "primary" | "secondary";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({
  variant,
  children,
  ...buttonProps
}) => {
  return (
    <button {...buttonProps} data-variant={variant} className={buttonStyle()}>
      {children}
    </button>
  );
};

export const buttonStyle = css({
  width: "290px",
  height: "60px",
  margin: 0,
  padding: 0,
  border: "none",
  appearance: "none",
  cursor: "pointer",
  transition: "filter 0.2s ease",
  fontSize: theme(({ fontSizes }) => fontSizes[1]),
  boxShadow: theme(({ shadows }) => shadows.elevationLow),
  color: theme(({ colors }) => colors.button),
  fontFamily: theme(({ fonts }) => fonts.base),
  borderRadius: theme(({ radii }) => radii.radius1),
  background: theme(({ colors }) => colors.action),
  "&:hover": {
    filter: "contrast(130%)",
  },
  "&:disabled": {
    cursor: "not-allowed",
    filter: "contrast(50%)",
  },
});

export const smallSizeStyleCss: CSS = {
  width: "176px",
  height: "40px",
  fontSize: theme(({ fontSizes }) => fontSizes[0]),
};
