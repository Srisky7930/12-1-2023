import {BsHeart} from 'react-icons/bs'
import './index.css'

const Feeds = props => {
  const {eachFeed} = props
  const {
    profilePic,
    userName,
    userId,
    postId,
    likesCount,
    createdAt,
    comments,
    postDetails,
  } = eachFeed
  const imageUrl = postDetails.image_url
  const captions = postDetails.caption

  return (
    <li className="feeds-list">
      <div className="profile-pic-container">
        <img
          src={profilePic}
          alt="post author profile"
          className="profile-pic"
        />
        <h1 className="profile-pic-username"> {userName} </h1>
      </div>
      <div>
        <img src={imageUrl} alt="post" className="feeds-post-image" />
      </div>
      <div>
        <button type="button">
          <BsHeart />
        </button>
      </div>
      <div>
        <p className="likes-count"> {likesCount} likes </p>
        <p className="captions"> {captions} </p>
        <ul className="comments-list">
          {comments.map(each => (
            <div className="comments">
              <li className="comment-name"> {each.userName} </li>
              <li className="comment"> {each.comment} </li>
            </div>
          ))}
        </ul>
        <p className="created"> {createdAt} </p>
      </div>
    </li>
  )
}

export default Feeds
