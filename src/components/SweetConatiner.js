import Sweet from "components/Sweet";
import React, { useState } from "react";
import SweetContainerStyle from "styles/SweetContainerStyle";

const SweetConatiner = ({ sweets, userObj }) => {
  const [onlyEditing, setOnlyEditing] = useState(false);

  const onOnlyEditing = () => {
    setOnlyEditing(true);
  };
  const offOnlyEditing = () => {
    setOnlyEditing(false);
  };

  return (
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
                onOnlyEditing={onOnlyEditing}
                offOnlyEditing={offOnlyEditing}
                onlyEditing={onlyEditing}
              />
            ))
        ) : (
          <div id="loadingBox">Loading...</div>
        )}
      </div>
    </SweetContainerStyle>
  );
};

export default React.memo(SweetConatiner);
