import React from 'react'
import Link from 'gatsby-link'
import SelectLanguage from './SelectLanguage';
import WecareLogo from '../images/wecarewc-logo-white.png'

const Header = (props) => {
  const languageCheck = () => {
  if (props.langs[0].selected) {
    return(
    <div className="nav-menu">
      <a href="#">About Us</a>
      <a href="#">Locations</a>
      <a href="#">Partners</a>
      <a href="#">News</a>
      <a href="#">Impact</a>
      <a href="#">Shop</a>
    </div>)
  } else {
    return(<div className="nav-menu">
      <a href="#">关于我们</a>
      <a href="#">地址</a>
      <a href="#">合作公司</a>
      <a href="#">新闻</a>
      <a href="#">社会</a>
      <a href="#">广场</a>
    </div>)
  }
}
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
      {languageCheck()}
      <SelectLanguage langs={props.langs} />
  </div>
  )
}

export default Header;
