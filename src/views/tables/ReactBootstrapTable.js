import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, ModalBody } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';
import './ReactBootstrapTable.scss';
import ComponentCard from '../../components/ComponentCard';

const Datatables = () => {
  const [agents, setAgents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [fileUrl, setFileUrl] = useState('');

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

  // Function to open modal with file
  const openFileViewer = (filePath) => {
    setFileUrl(filePath);
    setModalOpen(true);
  };

  const renderFileViewerButton = (filePath) => (
    filePath ? (
      <button
        type="button"
        className="btn btn-link"
        onClick={() => openFileViewer(filePath)}
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
              <TableHeaderColumn width="100" dataField="firstName" isKey filter={{ type: 'TextFilter', delay: 1000 }}>
                First Name
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="lastName" filter={{ type: 'TextFilter', delay: 1000 }}>
                Last Name
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="gender" filter={{ type: 'TextFilter', delay: 1000 }}>
                Gender
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="constituency" filter={{ type: 'TextFilter', delay: 1000 }}>
                Constituency
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="wardNumber" filter={{ type: 'TextFilter', delay: 1000 }}>
                Ward Number
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="aadhar" dataFormat={(cell, row) => renderFileViewerButton(row.aadharFilePath)}>
                Aadhar
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="pan" dataFormat={(cell, row) => renderFileViewerButton(row.panFilePath)}>
                PAN
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="voterId" dataFormat={(cell, row) => renderFileViewerButton(row.voterIdFilePath)}>
                Voter ID
              </TableHeaderColumn>
            </BootstrapTable>
          </ComponentCard>
        </Col>
      </Row>

      {/* File Viewer Modal */}
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)} size="lg">
        <ModalBody>
          {fileUrl ? (
            <iframe
              src={fileUrl}
              title="File Viewer"
              width="100%"
              height="500px"
              style={{ border: 'none' }}
            ></iframe>
          ) : (
            <p>No file to display</p>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Datatables;
