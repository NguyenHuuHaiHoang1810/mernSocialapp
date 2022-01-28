import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import LoadIcon from "../../images/loading.gif";
import { useParams } from "react-router-dom";
import Info from "../../components/profile/Info";
import Posts from "../../components/profile/Posts";
import { getProfileUsers } from "../../redux/actions/profileAction";

const Profile = () => {
  const { profile, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
      dispatch(getProfileUsers({ id, auth }));
    }
  }, [id, auth, dispatch, profile.ids]);
  return (
    <div className="profile">
      <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />

      {profile.loading ? (
        <img className="d-block mx-auto" src={LoadIcon} alt="loading" />
      ) : (
        <>
          {<Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />}
        </>
      )}
    </div>
  );
};

export default Profile;
