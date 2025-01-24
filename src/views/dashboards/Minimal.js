import { Row, Col } from 'reactstrap';
import RevenueCards from '../../components/dashboard/minimalDashboard/RevenueCards';
import SalesOverview from '../../components/dashboard/minimalDashboard/SalesOverview';
import SiteVisits from '../../components/dashboard/analyticalDashboard/SiteVisits';

const Minimal = () => {
  return (
    <>
      {/*********************Sales Overview ************************/}
      <Row>
        <Col lg="12">
          <RevenueCards />
        </Col>
        <Col lg="12">
          <SiteVisits />
        </Col>
      
    
        
        <Col lg="12">
          <SalesOverview />
        </Col>
      </Row>
      
    </>
  );
};

export default Minimal;
