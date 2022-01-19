import React from "react"
import Card from "./sidebar/Card"
import { userLogout } from '../../../redux/users/actions'
import { useSelector, useDispatch } from 'react-redux'
import { sidebarToggle } from '../../../redux/settings/actions'
import { userSidebar } from "../../../config"
import { useRouter } from "next/dist/client/router"
import Cookies from 'universal-cookie'

const Sidebar = props =>{
    const { settings } = useSelector(state=>state)
    const cookies = new Cookies()
    const dispatch = useDispatch()
    const router = useRouter()

    const handleLogout = async ()=>{
        await cookies.remove("user_token", { path: '/' })
            dispatch(userLogout())
            router.push('/')
    }

    return(
        <>
            <div className={settings.sidebar ? "sidebar sidebar_active" : "sidebar"}>
                <button 
                    onClick={()=>dispatch(
                        sidebarToggle(settings.sidebar)
                    )} 
                    className={settings.sidebar ? "arrow arrow_active" : "arrow"}
                >
                    <i className={settings.sidebar ? "fas fa-chevron-right" : "fas fa-chevron-left"}/>
                </button>
                <h6>
                    <span>OB</span>
                    <span className={settings.sidebar ? "text_hide_p text_hide_p_1 remove_p" : "text_hide_p text_hide_p_1"}>Onboarding</span>
                </h6>
                <ul>   
                    {userSidebar?.map((item, index)=><Card 
                        key={index}
                        link={item.link}
                        icon={item.icon}
                        name={item.name}
                    />)} 
                    <li className={settings.sidebar ? "icon_add marge_0" : "icon_add"}>
                        <a onClick={ handleLogout } className={settings.sidebar ? "icon_add1 marge_1" : "icon_add1"}>
                            <i className="fas fa-sign-out-alt"></i>
                            <span className={settings.sidebar ? "text_hide_p remove_p" : "text_hide_p"}> Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar