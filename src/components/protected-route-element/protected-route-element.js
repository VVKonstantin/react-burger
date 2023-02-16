import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

export function ProtectedRouteElement({ element, user = null }) {

  const location = useLocation();

  const checkUser = (getCookie('accessToken') || user);

  const unreg = location.pathname.startsWith('/profile') ? false : true;

  if (!checkUser && !unreg) return <Navigate to="/login" state={{ from: location }} />;
  if (checkUser && unreg) return <Navigate to={location.state?.from || "/"} />;

  return element;
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired
}
