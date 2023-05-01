import { CSS } from "@stitches/core";
import type { FC, ReactNode } from "react";
import { BREAK_POINTS, css, theme } from "../../../lib/style";
import { useTheme } from "../modules/themeHooks";
import { Navigation } from "./Navigation";

export type BaseLayoutProps = {
  children?: ReactNode;
};

export const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  const [theme] = useTheme();

  return (
    <div className={containerStyle()}>
      <header className={headerStyle()}>
        <Navigation variant={theme} />
      </header>
      <main className={mainStyle()}>{children}</main>
    </div>
  );
};

const containerStyle = css({
  height: "100%",
});

const verticalHeaderStyleCss: CSS = {
  position: "initial",
  height: "auto",
};

const headerStyle = css({
  position: "fixed",
  top: 0,
  height: "100%",
  [`@media screen and (max-width: ${BREAK_POINTS.lg - 1}px)`]: {
    ...verticalHeaderStyleCss,
  },
});

const verticalMainStyleCss: CSS = {
  marginLeft: 0,
  padding: theme(({ space }) => space[1]),
};

const mainStyle = css({
  padding: `${theme(({ space }) => space[4])} ${theme(
    ({ space }) => space[6]
  )}`,
  boxSizing: "border-box",
  marginLeft: "290px",
  [`@media screen and (max-width: ${BREAK_POINTS.lg - 1}px)`]: {
    ...verticalMainStyleCss,
  },
});
