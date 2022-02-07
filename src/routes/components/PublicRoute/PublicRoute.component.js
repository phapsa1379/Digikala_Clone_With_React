// import { Component } from "react";
// import { MainLayout } from "layout";
// import { History } from "..";
// import { DEFAULT_PROPS, PROP_TYPES } from "./PublicRoute.config";

// const TargetPage = ({ Component, hasLayout }) => {
//   return (
//     <History
//       onRender={(props) => {
//         return hasLayout ? (
//           <MainLayout>
//             <Component {...props} />
//           </MainLayout>
//         ) : (
//           <Component {...props} />
//         );
//       }}
//     />
//   );
// };

// class PublicRoute extends Component {
//   render() {
//     const { component, hasLayout } = this.props;

//     return <TargetPage Component={component} hasLayout={hasLayout} />;
//   }
// }

// PublicRoute.defaultProps = DEFAULT_PROPS;
// PublicRoute.propTypes = PROP_TYPES;

// export { PublicRoute };
