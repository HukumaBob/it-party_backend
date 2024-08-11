import {Link, useNavigate} from "react-router-dom";
import styles from "./index.module.scss";
import {useEffect} from "react";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/not-found', {replace: true});
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <h1>
          <strong>404</strong>
          <span>страница не найдена</span>
        </h1>
        <p>
          Кажется, вы попали не туда.
          Вернитесь на <Link to='/'>главную страницу</Link>.
        </p>
      </div>
    </div>
  );
};
