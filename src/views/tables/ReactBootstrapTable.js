import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';
import './ReactBootstrapTable.scss';
import ComponentCard from '../../components/ComponentCard';

const Datatables = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get('https://agentsapp.vercel.app/api/agents');
        const agentsWithConstituency = response.data.map(agent => ({
          ...agent,
          constituency: agent.address?.constituency || 'N/A',
          wardNumber: agent.address?.wardNumber || 'N/A',
        }));
        setAgents(agentsWithConstituency);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };
    fetchAgents();
  }, []);

  // Utility function to trigger file download
  const triggerDownload = (fileUrl, fileName) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', fileName); // Ensures the file is downloaded
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render download button for Aadhar
  const renderAadharDownload = (cell, row) => (
    row.aadharFilePath ? (
      <button
        type="button"
        className="btn btn-link"
        onClick={() => triggerDownload(row.aadharFilePath, 'Aadhar.pdf')}
      >
        📄
      </button>
    ) : (
      'N/A'
    )
  );

  // Render download button for PAN
  const renderPANDownload = (cell, row) => (
    row.panFilePath ? (
      <button
        type="button"
        className="btn btn-link"
        onClick={() => triggerDownload(row.panFilePath, 'PAN.pdf')}
      >
        📄
      </button>
    ) : (
      'N/A'
    )
  );

  // Render download button for Voter ID
  const renderVoterIdDownload = (cell, row) => (
    row.voterIdFilePath ? (
      <button
        type="button"
        className="btn btn-link"
        onClick={() => triggerDownload(row.voterIdFilePath, 'VoterID.pdf')}
      >
        📄
      </button>
    ) : (
      'N/A'
    )
  );

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
              data={agents}
              deleteRow
              pagination
              tableHeaderClass="mb-0"
              tableStyle={{ tableLayout: 'fixed' }}
            >
              <TableHeaderColumn
                width="100"
                dataField="firstName"
                isKey
                filter={{ type: 'TextFilter', delay: 1000 }}
              >
                First Name
              </TableHeaderColumn>
              <TableHeaderColumn
                width="100"
                dataField="lastName"
                filter={{ type: 'TextFilter', delay: 1000 }}
              >
                Last Name
              </TableHeaderColumn>
              <TableHeaderColumn
                width="100"
                dataField="gender"
                filter={{ type: 'TextFilter', delay: 1000 }}
              >
                Gender
              </TableHeaderColumn>
              <TableHeaderColumn
                width="100"
                dataField="constituency"
                filter={{ type: 'TextFilter', delay: 1000 }}
              >
                Constituency
              </TableHeaderColumn>
              <TableHeaderColumn
                width="100"
                dataField="wardNumber"
                filter={{ type: 'TextFilter', delay: 1000 }}
              >
                Ward Number
              </TableHeaderColumn>
              <TableHeaderColumn
                width="100"
                dataField="aadhar"
                dataFormat={renderAadharDownload}
              >
                Aadhar
              </TableHeaderColumn>
              <TableHeaderColumn
                width="100"
                dataField="pan"
                dataFormat={renderPANDownload}
              >
                PAN
              </TableHeaderColumn>
              <TableHeaderColumn
                width="100"
                dataField="voterId"
                dataFormat={renderVoterIdDownload}
              >
                Voter ID
              </TableHeaderColumn>
            </BootstrapTable>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default Datatables;
