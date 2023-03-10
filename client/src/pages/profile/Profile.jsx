import { useEffect, useState } from 'react';
import './profile.scss'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';

import EmailIcon from '@mui/icons-material/Email';
import HouseIcon from '@mui/icons-material/House';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

import Upload from "../../components/upload/Upload"
import AddIcon from '@mui/icons-material/Add';

import Feed from '../../components/feed/Feed';



function Profile({openUpload,setOpenUpload, posts}) {
    const  {currentUser} = useSelector((state) => state.user)
    
    const paramId = useParams()
    console.log(paramId.userId)
    // console.log(currentUser)
    const noAvatar = process.env.REACT_APP_PUBLIC_FOLDER + "no_avatar1.jpg" 
    const noBg = process.env.REACT_APP_PUBLIC_FOLDER + "no_bg2.png" 

    const [openEditDesc,setOpenEditDesc] = useState(false)

    const [user, setUser] = useState([])
    console.log(user.email)
  
    useEffect(()=>{
        const fecthUser = async()=>{
            try{
                const res = await axios.get(`/user/find/${paramId.userId}`)
                setUser(res.data)
            }
            catch(err){
                console.log(err.message);
            }
        }
        fecthUser()

    },[paramId.userId])
    




    return ( 
        <>
            <div className="profile-container">
                <Upload openUpload={openUpload} setOpenUpload={setOpenUpload}/>
                <div className="profile-warpper">
                    <div className="profile-item">
                        <div className="profile-top">   
                            <div className="background">
                                <img className='background-img' src={user.userCoverImg || noBg} alt={user.userCoverImg} />
                                <button><AddIcon fontSize='large'  className='add-icon'/></button>
                            </div>
                            {/* <div className="btn-fl">
                                <button className='follow1'>Follow</button>
                                <button className='follow2'>Follow</button>  
                            </div> */}
                            <div className="avatar">
                                <img className='avatar-img' src={ user.userImg || noAvatar} alt={user.userImg} />
                                <button className='avatar-add-icon'>
                                    <AddIcon fontSize='large' className='add-icon'/>
                                </button>
                            
                            </div>
                            <h1 className="name-user">{user.username}</h1>
                            
                            <div className="profile-mid">
                                <p className='following-count'><span>{user.followUser}</span>following</p>
                                <p className='follower-count'><span>{user.follower?.length} </span>follower</p>
                                <p className='post-count'><span>{user.postCount} </span>post</p>

                            </div>
                        </div>
                        <div className="profile-bottom">
                            <div className="left">
                                <div className="introduce-item">
                                    <h1 className='introduce'>Introduce</h1>
                                    <div className="desc">
                                         <p className='desc-text' >{user?.decs || "Write something about you !!!"}</p>
                                        { openEditDesc ? 
                                        <div className="edit">
                                            <textarea name="" id="" cols="30" rows="4"></textarea>
                                            <div className="edit-desc">
                                                <button className='cancel-btn' onClick={()=>setOpenEditDesc(!openEditDesc)}> Cancel</button>
                                                <button className ='update-btn'> Update</button>
                                            </div>

                                        </div>
                                        :
                                        <>
                                           {currentUser._id === paramId.userId 
                                            ? <button className ='edit-btn' onClick={()=>setOpenEditDesc(!openEditDesc)}> Edit</button>
                                            : <></>
                                            }
                                        </>
                                        }                                   
                                    </div>              
                
                                </div>
                                <div className="info">
                                    <h1 className='detail'>Details</h1>

                                    <div className="info-item">
                                        <div className="info-icon">
                                            <span><EmailIcon/></span>
                                            <p>{user.email}</p>
                                        </div>
                                        <div className="info-icon">
                                            <span><HouseIcon/></span>
                                            <p>{user.region}</p>
                                        </div>
                                        <div className="info-icon">
                                            <span><AccessTimeFilledIcon/></span>
                                            <p>Join {user.createdAt}</p>
                                        </div>
                                        
                                        
                                        <button className="info-btn">
                                            Edit
                                        </button>
                                        
                                    </div>
                               
                                </div>
                                
                            </div>  
                            <div className="right">
                                <Feed paramId={paramId.userId} setOpenUpload={setOpenUpload}/>
                                

                            
                            </div>

                        
                        </div>

                    
                    
                    
                        
                    </div>
                </div>
            </div>
        </>
     );
}

export default Profile;