import { protectedRoute } from 'constant/protectedRoute';
import { publicRoute } from 'constant/publicRoute';
import CheckAuth from 'helper/CheckAuth';
import RequireAuth from 'helper/RequireAuth';
import { Layout, NotFoundPage } from 'layout';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<CheckAuth />}>
          {publicRoute.map(({ to, Component }) => {
            return (
              <Route key={to}>
                <Route path={to} element={<Component />} />
              </Route>
            );
          })}
        </Route>
        <Route element={<Layout />}>
          {protectedRoute.map(({ to, Component }) => {
            return (
              <Route key={to} element={<RequireAuth />}>
                <Route path={to} element={<Component />} />
              </Route>
            );
          })}
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
export default App;
