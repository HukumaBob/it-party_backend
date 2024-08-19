import {NavLink, Route, Routes, Outlet} from "react-router-dom";
import {AvatarBlock} from "../../features/AvatarBlock";
import {FormDataPersonal} from "../../widgets/FormDataPersonal";
import {FormCareerAndEducation} from "../../widgets/FormCareerAndEducation"
import {FormAboutMe} from "../../widgets/FormAboutMe"
import {FormConfidentiality} from "../../widgets/FormConfidentiality";
import {FormNotifications} from "../../widgets/FormNotifications";
import {ModalLogout} from "../../widgets/ModalLogout";
import cn from "classnames";
import style from "./index.module.scss";

const ProfileLayout = () => (
  <div className={style.formsContainer}>
    <AvatarBlock/>
    <Outlet/>
  </div>
)

export const ProfilePage = () => {
  const activeClassName = ({isActive}: { isActive: boolean }) => (isActive ? style.active : '')

  return (
    <div className={cn(style.container, 'container')}>
      <nav className={style.linksContainer}>
        <NavLink className={activeClassName} to='' end={true}>Персональные данные</NavLink>
        <NavLink className={activeClassName} to='career'>Карьера и образование</NavLink>
        <NavLink className={activeClassName} to='about'>О себе</NavLink>
        <NavLink className={activeClassName} to='confidentiality'>Конфиденциальность</NavLink>
        <NavLink className={activeClassName} to='notice'>Уведомления</NavLink>
        <ModalLogout/>
      </nav>

      <Routes>
        <Route element={<ProfileLayout/>}>
          <Route index path='' element={<FormDataPersonal/>}/>
          <Route path='career' element={<FormCareerAndEducation/>}/>
          <Route path='about' element={<FormAboutMe/>}/>
          <Route path='confidentiality' element={<FormConfidentiality/>}/>
          <Route path='notice' element={<FormNotifications/>}/>
        </Route>
      </Routes>
    </div>
  );
};
