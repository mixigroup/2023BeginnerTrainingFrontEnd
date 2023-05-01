import { SearchCommunityForm } from "./SearchCommunityForm";

export const Base = () => {
  return (
    <SearchCommunityForm onClickSearch={(keyword) => console.log(keyword)} />
  );
};
