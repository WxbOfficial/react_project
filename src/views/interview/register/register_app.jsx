import { Routes, Route } from "react-router-dom";
// 抄自 https://github.com/remix-run/react-router/issues/8264#issuecomment-991271554 . 原理不理解, react 源码才刚开始看起来, 还没到 react-router
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import Pages, { history, RegisterPage, UserListPage } from "./router/router.js";

import "./register_app.scss";
import "./components/components.scss";

export default function App() {
  return (
    <>
      <div className="header">
        {/* 单纯为了方便页面的跳转, 点击即可, 不需要重输 url */}
        <div
          className="navigation-tab"
          onClick={() => {
            history.push(RegisterPage.Path);
          }}
        >
          注册页面
        </div>
        <div
          className="navigation-tab"
          onClick={() => {
            history.push(UserListPage.Path);
          }}
        >
          用户列表
        </div>
      </div>
      <div className="main">
        <HistoryRouter history={history}>
          <Routes>
            {Pages.map((Page) => {
              return (
                <Route
                  key={Page.Path}
                  path={Page.Path}
                  element={<Page.Element />}
                />
              );
            })}
          </Routes>
        </HistoryRouter>
      </div>
    </>
  );
}
