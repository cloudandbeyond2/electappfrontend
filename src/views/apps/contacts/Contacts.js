import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteContact, toggleStarredContact } from '../../../store/apps/contacts/ContactSlice';
import ThreeColumn from '../../../components/threeColumn/ThreeColumn';
import AgentList from './AgentList';
import AgentDetails from './AgentDetails';
import AgentFilter from './AgentFilter';

const Contacts = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const searchTerm = useSelector((state) => state.contactsReducer.contactSearch);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get('https://agentsapp.vercel.app/api/agents')
      .then((response) => {
        setAgents(response.data);
        if (response.data.length > 0) {
          setSelectedAgent(response.data[0]); // Set first agent as default
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching agents:', error);
        setLoading(false);
      });
  }, []);

  const handleStarredClick = (id) => {
    dispatch(toggleStarredContact(id));
  };

  const handleDeleteClick = (id) => {
    dispatch(DeleteContact(id));
  };

  const handleRowClick = (agent) => {
    setSelectedAgent(agent);
  };

  return (
    <Card>
      <CardBody>
        <ThreeColumn
          leftContent={<AgentFilter />}
          middleContent={
            <AgentList
              agents={agents}
              loading={loading}
              searchTerm={searchTerm}
              handleRowClick={handleRowClick}
              handleStarredClick={handleStarredClick}
              handleDeleteClick={handleDeleteClick}
            />
          }
          rightContent={<AgentDetails selectedAgent={selectedAgent} isEditable={isEditable} setIsEditable={setIsEditable} />}
        />
      </CardBody>
    </Card>
  );
};

export default Contacts;
