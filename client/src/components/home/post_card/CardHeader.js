import React from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import { useNavigate, Link } from "react-router-dom";
import { deletePost } from "../../../redux/actions/postAction";
import Avatar from "../../Avatar";
const CardHeader = ({ post, socket }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEditPost = () => {
    dispatch({
      type: GLOBALTYPES.STATUS,
      payload: { ...post, onEdit: true },
    });
  };

  const handleDeletePost = () => {
    if (window.confirm("Are you sure want to delete this post?")) {
      dispatch(deletePost({ post, auth, socket }));
      return navigate("/");
    }
  };
  return (
    <div className="card_header">
      <div className="d-flex">
        <Avatar src={post.user.avatar} size="big-avatar" />

        <div className="card_name ml-2">
          <h6 className="m-0">
            <Link to={`/profile/${post.user._id}`} className="text-dark">
              {post.user.username}
            </Link>
          </h6>
          <small className="text-muted">
            {moment(post.createdAt).fromNow()}
          </small>
        </div>
      </div>

      {auth.user._id === post.user._id ? (
        <div className="nav-item dropdown">
          <span className="material-icons" id="moreLink" data-toggle="dropdown">
            more_horiz
          </span>

          <div className="dropdown-menu">
            {auth.user._id === post.user._id && (
              <>
                <div className="dropdown-item" onClick={handleEditPost}>
                  <span className="material-icons">create</span> Edit Post
                </div>
                <div className="dropdown-item" onClick={handleDeletePost}>
                  <span className="material-icons">delete_outline</span> Remove
                  Post
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CardHeader;
