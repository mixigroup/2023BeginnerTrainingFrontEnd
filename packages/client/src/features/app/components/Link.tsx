import type { CSSProperties, FC, PropsWithChildren } from "react";
import type { LinkProps as RouterLinkProps } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { css, theme } from "../../../lib/style";

export type LinkProps = PropsWithChildren<RouterLinkProps>;

export const Link: FC<LinkProps> = ({ children, ...linkProps }) => {
  return (
    <RouterLink {...linkProps} className={linkStyle()}>
      {children}
    </RouterLink>
  );
};

export const linkStyle = css({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
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
  background: theme(({ colors }) => colors.link),
  "&:hover": {
    filter: "contrast(130%)",
  },
});

export const smallSizeStyle: CSSProperties = {
  width: "176px",
  height: "40px",
  fontSize: theme(({ fontSizes }) => fontSizes[0]),
};
