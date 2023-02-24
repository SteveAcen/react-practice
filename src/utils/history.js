//处理token失效问题
import { createBrowserHistory } from 'history'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
const history = createBrowserHistory() //可以用来记录路由的访问记录，全局只有一个

export {
  HistoryRouter,
  history
}