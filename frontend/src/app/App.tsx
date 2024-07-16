import {Route, Routes} from "react-router-dom";
import {Layout} from "./Layout";
import {MainPage} from "../pages/MainPage";
import {EventPage} from "../pages/EventPage";
import {ProfilePage} from "../pages/ProfilePage";
import {ProfileEvents} from "../pages/ProfileEventsPage";
import {AdminPage} from "../pages/AdminPage";
import {AdminEventPage} from "../pages/AdminEventPage";
import {AdminApplicantsPage} from "../pages/AdminApplicantsPage";
import './assets/style/index.scss'

export const App = () => (
  <Routes>
    <Route element={<Layout/>}>
      <Route index path='/' element={<MainPage/>}/>
      <Route path='/event/:id' element={<EventPage/>}/>
      <Route path='/profile/*' element={<ProfilePage/>}/>
      <Route path='/profile/events' element={<ProfileEvents/>}/>
    </Route>
    <Route element={<Layout type='admin'/>}>
      <Route path='/admin' element={<AdminPage/>}/>
      <Route path='/admin/event/new' element={<AdminEventPage/>}/>
      <Route path='/admin/event/:id' element={<AdminEventPage/>}/>
      <Route path='/admin/applicants/:id' element={<AdminApplicantsPage/>}/>
    </Route>
  </Routes>
);
