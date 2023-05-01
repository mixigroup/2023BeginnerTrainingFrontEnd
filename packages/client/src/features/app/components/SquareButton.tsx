import type { CSS } from "@stitches/core";
import type { ButtonHTMLAttributes, FC } from "react";
import { css, theme } from "../../../lib/style";

export type SquareButtonProps = {
  type: NonNullable<ButtonHTMLAttributes<HTMLButtonElement>["type"]>;
  disabled: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export const SquareButton: FC<SquareButtonProps> = ({
  children,
  ...buttonProps
}) => {
  return (
    <button {...buttonProps} className={buttonStyle()}>
      {children}
    </button>
  );
};

export const smallButtonStyle: CSS = {
  width: "56px",
  height: "56px",
};

const buttonStyle = css({
  margin: 0,
  padding: 0,
  border: "none",
  appearance: "none",
  cursor: "pointer",
  width: "70px",
  height: "70px",
  borderRadius: theme(({ radii }) => radii.radius1),
  boxShadow: theme(({ shadows }) => shadows.elevationMid),
  backgroundColor: theme(({ colors }) => colors.backgroundBase),
  transition: "filter 0.2s ease",
  "&:hover": {
    filter: "contrast(90%)",
  },
  "&:disabled": {
    cursor: "not-allowed",
    filter: "contrast(50%)",
  },
});
