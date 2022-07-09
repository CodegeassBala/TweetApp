import React, { useState,useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { useLocation,Link } from 'react-router-dom';
import {AuthContext} from '../context/auth'

function Menubar(){

  const context =  useContext(AuthContext); //which consists of all the global variables/functions for the web-app
    const location = useLocation();
    const path = location.pathname === '/' ? 'home' : location.pathname.substring(1);
  const [activeItem,setActiveItem] = useState(path);


  const handleItemClick = (event, { name }) => setActiveItem(name );
//check if the user is already loggedIn and render the menuBar accordingly
  const menuBar = context.user ? (
    <Menu pointing secondary size='massive' color='teal'> 
    <Menu.Item
      name={context.user.username}
      as={Link}
      to='/'
    />
    <Menu.Menu position='right'>
    <Menu.Item
      name='logout'
      onClick={context.logout}
    />
    </Menu.Menu>
  </Menu>
          
  ):(
 <Menu pointing secondary size='massive' color='teal'> 
<Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to='/'
          />
          <Menu.Menu position='right'>
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to='/login'
          />
          <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to='/register'
          />
          </Menu.Menu>
        </Menu>
);

    return menuBar;
}
export default Menubar;