import { dummyCommunity } from "../../../../testdata/community";
import { CommunitySummary } from "./CommunitySummary";

export const Base = () => {
  return (
    <CommunitySummary
      community={dummyCommunity()}
      isJoined={false}
      onRequestJoin={() => console.log("joinRequest")}
    />
  );
};
