import {Component} from 'react';
import {Navigate} from 'react-router-dom';
import {PATHS} from 'configs/routes.config';
import {MainLayout} from 'layout';
import {History} from '..';
import {DEFAULT_PROPS, PROP_TYPES} from './PrivateRoute.config';

const TargetPage = ({Component, hasLayout}) => {

  const isLoggedIn = localStorage.getItem('IS_LOGGED_IN') === 'true';

  if (!isLoggedIn) {
    return <Navigate replace to={PATHS.SIGN_IN} />
  }

  return (
    <History onRender={
      props => {
        return hasLayout ? (
            <MainLayout>
              <Component {...props} />
            </MainLayout>
          ) :
          <Component {...props} />
      }
    } />
  )
}

class PrivateRoute extends Component {
  render() {
    const {component, hasLayout} = this.props;

    return (
      <TargetPage Component={component} hasLayout={hasLayout}/>
    );
  }
}

PrivateRoute.defaultProps = DEFAULT_PROPS;
PrivateRoute.propTypes = PROP_TYPES;

export {PrivateRoute};
