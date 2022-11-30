import { useEffect, useState } from "react";
import {
  dbService,
  doc,
  setDoc,
  arrayUnion,
  arrayRemove,
  deleteField,
} from "fbase";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserMinus,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faUser as refUser } from "@fortawesome/free-regular-svg-icons";

const FollowToggleBtnStyle = styled.button`
  outline: none;
  border: none;
  background: none;
  padding: 0;

  display: flex;
  align-items: center;

  width: 32px;
  height: 32px;

  color: var(--sub-color);

  cursor: pointer;

  svg {
    font-size: 22px;

    margin-left: 5px;

    &.followIcon {
      display: block;
      color: var(--icon-color);
    }
    &.unFollowIconHover {
      display: none;
      color: #ff6633;
    }
    &.unFollowIcon {
      display: block;
      color: var(--sub-color);
    }
    &.followIconHover {
      display: none;
      color: var(--icon-color);
    }
  }

  &:hover {
    svg {
      &.followIcon {
        display: none;
      }
      &.unFollowIconHover {
        display: block;
      }
      &.unFollowIcon {
        display: none;
      }
      &.followIconHover {
        display: block;
      }
    }
  }
`;

const FollowToggleBtn = ({ userObj, profileObj }) => {
  const [currentUserFollow, setCurrentUserFollow] = useState(false);

  useEffect(() => {
    setCurrentUserFollow(profileObj.follower?.includes(userObj.uid) ? true : false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userObj, profileObj]);

  const onFollowToggle = async () => {
    const userDoc = doc(dbService(), "users", userObj.uid);
    const profileDoc = doc(dbService(), "users", profileObj.uid);
    const noticeDoc = doc(dbService(), "notifications", profileObj.uid);

    await setDoc(
      userDoc,
      {
        follow: currentUserFollow
          ? arrayRemove(profileObj.uid)
          : arrayUnion(profileObj.uid),
      },
      { merge: true },
    );
    await setDoc(
      profileDoc,
      {
        follower: currentUserFollow ? arrayRemove(userObj.uid) : arrayUnion(userObj.uid),
      },
      { merge: true },
    );
    await setDoc(
      noticeDoc,
      {
        follower: {
          [userObj.uid]: currentUserFollow
            ? deleteField()
            : {
                confirmed: false,
                lastUpdate: Date.now(),
                category: "follower",
              },
        },
      },
      { merge: true },
    );
  };

  return (
    <FollowToggleBtnStyle id="followToggle" onClick={onFollowToggle}>
      {currentUserFollow ? (
        <>
          <FontAwesomeIcon className="followIcon" icon={faUser} />
          <FontAwesomeIcon className="unFollowIconHover" icon={faUserMinus} />
        </>
      ) : (
        <>
          <FontAwesomeIcon className="unFollowIcon" icon={refUser} />
          <FontAwesomeIcon className="followIconHover" icon={faUserPlus} />
        </>
      )}
    </FollowToggleBtnStyle>
  );
};

export default FollowToggleBtn;
