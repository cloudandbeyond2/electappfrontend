import React from 'react';
import PropTypes from 'prop-types';
import { FaStar, FaTrashAlt } from 'react-icons/fa';
import ContactSearch from '../../../components/apps/contact/ContactSerch';

const AgentList = ({ agents, loading, searchTerm, handleRowClick, handleStarredClick, handleDeleteClick }) => {
  const filteredAgents = agents.filter(
    (agent) =>
      agent.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.address.constituency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ContactSearch />
      {loading ? (
        <p>Loading agents...</p>
      ) : (
        <div className="agents-list" style={{ padding: '10px', maxWidth: '700px', margin: '0 auto' }}>
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="agent-card"
              onClick={() => handleRowClick(agent)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '2px 9px',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                    {agent.firstName} {agent.lastName}
                  </p>
                  <p style={{ fontSize: '14px', color: '#666' }}>{agent.address.constituency}</p>
                </div>
                <div>
                  <p style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                    <FaStar
                      color={agent.starred ? 'yellow' : 'gray'}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStarredClick(agent.id);
                      }}
                      style={{ cursor: 'pointer' }}
                    />
                    <FaTrashAlt
                      color="red"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(agent.id);
                      }}
                      style={{ cursor: 'pointer' }}
                    />
                  </p>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
AgentList.propTypes = {
    agents: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        address: PropTypes.shape({
          constituency: PropTypes.string.isRequired,
        }).isRequired,
        starred: PropTypes.bool.isRequired,
      })
    ).isRequired,
    loading: PropTypes.bool.isRequired,
    searchTerm: PropTypes.string.isRequired,
    handleRowClick: PropTypes.func.isRequired,
    handleStarredClick: PropTypes.func.isRequired,
    handleDeleteClick: PropTypes.func.isRequired,
  };
export default AgentList;
