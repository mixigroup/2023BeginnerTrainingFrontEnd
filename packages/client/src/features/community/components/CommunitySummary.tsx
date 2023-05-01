import type { Community } from "api-server";
import type { CSSProperties, FC } from "react";
import { css, theme } from "../../../lib/style";
import {
  Button,
  smallSizeStyleCss as buttonSmallSizeStyleCss,
  buttonStyle,
} from "../../app/components/Button";
import { Heading } from "../../app/components/Heading";
import { Image } from "../../app/components/Image";
import { Link } from "../../app/components/Link";
import { categoryNames } from "../modules/communityUtils";

type CommunitySummaryProps = {
  community: Community;
  isJoined: boolean;
  onRequestJoin: () => void | Promise<void>;
};

export const CommunitySummary: FC<CommunitySummaryProps> = ({
  community,
  isJoined,
  onRequestJoin,
}) => {
  return (
    <article className={containerStyle()}>
      <figure className={sumbnailWrapperStyle()}>
        <Image
          src={community.imageUrl}
          alt={community.name}
          width={130}
          height={240}
          scale="cover"
          loading="lazy"
        />
      </figure>
      <div className={detailsStyle()}>
        <div className={summaryInfoStyle()}>
          <Heading tag="h2" variant="light">
            {community.name}
          </Heading>
          <span className={categoryStyle()}>
            {categoryNames[community.category]}
          </span>
          <p className={paragraphStyle()}>{community.details}</p>
        </div>
        <div className={funcStyle()}>
          {isJoined ? (
            <Link to={`/communities/${community.id}`}>詳細を見る</Link>
          ) : (
            <Button type="button" onClick={onRequestJoin} variant="primary">
              参加する
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};

const sumbnailWrapperStyle = css({
  margin: 0,
  overflow: "hidden",
});

export const verticalContainerStyle: CSSProperties = {
  gridTemplateRows: "60px 1fr",
  gridTemplateColumns: "initial",
};

const containerStyle = css({
  width: "100%",
  height: "240px",
  backgroundColor: theme(({ colors }) => colors.backgroundBase),
  borderRadius: theme(({ radii }) => radii.radius1),
  boxShadow: theme(({ shadows }) => shadows.elevationLow),
  boxSizing: "border-box",
  display: "grid",
  gridTemplateColumns: "130px 1fr",
  overflow: "hidden",
  containerType: "inline-size",
  "@container (max-width: 700px)": {
    [`.${buttonStyle}`]: {
      ...buttonSmallSizeStyleCss,
    },
  },
});

export const verticalDetailsStyle: CSSProperties = {
  padding: `${theme(({ space }) => space[2])} ${theme(
    ({ space }) => space[1]
  )} ${theme(({ space }) => space[1])} ${theme(({ space }) => space[1])}`,
};

const detailsStyle = css({
  width: "100%",
  padding: `${theme(({ space }) => space[3])} ${theme(
    ({ space }) => space[3]
  )} ${theme(({ space }) => space[3])} ${theme(({ space }) => space[4])}`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxSizing: "border-box",
});

const summaryInfoStyle = css({
  display: "grid",
  rowGap: theme(({ space }) => space[1]),
});

const categoryStyle = css({
  color: theme(({ colors }) => colors.accent),
  fontSize: theme(({ fontSizes }) => fontSizes[1]),
  fontFamily: theme(({ fonts }) => fonts.base),
});

const paragraphStyle = css({
  margin: 0,
  color: theme(({ colors }) => colors.text),
  fontSize: theme(({ fontSizes }) => fontSizes[1]),
  fontFamily: theme(({ fonts }) => fonts.base),
});

const funcStyle = css({
  display: "flex",
  justifyContent: "flex-end",
});
