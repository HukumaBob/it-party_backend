import {NavLink, Route, Routes, useNavigate, Outlet} from "react-router-dom";
import {useDispatch} from "../../app/types/hooks";
import {resetProfile} from "../../app/services/slices/profileSlice";
import {logoutUser} from "../../app/services/slices/authorizationSlice.ts";
import {ProfileBlock} from "../../features/ProfileBlock";
import {FormDataPersonal} from "../../widgets/FormDataPersonal";
import {FormCareerAndEducation} from "../../widgets/FormCareerAndEducation"
import {FormAboutMe} from "../../widgets/FormAboutMe"
import {FormConfidentiality} from "../../widgets/FormConfidentiality";
import {FormNotifications} from "../../widgets/FormNotifications";
import cn from "classnames";
import style from "./index.module.scss";

const ProfileLayout = () => (
  <div className={style.formContainer}>
    <ProfileBlock/>
    <Outlet/>
  </div>
)

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const activeClassName = ({isActive}: { isActive: boolean }) => (isActive ? style.active : '')
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(resetProfile())
    dispatch(logoutUser())
    navigate('/', {replace: true});
  };

  return (
    <div className={cn(style.container, 'container')}>
      <nav className={style.navigateContainer}>
        <NavLink className={activeClassName} to='' end={true}>Персональные данные</NavLink>
        <NavLink className={activeClassName} to='career'>Карьера и образование</NavLink>
        <NavLink className={activeClassName} to='about'>О себе</NavLink>
        <NavLink className={activeClassName} to='confidentiality'>Конфиденциальность</NavLink>
        <NavLink className={activeClassName} to='notice'>Уведомления</NavLink>
        <button onClick={handleLogout}>Выйти</button>
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
