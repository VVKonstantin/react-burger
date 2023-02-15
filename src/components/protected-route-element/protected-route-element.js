import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getProfileUser } from '../../services/actions/auth';
import { getCookie } from '../../utils/cookie';

export function ProtectedRouteElement({ element, unreg }) {

  const user = useSelector(store => store.auth.user);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (getCookie("accessToken")) {
      dispatch(getProfileUser());
    }
  }, [dispatch]);

  if (!user && !unreg) return <Navigate to="/login" state={{ from: location }} />;
  if (user && unreg) return <Navigate to={location.state?.from || "/"} />;

  return element;
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
  unreg: PropTypes.bool.isRequired
}
