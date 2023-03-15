import PropTypes from 'prop-types';
import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

interface IProtectedRouteProps {
  element: JSX.Element;
}

export const ProtectedRouteElement: FC<IProtectedRouteProps> = ({ element }) => {

  const location = useLocation();

  const checkUser = (getCookie('accessToken'));

  const unreg = location.pathname.startsWith('/profile') ? false : true;

  if (!checkUser && !unreg) return <Navigate to="/login" state={{ from: location }} />;
  if (checkUser && unreg) return <Navigate to={location.state?.from || "/"} />;

  return element;
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired
}
