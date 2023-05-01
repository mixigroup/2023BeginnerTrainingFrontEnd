import type { CSS } from "@stitches/core";
import type { FC, FormEvent } from "react";
import { useCallback, useState } from "react";
import { css, theme } from "../../../lib/style";
import { Icon } from "../../app/components/Icon";
import { SquareButton } from "../../app/components/SquareButton";
import { TextInput } from "../../app/components/TextInput";

type SearchCommunityFormProps = {
  onClickSearch: (keyword: string) => void;
};

export const SearchCommunityForm: FC<SearchCommunityFormProps> = ({
  onClickSearch,
}) => {
  const [keyword, setKeyword] = useState("");
  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onClickSearch(keyword);
    },
    [keyword, onClickSearch]
  );

  return (
    <form className={searchFormStyle()} onSubmit={onSubmit}>
      <TextInput
        placeholder="Search"
        onChange={(event) => setKeyword(event.target.value)}
      />
      <SquareButton type="submit" disabled={false}>
        <Icon icon="search" variant="light" size="sm" />
      </SquareButton>
    </form>
  );
};

export const smallSearchFormStyleCss: CSS = {
  columnGap: theme(({ space }) => space[2]),
};

export const searchFormStyle = css({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  columnGap: theme(({ space }) => space[4]),
});
