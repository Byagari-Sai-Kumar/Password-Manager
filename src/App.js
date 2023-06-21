import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

class App extends Component {
  state = {
    passwordList: [],
    websiteName: '',
    userName: '',
    password: '',
    showPassword: false,
    searchInput: '',
    isTrue: false,
  }

  toggleCheckBox = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  addNewPassword = event => {
    event.preventDefault()

    const {websiteName, userName, password} = this.state

    const newPassword = {
      id: uuidv4(),
      website: websiteName,
      userName,
      password,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      websiteName: '',
      userName: '',
      password: '',
      isTrue: true,
    }))
  }

  updateSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  updateWebsite = event => {
    this.setState({websiteName: event.target.value})
  }

  updateUserName = event => {
    this.setState({userName: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickedDelete = id => {
    const {passwordList} = this.state

    const newList = passwordList.filter(eachPass => eachPass.id !== id)

    const caseOf = newList.length !== 0

    this.setState({passwordList: newList, isTrue: caseOf})
  }

  render() {
    const {
      passwordList,
      websiteName,
      userName,
      password,
      showPassword,
      searchInput,
    } = this.state

    let {isTrue} = this.state

    const filteredList = passwordList.filter(eachPass =>
      eachPass.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (filteredList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="bgContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="appLogo"
        />
        <div className="cardContainer1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="passwordManagerImage"
          />
          <div className="subCardContainer11">
            <h1 className="addNewPassword">Add New Password</h1>
            <form className="inputFormContainer" onSubmit={this.addNewPassword}>
              <div className="inputLogoAndInputContainer">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="inputLogo"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="inputArea"
                  onChange={this.updateWebsite}
                  value={websiteName}
                />
              </div>

              <div className="inputLogoAndInputContainer">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="inputLogo"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="inputArea"
                  onChange={this.updateUserName}
                  value={userName}
                />
              </div>

              <div className="inputLogoAndInputContainer">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="inputLogo"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="inputArea"
                  onChange={this.updatePassword}
                  value={password}
                />
              </div>

              <button type="submit" className="addButton">
                Add
              </button>
            </form>
          </div>
        </div>

        <div className="cardContainer2">
          <div className="topSection">
            <div className="yourPasswordContainer">
              <h1 className="yourPasswords">Your Passwords</h1>
              <p className="passwordsCount">{passwordList.length}</p>
            </div>
            <div className="passwordSearchContainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="searchLogo"
              />
              <input
                type="search"
                placeholder="Search"
                className="searchInput"
                onChange={this.updateSearchInput}
              />
            </div>
          </div>
          <hr className="hrLine" />
          <div className="checkBocContainer">
            <input
              id="checkB"
              type="checkbox"
              className="checkBox"
              onChange={this.toggleCheckBox}
            />
            <label htmlFor="checkB" className="showPasswords">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <>
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="noPasswordImage"
              />
              <p className="noPasswordText">No Passwords</p>
            </>
          )}
          {isTrue && (
            <>
              <ul className="passwordUnorderedListContainer">
                {filteredList.map(eachPass => (
                  <li className="passwordListContainer" key={eachPass.id}>
                    <div className="firstLetterContainer">
                      <h1 className="firstLetter">
                        {eachPass.userName[0].toUpperCase()}
                      </h1>
                    </div>
                    <div className="credentialContainer">
                      <p className="credentials">{eachPass.website}</p>
                      <p className="credentials">{eachPass.userName}</p>
                      {showPassword ? (
                        <p className="credentials">{eachPass.password}</p>
                      ) : (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                          className="starsImage"
                        />
                      )}
                    </div>
                    <button
                      type="button"
                      className="deleteButtonContainer"
                      onClick={() => this.onClickedDelete(eachPass.id)}
                      data-testid="delete"
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        alt="delete"
                        className="deleteButton"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default App
