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
import ChangePassword from "./pages/users/changePassword";
import PostUpload from "./pages/posts/upload";
import { AuthProvider } from "./context/AuthProvider";
import RoleGuard from "./middleware/roleGuard";
import GuestRoute from "./middleware/guestRoute";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<GuestRoute />}>
              <Route path="/" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>
            <Route path="/posts" element={<PostList />} />
            {/* logged user */}
            <Route element={<ProtectedRoute />}>
              <Route path="/posts/create" element={<PostCreate />} />
              <Route path="/posts/edit/:postId" element={<PostEdit />} />
              <Route path="/posts/upload" element={<PostUpload />} />
              <Route path="user/profile" element={<UserProfile />} />
              {/* Admin only */}
              <Route element={<RoleGuard allow={["admin"]} />}>
                <Route path="/users" element={<UserList />} />
                <Route path="users/create" element={<UserCreate />} />
                <Route path="users/edit/:userId" element={<UserEdit />} />
                <Route
                  path="user/change-password"
                  element={<ChangePassword />}
                />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
