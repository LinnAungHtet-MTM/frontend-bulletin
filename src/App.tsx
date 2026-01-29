import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./middleware/protectedRoute";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import PostList from "./pages/posts/List";
import UserList from "./pages/users/List";
import UserCreate from "./pages/users/create";
import UserEdit from "./pages/users/edit";
import UserProfile from "./pages/users/profile";
import PostCreate from "./pages/posts/create";
import PostEdit from "./pages/posts/edit";

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
            <Route path="/posts/create" element={<PostCreate />} />
            <Route path="posts/edit/:postId" element={<PostEdit />} />
            <Route path="/users" element={<UserList />} />
            <Route path="users/create" element={<UserCreate />} />
            <Route path="users/edit/:userId" element={<UserEdit />} />
            <Route path="user/profile" element={<UserProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
