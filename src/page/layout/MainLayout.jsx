import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import styles from './css/MainLayout.module.css';
import {languages} from "../../utils/Language";
import {useTranslation} from "react-i18next";
import {useEffect} from "react";

const MainLayout = () => {

  const lan = useParams().lan;
  const {i18n } = useTranslation();

  const navigate = useNavigate();

  const location = useLocation();
  const { search, pathname } = location;

  useEffect(() => {
    i18n.changeLanguage(lan);
  }, [lan])

  const changeLanguage = (event) => {
    const url = `/${event.target.value}${pathname.slice(3)}${search}`;
    navigate(url)
  };


  return (
      <div>
        <header className={styles.main_layout__header}>
          <div></div>
          <select
              className={styles.main_layout__header__select}
            value={lan}
            onChange={ changeLanguage}
          >
            {languages.map(lan =>
            <option value={lan} key={lan}>{lan}</option>
            )}
          </select>
        </header>
        <div  className={styles.main_layout__container}>
          <Outlet/>
        </div>
      </div>
  );
};

export default MainLayout;