import "./sidebar.scss"
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';

import Contents from "../../pages/home/Home";
import { useEffect, useState } from "react";
import { fontSize } from "@mui/system";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout } from "../../redux/userSlice";

function Sidebar({setlectItem,setSetlectItem}) {
    const  {currentUser} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const noAvatar = process.env.REACT_APP_PUBLIC_FOLDER + "no_avatar1.jpg" 
    const [active, setActive] = useState()


    const handleLogout = async () => {
        const res = await axios.get('/auth/signout')
        dispatch(logout("Logged out successfully"))
    }

    const listTop = [{icon :<HomeIcon/>, span : <span>HOME</span>, link: "/" },
                    { icon :<AccountCircleIcon />, span : <span>PROFILE</span>, link: `/profile/${currentUser._id}` },
            
                    { icon :<GroupIcon/>, span :<span>FRIEND</span>,link: "/" },
                    { icon :<ChatIcon/>, span : <span>MESSAGE</span>,link: "/"  },
                    { icon : <SettingsIcon/>, span :<span>SETTING</span>,link: "/setting"  },
                    { icon :<HelpIcon/> , span : <span>HELP</span>,link: "/"  },
                    { icon : <LogoutIcon onClick={handleLogout}/> , span :<span onClick={handleLogout}>LOGOUT</span>},
                    ]
                    
    return ( 
        <div className="sidebar-container">
            <div className="sidebar">
                <div className="sidebar-item">
                    <div className="avatar">
                        <div className="img">
                            <img src={currentUser.userImg || noAvatar} alt="avatar"/>
                        </div>
                        <div className="name">
                            <h3 className="name-items">{'@'+currentUser.username}</h3>
                            <h4 className="name-status">
                            Online</h4>
                            
                            
                        </div>
                        <span className="status"></span>
                    </div>
                    <div className="line"></div>
                    <div className="top-side" > 
                        {listTop.map((item,index)=>
                          <Link  key={index} style={{textDecoration:"none"}} to={item.link}>
                            <div className={"top " + (active === index ? "active" : "none" )} onClick={()=> setActive(index)} >
                          
                                <div className="top-icon "  >
                                        {item.icon }
                                </div>
                                {item.span}
                    
                            </div>
                            </Link>                                                                 
                        )}
                      
                    
                    </div>
                   
              
                </div>
                <div className="touch">  
                </div>
                


            </div>
          
           
        </div>
     );
}

export default Sidebar;