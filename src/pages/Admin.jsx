import React from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { MdOutlineClass, MdOutlineTopic } from "react-icons/md";
import { GrChapterAdd } from "react-icons/gr";
import { BsQuestionSquare } from "react-icons/bs";
import Class from "./Class";
import Topics from "./Topics";
import Questions from "./Questions";
const Admin = () => {
  const navigate = useNavigate();
  const handleDelete = () => {
    localStorage.removeItem("token");
    window.location.reload();
    navigate("/");
  };
  return (
    <>
      <Routes>
        <Route path="/admin/class" element={<Class />} />
        <Route path="/admin/topics" element={<Topics />} />
        <Route path="/admin/questions" element={<Questions />} />
      </Routes>
      <aside className="sidebar">
        <h1>Admin Dashboard</h1>
        <ul>
          <NavLink to="/admin/class">
            <li>
              <MdOutlineClass className="icon" />
              Class
            </li>
          </NavLink>
          <NavLink to="/admin/chapter">
            <li>
              <GrChapterAdd className="icon" />
              Chapter
            </li>
          </NavLink>
          <NavLink to="/admin/topics">
            <li>
              <MdOutlineTopic className="icon" />
              Topics{" "}
            </li>
          </NavLink>
          <NavLink to="/admin/questions">
            <li>
              <BsQuestionSquare className="icon" />
              Questions{" "}
            </li>
          </NavLink>
        </ul>

        <button onClick={handleDelete} aria-label="Log Out">
          <CiLogout className="icon" />
          <p>Log Out</p>
        </button>
      </aside>
    </>
  );
};

export default Admin;
