import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import BaiTapToDoListReduxThunk from './Page/BaiTapToDoListReduxThunk/BaiTapToDoListReduxThunk';
import BaiTapToDoListSaga from './Page/BaiTapToDoListSaga/BaiTapToDoListSaga';
// import LoadingComponent from './Components/GlobalSetting/LoadingComponent';

function App() {
  return (
    <BrowserRouter>
      {/* <LoadingComponent /> */}
      <Switch>
        <Route exact path='/todolistreduxthunk' component={BaiTapToDoListReduxThunk}></Route>
        <Route exact path='/todolistsaga' component={BaiTapToDoListSaga} ></Route>
        <Route path="*" component={BaiTapToDoListReduxThunk} ></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
