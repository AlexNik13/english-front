import {Route, Routes} from "react-router-dom";
import MainLayout from "./page/layout/MainLayout";
import IrregularVerb from "./page/irregularVerb/IrregularVerb";
import ChooseLanguage from "./utils/ChooseLanguage";

function App() {

  return (
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path={''} element={<ChooseLanguage/>}/>
          <Route path={'/:lan'} element={<IrregularVerb/>}/>
        </Route>
      </Routes>
  );
}

export default App;
