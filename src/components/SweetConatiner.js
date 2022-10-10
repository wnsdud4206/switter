import Sweet from "components/Sweet";
import React from "react";
import SweetContainerStyle from "styles/SweetContainerStyle";

const SweetConatiner = ({ sweets, userObj }) => (
  <SweetContainerStyle>
    <div id="sweetList">
      {sweets.length ? (
        sweets
          .sort((a, b) => {
            if (a.createdAt < b.createdAt) return 1;
            if (a.createdAt > b.createdAt) return -1;
            return 0;
          })
          .map((sweet) => (
            <Sweet
              key={sweet.id}
              sweetObj={sweet}
              isOwner={sweet.creatorId === userObj.uid}
              userObj={userObj}
            />
          ))
      ) : (
        <div id="loadingBox">Loading...</div>
      )}
    </div>
  </SweetContainerStyle>
);

export default React.memo(SweetConatiner);
