import React from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'

const Card = ({ link, icon, name }) => {

  const { settings } = useSelector(state => state)

  return (
    <li className={settings.sidebar ? "icon_add marge_0" : "icon_add"}>
        <Link href={link} className={settings.sidebar ? "icon_add1 marge_1" : "icon_add1"}>
          <a>
            <i className={icon}></i>
            <span className={settings.sidebar ? "text_hide_p remove_p" : "text_hide_p"}>
                &nbsp;{name}
            </span>
          </a>
        </Link>
    </li>
  );
};

export default Card