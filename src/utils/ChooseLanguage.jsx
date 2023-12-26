import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {languages} from "./Language";

const ChooseLanguage = () => {

  const navigate = useNavigate();
  const lan = useParams().lan;

  useEffect(() => {
      let pathLan = 'ua';

      const userLanguages = navigator.language || navigator.userLanguage;
      const useLanguage = userLanguages?.split('-')[0].toLowerCase();

      if(languages.includes(useLanguage)){
        pathLan = useLanguage;
      }


    navigate(`/${pathLan}`, {replace: true});

  }, []);

  return (
      <div>

      </div>
  );
};

export default ChooseLanguage;