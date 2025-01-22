import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios'; // For fetching data
import './ReactBootstrapTable.scss';
import ComponentCard from '../../components/ComponentCard';

// This is for the Search item
function afterSearch(searchText, result) {
  console.log(`Your search text is ${searchText}`);
  console.log('Result is:');
  for (let i = 0; i < result.length; i++) {
    console.log(`Agent: ${result[i].firstName}, ${result[i].lastName}, ${result[i].gender}`);
  }
}

const options = {
  afterSearch, // define a after search hook
};

const selectRowProp = {
  mode: 'checkbox',
};

const Datatables = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get('https://agentsapp.vercel.app/api/agents');
        // Log the data structure for debugging
        console.log(response.data); // Verify that the address field exists

        // Map the data if needed
        const agentsWithDefaults = response.data.map(agent => ({
          ...agent,
          wardNumber: agent.address?.wardNumber || '', // Safely extract wardNumber
          constituency: agent.address?.constituency || '', // Safely extract constituency
        }));

        setAgents(agentsWithDefaults);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };

    fetchAgents();
  }, []);

  return (
    <div>
      <Row>
        <Col md="12">
          <ComponentCard title="DataTable">
            <BootstrapTable
              striped
              hover
              condensed
              search
              data={agents} // Pass the updated agents data with proper fields
              deleteRow
              selectRow={selectRowProp}
              pagination
              options={options}
              tableHeaderClass="mb-0"
              tableStyle={{ tableLayout: 'fixed' }} // Add this to ensure fixed table layout
            >
              <TableHeaderColumn width="100" dataField="firstName" isKey>
                First Name
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="lastName">
                Last Name
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="gender">
                Gender
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="constituency">
                Constituency
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="wardNumber">
                Ward Number
              </TableHeaderColumn>
            </BootstrapTable>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default Datatables;
