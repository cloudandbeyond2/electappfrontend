import PropTypes from 'prop-types';
import React from 'react';

const AgentDetails = ({ selectedAgent, isEditable, setIsEditable }) => {
  if (!selectedAgent) {
    return <p>Please select an agent to view details.</p>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Agent Details</h3>
      <form>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { label: 'Name', value: `${selectedAgent.firstName} ${selectedAgent.lastName}` },
            { label: 'Agent Id', value: selectedAgent.agentId },
            { label: 'Email', value: selectedAgent.email },
            { label: 'Phone Number', value: selectedAgent.mobileNumber },
            { label: 'Gender', value: selectedAgent.gender },
            { label: 'Date of Birth', value: new Date(selectedAgent.dateOfBirth).toLocaleDateString() },
            { label: 'Constituency', value: selectedAgent.address.constituency },
            { label: 'Ward Number', value: selectedAgent.address.wardNumber },
            {
              label: 'Address',
              value: `${selectedAgent.address.street}, ${selectedAgent.address.city}, ${selectedAgent.address.state}-${selectedAgent.address.postCode}, ${selectedAgent.address.country}`,
            },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '15px' }}>
              <strong style={{ width: '20%' }}>{label} :</strong>
              <input
                type="text"
                value={value}
                readOnly={!isEditable}
                style={{
                  width: '80%',
                  padding: '10px',
                  marginTop: '5px',
                  border: 'none',
                }}
              />
            </div>
          ))}

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
            <button
              type="button"
              onClick={() => setIsEditable(!isEditable)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: '#fff',
                borderRadius: '5px',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              {isEditable ? 'Cancel' : 'Edit'}
            </button>
            {isEditable && (
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  // Handle save action
                }}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#2196F3',
                  color: '#fff',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
AgentDetails.propTypes = {
    selectedAgent: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      agentId: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      mobileNumber: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      dateOfBirth: PropTypes.string.isRequired,
      address: PropTypes.shape({
        street: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        postCode: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        constituency: PropTypes.string.isRequired,
        wardNumber: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    isEditable: PropTypes.bool.isRequired,
    setIsEditable: PropTypes.func.isRequired,
  };
  
export default AgentDetails;
