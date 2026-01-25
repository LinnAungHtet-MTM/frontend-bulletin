import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./middleware/protectedRoute";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import PostList from "./pages/posts/List";
import UserList from "./pages/users/List";
import UserCreate from "./pages/users/create";
import UserEdit from "./pages/users/edit";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/posts" element={<PostList />} />
            <Route path="/users" element={<UserList />} />
            <Route path="users/create" element={<UserCreate/>} />
            <Route path="users/edit/:userId" element={<UserEdit/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
