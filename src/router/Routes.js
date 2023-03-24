import ScrappingForm from "../pages/scrappingForm/ScrappingForm";
import ScrappedInfo from "../pages/scrapppedInfo/ScrappedInfo";
import RouteDefinitions from "./RouteDefinition";

const RouteList = [
  {
    path: RouteDefinitions.ROUTE_DEFAULT,
    element: <ScrappingForm />,
  },
  {
    path: RouteDefinitions.ROUTE_HOME,
    element: <ScrappingForm />,
  },
  {
    path: RouteDefinitions.ROUTE_SITE_DETAILS,
    element: <ScrappedInfo />,
  },
];

export default RouteList;
