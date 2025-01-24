import { Badge, Card, CardBody, CardTitle, Input, Table } from 'reactstrap';

const tableData = [
  {
    id: 1,
    name: 'Elite admin',
    status: 'Active',
    date: '11235',
    price: '$24',
  },
  {
    id: 2,
    name: 'Real Homes',
    status: 'Active',
    date: '10235',
    price: '$1250',
  },
  {
    id: 3,
    name: 'Ample Admin',
    status: 'Active',
    date: '9853',
    price: '-$24',
  },
  {
    id: 4,
    name: 'Medical Pro',
    status: 'InActive',
    date: '8125',
    price: '$24',
  },
  {
    id: 5,
    name: 'Hosting press html',
    status: 'Active',
    date: '7525',
    price: '$1250',
  },
  {
    id: 6,
    name: 'Digital Agency PSD',
    status: 'Active',
    date: '6852',
    price: '$64',
  },
  {
    id: 7,
    name: 'Helping Hands',
    status: 'InActive',
    date: '5977',
    price: '-$14',
  },
  {
    id: 8,
    name: 'Ample Admin',
    status: 'InActive',
    date: '5784',
    price: '$1250',
  },
];

const SalesOverview = () => {
  return (
    <Card>
      <CardBody>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <CardTitle tag="h4">Our Top Agents</CardTitle>
          </div>
          <div className="mt-4 mt-md-0">
            <Input type="select" className="custom-select">
              <option value="0">Monthly</option>
              <option value="1">Daily</option>
              <option value="2">Weekly</option>
              <option value="3">Yearly</option>
            </Input>
          </div>
        </div>
      </CardBody>
      <CardBody className="bg-light d-flex align-items-center justify-content-between">
        <div>
          <h3>February 2025</h3>
          <h5 className="fw-light mb-0 text-muted">Report for this month</h5>
        </div>
   
      </CardBody>
      <div className="table-responsive">
        <Table className="text-nowrap align-middle mb-0" hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Status</th>
              <th>Total Clients</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((tdata) => (
              <tr key={tdata.id} className="border-top">
                <td>
                  <h6 className="mb-0">{tdata.id}</h6>
                </td>
                <td>
                  <h6 className="mb-0">{tdata.name}</h6>
                </td>
                <td>
                  {tdata.status === 'tax' ? (
                    <Badge color="danger" pill>{tdata.status}</Badge>
                  ) : tdata.status === 'member' ? (
                    <Badge color="warning" pill>{tdata.status}</Badge>
                  ) : tdata.status === 'extended' ? (
                    <Badge color="primary" pill>{tdata.status}</Badge>
                  ) : (
                    <Badge color="cyan" pill>{tdata.status}</Badge>
                  )}
                </td>
                <td>{tdata.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Card>
  );
};

export default SalesOverview;
