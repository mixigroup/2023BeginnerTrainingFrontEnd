import { Community } from "api-server";
import type { FC } from "react";
import { Suspense, useCallback, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { BaseLayout } from "../features/app/components/BaseLayout";
import {
  Button,
  smallSizeStyleCss as buttonSmallSizeCss,
  buttonStyle,
} from "../features/app/components/Button";
import { Heading, h1Style } from "../features/app/components/Heading";
import { Icon } from "../features/app/components/Icon";
import { SquareButton } from "../features/app/components/SquareButton";
import { replaceImageSize } from "../features/app/modules/imageUrlUtils";
import { useTheme } from "../features/app/modules/themeHooks";
import { CommunitySummary } from "../features/community/components/CommunitySummary";
import { CommunitySummarySkeleton } from "../features/community/components/CommunitySummarySkeleton";
import { CreateCommunityFormModal } from "../features/community/components/CreateCommunityFormModal";
import {
  SearchCommunityForm,
  searchFormStyle,
  smallSearchFormStyleCss,
} from "../features/community/components/SearchCommunityForm";
import { useCreateCommunity } from "../features/community/modules/createCommunityHooks";
import {
  useFetchListCommunity,
  useListCommunity,
} from "../features/community/modules/listCommunityHooks";
import { usePostJoinCommunity } from "../features/community/modules/postJoinCommunityHooks";
import { css, theme } from "../lib/style";

export const Home: FC = () => {
  return (
    <>
      <Helmet>
        <title>トップページ</title>
      </Helmet>
      <BaseLayout>
        <PageContent />
      </BaseLayout>
    </>
  );
};

const PageContent: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [theme] = useTheme();
  const { createCommunity } = useCreateCommunity();

  const [searchWord, setSearchword] = useState("");
  const fetchListCommunity = useFetchListCommunity({
    requestSize: 5,
    keyword: searchWord,
  });

  const requestCreateCommunity = useCallback(
    async ({
      name,
      details,
      category,
    }: {
      name: string;
      details: string;
      category: Community["category"];
    }) => {
      const res = await createCommunity({
        name,
        details,
        category,
      });

      if (res instanceof Error) {
        return;
      }

      await fetchListCommunity();

      setIsOpenModal(false);
    },
    [createCommunity, fetchListCommunity]
  );

  return (
    <>
      <div className={containerStyle()}>
        <div className={titleContainer()}>
          <Heading tag="h1" variant={theme}>
            コミュニティ
          </Heading>
          <Button
            type="button"
            onClick={() => setIsOpenModal(true)}
            variant="primary"
          >
            新しいコミュニティを作る
          </Button>
        </div>

        <div className={searchWrapper()}>
          {/* TODO: 検索キーワードを取得 */}
          <SearchCommunityForm
            onClickSearch={(keyword) => setSearchword(keyword)}
          />
        </div>
        <Suspense fallback={<CommunitiListSkeleton />}>
          <CommunityList keyword={searchWord} />
        </Suspense>
      </div>
      <CreateCommunityFormModal
        isOpen={isOpenModal}
        onRequestClose={() => setIsOpenModal(false)}
        onRequestCreateCommunity={requestCreateCommunity}
        theme={theme}
      />
    </>
  );
};

const containerStyle = css({
  width: "100%",
  maxWidth: "710px",
  display: "grid",
  rowGap: theme(({ space }) => space[4]),
  margin: "0 auto",
});

const titleContainer = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  containerType: "inline-size",
  "@container (max-width: 700px)": {
    [`.${h1Style}`]: {
      fontSize: theme(({ fontSizes }) => fontSizes[3]),
    },
    [`.${buttonStyle}`]: {
      ...buttonSmallSizeCss,
    },
  },
});

const searchWrapper = css({
  position: "sticky",
  top: theme(({ space }) => space[4]),
  zIndex: 2,
  containerType: "inline-size",
  "@container (max-width: 600px)": {
    [`.${searchFormStyle}`]: {
      ...smallSearchFormStyleCss,
    },
  },
});

const CommunityList: FC<{ keyword?: string }> = ({ keyword }) => {
  const { data, size, setSize, fetchListCommunity } = useListCommunity({
    requestSize: 5,
    keyword: keyword ? keyword : undefined,
  });
  const [appTheme] = useTheme();
  const { joinCommunity } = usePostJoinCommunity();

  const communities = useMemo(() => {
    if (!data || !data[size - 1]) {
      return [];
    }

    return data[size - 1].communities.map((communityInfo) => ({
      ...communityInfo,
      community: {
        ...communityInfo.community,
        imageUrl: replaceImageSize({
          imageUrl: communityInfo.community.imageUrl,
          width: 130,
          height: 240,
        }),
      },
    }));
  }, [data, size]);

  const disabledPageFunc = useMemo(() => {
    if (!data || !data[size - 1]) {
      return {
        prev: true,
        next: true,
      };
    }

    return {
      prev: size < 2,
      next: size * 5 >= data[data.length - 1].totalSize,
    };
  }, [data, size]);

  const showPageFunc = useMemo(() => {
    if (!data) {
      return false;
    }

    return data[data.length - 1].totalSize > 5;
  }, [data]);

  const requestJoinCommunity = useCallback(
    async (communityId: string) => {
      const res = await joinCommunity({ communityId });

      if (res instanceof Error) {
        return;
      }

      await fetchListCommunity();
    },
    [fetchListCommunity, joinCommunity]
  );

  if (!data) {
    return null;
  }

  if (communities.length < 1) {
    return (
      <p className={noDataStyle()} data-theme={appTheme}>
        コミュニティが見つかりませんでした
      </p>
    );
  }

  return (
    <>
      {communities.map(({ community, isJoined }) => (
        <CommunitySummary
          key={community.id}
          community={community}
          isJoined={!!isJoined}
          onRequestJoin={() => requestJoinCommunity(community.id)}
        />
      ))}
      {showPageFunc && (
        <div className={funcWrapperStyle()}>
          <SquareButton
            type="button"
            onClick={() => setSize((prev) => prev - 1)}
            disabled={disabledPageFunc.prev}
          >
            <Icon icon="arrowLeft" variant="light" size="lg" />
          </SquareButton>
          <SquareButton
            type="button"
            onClick={() => setSize((prev) => prev + 1)}
            disabled={disabledPageFunc.next}
          >
            <Icon icon="arrowRight" variant="light" size="lg" />
          </SquareButton>
        </div>
      )}
    </>
  );
};

const funcWrapperStyle = css({
  maxWidth: "300px",
  width: "100%",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
});

const noDataStyle = css({
  color: theme(({ colors }) => colors.text),
  fontFamily: theme(({ fonts }) => fonts.base),
  fontSize: theme(({ fontSizes }) => fontSizes[2]),
  margin: "0 auto",
  padding: 0,
  '&[data-theme="dark"]': {
    color: theme(({ colors }) => colors.textDark),
  },
});

const CommunitiListSkeleton: FC = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, idx) => (
        <CommunitySummarySkeleton key={idx} />
      ))}
    </>
  );
};
