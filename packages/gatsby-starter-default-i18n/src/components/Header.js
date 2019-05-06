import React from 'react'
import Link from 'gatsby-link'
import SelectLanguage from './SelectLanguage'
import WecareLogo from '../images/wecarewc-logo-white.png'

class Header extends React.Component {
  state = {
      //This sets the state of Bulma elements
      navbarIsActive: "navbar-item dropdown is-hidden-desktop"
  }

    //This opens the navbar dropdown
    navbarOpenDropdown = () => {
      this.setState({
        navbarIsActive: "navbar-item dropdown is-active is-hidden-desktop"
      })
    }

    //This closes the navbar dropdown
    navbarCloseDropdown = () => {
      this.setState({
        navbarIsActive: "navbar-item dropdown is-hidden-desktop"
      })
    }

    languageCheck = () => {
      if (this.props.langs[0].selected) {
        return(
          <React.Fragment>
            <a href="#">About Us</a>
            <a href="#">Locations</a>
            <a href="#">Partners</a>
            <a href="#">News</a>
            <a href="#">Impact</a>
            <button className="button"><a href="#">Get In Touch</a></button>
          </React.Fragment>
          )
      } else {
        return(
          <React.Fragment>
            <a href="#">关于我们</a>
            <a href="#">地址</a>
            <a href="#">合作公司</a>
            <a href="#">新闻</a>
            <a href="#">社会</a>
            <button className="button"><a href="#">联系我们</a></button>
          </React.Fragment>
          )
      }
    }

    languageCheckMobile = () => {
      if (this.props.langs[0].selected) {
        return(
          <React.Fragment>
            <a href="#" className="dropdown-item">About Us</a>
            <a href="#" className="dropdown-item">Locations</a>
            <a href="#" className="dropdown-item">Partners</a>
            <a href="#" className="dropdown-item">News</a>
            <a href="#" className="dropdown-item">Impact</a>
            <a href="#" className="dropdown-item">Get In Touch</a>
          </React.Fragment>
          )
      } else {
        return(
          <React.Fragment>
            <a href="#" className="dropdown-item">关于我们</a>
            <a href="#" className="dropdown-item">地址</a>
            <a href="#" className="dropdown-item">合作公司</a>
            <a href="#" className="dropdown-item">新闻</a>
            <a href="#" className="dropdown-item">社会</a>
            <a href="#" className="dropdown-item">联系我们</a>
          </React.Fragment>
          )
      }
    }

  render() {
    return(
      <div
        style={{
          background: 'gray',
          position: 'relative',
          height: '125px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div style={{flex: '500px'}}>
          <div className="header-logo">
            <img src={WecareLogo}/>
          </div>
        </div>
        <div className="nav-menu is-hidden-touch">{this.languageCheck()}</div>

        <div className={this.state.navbarIsActive}
                        onMouseEnter={this.navbarOpenDropdown}
                        onMouseLeave={this.navbarCloseDropdown}>
          <div className="dropdown-trigger">
            <span className="hamburger" aria-haspopup="true" aria-controls="dropdown-menu"></span>
          </div>
          <div className="dropdown-menu dropdown-right" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              {this.languageCheckMobile()}
            </div>
          </div>
        </div>
          <SelectLanguage langs={this.props.langs} />
      </div>
      )
    }
}

export default Header;
