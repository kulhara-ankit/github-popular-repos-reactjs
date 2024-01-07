import './index.css'

const RepositoryItem = props => {
  const {repositoriesData} = props
  const {name, imageUrl, starsCount, forksCount, issuesCount} = repositoriesData

  return (
    <li className="repository-item">
      <img className="repository-image" src={imageUrl} alt={name} />
      <h1 className="repository-name" key="name">
        {name}
      </h1>
      <div className="stats-container">
        <img
          className="stats-icon"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="stats-text" key="stars_count">
          {starsCount} stars
        </p>
      </div>
      <div className="stats-container">
        <img
          className="stats-icon"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="stats-text" key="forks_count">
          {forksCount} forks
        </p>
      </div>
      <div className="stats-container">
        <img
          className="stats-icon"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="stats-text" key="issues_count">
          {issuesCount} open issues
        </p>
      </div>
    </li>
  )
}

export default RepositoryItem
