import { Row, Col, Card, Progress, CardBody } from 'reactstrap';
import * as Icon from 'react-feather';

const revenues = [
  {
    id: 1,
    icon: Icon.Users,
    title: 'Applied Agents ',
    earn: '25023',
    color: 'primary',
  },
  {
    id: 2,
    icon: Icon.Edit,
    title: 'Selected Agents',
    earn: '17556',
    color: 'cyan',
  },
  {
    id: 3,
    icon: Icon.FileText,
    title: 'Pending Agents',
    earn: '5895',
    color: 'purple',
  },
  {
    id: 4,
    icon: Icon.ShoppingBag,
    title: 'Total Constitutions',
    earn: '786',
    color: 'warning',
  },
];

const RevenueCards = () => {
  return (
    <Card>
      <Row>
        {revenues.map((item) => (
          <Col lg="3" md="6" className="border-end" key={item.id}>
            <CardBody>
              <div className="d-flex align-items-center">
                <div>
                  <item.icon className="text-dark" />
                  <p className="mb-3 mt-2 font-weight-bold fs-6 text-muted">
                    {item.title}
                  </p>
                </div>

                <div className="ms-auto">
                  <h2 className={`text-${item.color}`}>{item.earn}</h2>
                </div>
              </div>

              <Progress value={item.earn} color={item.color} />
            </CardBody>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default RevenueCards;
