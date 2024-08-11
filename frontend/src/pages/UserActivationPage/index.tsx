import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/services/hooks.ts";
import {activateUser} from "../../app/services/slices/authorizationSlice.ts";
import LoadingIcon from "../../app/assets/icons/loading.svg?react";
import ErrorIcon from "../../app/assets/icons/error.svg?react";
import style from "./index.module.scss";

export const UserActivationPage = () => {
  const [count, setCount] = useState<number>(10);
  const dispatch = useAppDispatch();
  const {uid, token} = useParams();
  const navigate = useNavigate();
  let {
    statusActivate,
    activationTokenIsExpired,
    activationTokenNotFound
  } = useAppSelector(state => state.authorization);

  useEffect(() => {
    if (uid && token && statusActivate === 'idle') {
      dispatch(activateUser({uid, token}))
    }
  }, [uid, token]);

  useEffect(() => {
    if (statusActivate === 'success' || activationTokenIsExpired) {
      const id = setTimeout(() => setCount(count - 1), 1000);
      count == -1 && clearTimeout(id);
      return () => clearTimeout(id);
    }
  }, [statusActivate, activationTokenIsExpired, count]);

  useEffect(() => {
    if ((statusActivate === 'success' || activationTokenIsExpired) && count === -1) {
      navigate('/', {replace: true});
    }
  }, [statusActivate, activationTokenIsExpired, count]);

  useEffect(() => {
    activationTokenNotFound && navigate('/not-found', {replace: true});
  }, [activationTokenNotFound]);

  const circumference = 2 * Math.PI * 45;
  const progress = (count / 10) * circumference;

  return (
    <div className='container'>
      {statusActivate === 'loading' && <LoadingIcon className='loading-error-icon'/>}
      {statusActivate === 'error' && !activationTokenIsExpired && <ErrorIcon className='loading-error-icon'/>}
      {(statusActivate === 'success' || activationTokenIsExpired) && (
        <div className={style.container}>
          <h1>
            {activationTokenIsExpired ? 'Email уже был подтвержден ранее.' : 'Спасибо за подтверждение вашего электронного адреса.'}
            <br/>
            Теперь вы можете войти в свой аккаунт.
          </h1>
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="var(--c-opt-green)"
              strokeWidth="10"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              strokeLinecap="round"
              transform="rotate(90 50 50)"
              style={{transition: "stroke-dashoffset 1s linear"}}
            />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dy=".3em"
              fontSize="28"
              fontWeight="400"
              fontFamily="YS-Display"
              fill="var(--c-black-500)"
            >
              {count}
            </text>
          </svg>
          <Link to='/'>Перейти на главную</Link>
        </div>
      )}
    </div>
  )
};
