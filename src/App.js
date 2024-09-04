import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Navbar } from "./componenets/common/Navbar";
import { ForgotPAssword } from "./pages/ForgotPAssword";
import { UpdatePassword } from "./pages/UpdatePassword";
import { VerifyEmail } from "./pages/Verifyemail";
import { About } from "./pages/About";
import { Dashboard } from "./pages/Dashboard";
import { MyProfile } from "./componenets/core/Dashboard/MyProfile";

import { PrivateRoute } from './componenets/core/Auth/PrivateRoute' ; 
import { Enrolledcourses } from "./componenets/core/Dashboard/Enrolledcourses";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import {Contact} from "./pages/Contact";
import { ACCOUNT_TYPE } from "./utils/constants";
import {Error} from "./pages/Error"
import { useSelector } from "react-redux";

import { MyCourses } from "./componenets/core/Dashboard/MyCourses/MyCourses";
import { Editcourse } from "./componenets/core/Dashboard/MyCourses/Editcourse";
import { Catalog } from "./componenets/common/Catalog";
import { CourseDetails } from "./pages/CourseDetails";
import { ViewCourse } from "./pages/ViewCourse";
import { VideoDetails } from "./componenets/core/Viewcourse/VideoDetails";
import { Instructor } from "./componenets/core/Dashboard/InstructorDashboard/Instructor";
import Settings from "./componenets/core/Dashboard/Settings";
import { Cart } from "./componenets/core/Dashboard/Cart/ind";
import AddCourse from "./componenets/core/Dashboard/AddCourse/AddCourse";

function App() {

  const {user}= useSelector(state=>state.profile)

  return (
    <div className="w-[100vw] min-h-screen bg-richblack-900 flex flex-col font-inter">
      <div>
        <Navbar/>
      </div>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/catalog/:catalogName" element={<Catalog/>}/>
      <Route path="/courses/:courseId" element={<CourseDetails/>}/>
      <Route
          path="/signup"
          element={
              <Signup />
          }
        />
      <Route
            path="/login"
            element={
                <Login />
            }
          />

      <Route
            path="/forgot-password"
            element={
                <ForgotPAssword />
            }
          />  

      <Route
          path="/verify-email"
          element={
              <VerifyEmail />
          }
        />  

      <Route
            path="/update-password/:id"
            element={
                <UpdatePassword />
            }
          />  

      <Route
            path="/about"
            element={
                <About />
            }
          />
      <Route path="/contact" element={<Contact />} />

      <Route 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      >
      <Route path="/dashboard/my-profile" element={<MyProfile />} />
      <Route path="/dashboard/Settings" element={<Settings />} />
      

      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route path="/dashboard/cart" element={<Cart/>} />
          <Route path="/dashboard/enrolled-courses" element={<Enrolledcourses />} />
          </>
        )
      }

      {
        user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
            <Route path="/dashboard/instructor" element={<Instructor/>} ></Route>
            <Route path="/dashboard/my-courses" element={<MyCourses/>} ></Route>
            <Route path="/dashboard/add-course" element={<AddCourse/>} ></Route>
            <Route path="/dashboard/edit-course/:courseId" element={<Editcourse/>} ></Route>
          </>
        )
      }


    </Route>

    <Route
        element={
          <PrivateRoute>
            <ViewCourse/>
          </PrivateRoute>
        }
    >
      {
        user?.accountType === ACCOUNT_TYPE.STUDENT &&
        (
          <Route path="view-course/:courseId/section/:sectionid/sub-section/:subSectionId"
            element={<VideoDetails/>}
          />
        )
      }

    </Route>

    <Route path="*" element={<Error />} />


    </Routes>
      
    </div>
  );
}

export default App;
