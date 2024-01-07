import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusData = {
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
  failure: 'FAILURE',
}

export default class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusData.initial,
    repositoriesData: [],
    activeLanguageTabId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeLanguageTabId} = this.state

    this.setState({apiStatus: apiStatusData.inProgress})

    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeLanguageTabId}`,
    )
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(eachRepository => ({
        id: eachRepository.id,
        imageUrl: eachRepository.avatar_url,
        name: eachRepository.name,
        starsCount: eachRepository.stars_count,
        forksCount: eachRepository.forks_count,
        issuesCount: eachRepository.issues_count,
      }))
      this.setState({
        repositoriesData: updatedData,
        apiStatus: apiStatusData.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusData.failure,
      })
    }
  }

  setActiveLanguageFilterId = id => {
    this.setState({activeLanguageTabId: id}, this.getRepositories)
  }

  renderLanguageFilterItem = () => {
    const {activeLanguageTabId} = this.state
    return (
      <ul className="language-filter">
        {languageFiltersData.map(eachData => (
          <LanguageFilterItem
            languageFilterListDetails={eachData}
            key={eachData.id}
            isActiveTab={eachData.id === activeLanguageTabId}
            setActiveLanguageFilterId={this.setActiveLanguageFilterId}
          />
        ))}
      </ul>
    )
  }

  renderGetSuccessiveView = () => {
    const {repositoriesData} = this.state

    return (
      <ul className="repository-list-container">
        {repositoriesData.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repositoriesData={eachRepo} />
        ))}
      </ul>
    )
  }

  renderGetProgressView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderGetFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderRepositoryItem = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusData.success:
        return this.renderGetSuccessiveView()
      case apiStatusData.failure:
        return this.renderGetFailureView()
      case apiStatusData.inProgress:
        return this.renderGetProgressView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="github-popular-repo-container">
        <h1 className="popular-heading">Popular</h1>
        {this.renderLanguageFilterItem()}
        {this.renderRepositoryItem()}
      </div>
    )
  }
}
