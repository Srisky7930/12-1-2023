import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import Feeds from '../Feeds'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    homePage: [],
    usersStories: [],
  }

  componentDidMount() {
    this.getStoriesData()
    this.getHomePageData()
  }

  getStories = data => ({
    storyUrl: data.story_url,
    userId: data.user_id,
    userName: data.user_name,
  })

  getStoriesData = async () => {
    const userStoriesApi = 'https://apis.ccbp.in/insta-share/stories'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(userStoriesApi, options)
    const data = await response.json()
    const storiesData = data.users_stories
    const usersStory = storiesData.map(each => this.getStories(each))
    console.log(usersStory)
    this.setState({
      usersStories: usersStory,
    })
  }

  getProfilePosts = data => ({
    profilePic: data.profile_pic,
    userName: data.user_name,
    userId: data.user_id,
    postId: data.post_id,
    likesCount: data.likes_count,
    comments: data.comments.map(each => ({
      comment: each.comment,
      userId: each.user_id,
      userName: each.user_name,
    })),
    createdAt: data.created_at,
    postDetails: data.post_details,
  })

  getHomePageData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const homeData = data.posts
      const homePage = homeData.map(each => this.getProfilePosts(each))
      this.setState({
        homePage,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderHomePage = () => {
    const {homePage} = this.state
    return (
      <div className="home-container">
        <ul className="home-feeds-list">
          {homePage.map(each => (
            <Feeds eachFeed={each} key={each.user_id} />
          ))}
        </ul>
      </div>
    )
  }

  getLoaderView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderHomeDataPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderHomePage()
      case apiStatusConstants.inProgress:
        return this.getLoaderView()
      case apiStatusConstants.failure:
        return this.getFailureview()
      default:
        return null
    }
  }

  render() {
    const {usersStories} = this.state
    return (
      <>
        <Header />
        <div className="home-main-container">{this.renderHomeDataPage()}</div>
      </>
    )
  }
}

export default Home
