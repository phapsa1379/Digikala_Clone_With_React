import {Component} from 'react';
import {Navigate} from 'react-router-dom';
import {PATHS} from 'configs/routes.config';
import {MainLayout} from 'layout';
import {History} from '..';
import {DEFAULT_PROPS, PROP_TYPES} from './ProtectedRoute.config';

const TargetPage = ({Component, hasLayout}) => {

  const isLoggedIn = localStorage.getItem('IS_LOGGED_IN') === 'true';

  if (isLoggedIn) {
    return <Navigate replace to={PATHS.HOME} />
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

class ProtectedRoute extends Component {
  render() {
    const {component, hasLayout} = this.props;

    return (
      <TargetPage Component={component} hasLayout={hasLayout}/>
    );
  }
}

ProtectedRoute.defaultProps = DEFAULT_PROPS;
ProtectedRoute.propTypes = PROP_TYPES;

export {ProtectedRoute};
