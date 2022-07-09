import React, { useState } from 'react'
import { Grid, Menu ,Segment} from 'semantic-ui-react'
import {Link} from 'wouter'

function Sidebar (){
 const [activeItem,setActiveItem] = useState('home');

  const handleItemClick = (e, { name }) => setActiveItem(name);

    return (
        <Menu pointing secondary vertical>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name='register'
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu>
    )
}
export default Sidebar;