import Sweet from "components/sweet/Sweet";
import React, { useState } from "react";
import SweetContainerStyle from "styles/sweet/SweetContainerStyle";

const SweetConatiner = ({ sweets, userObj, getId }) => {
  const [onlyEditing, setOnlyEditing] = useState("");

  const onOnlyEditing = (sweetId) => {
    setOnlyEditing(sweetId);
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
                onlyEditing={onlyEditing}
                getId={getId}
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
