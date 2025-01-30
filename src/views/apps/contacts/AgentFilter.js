import React , { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, ListGroupItem, Button, Modal, ModalHeader } from 'reactstrap';
import { setVisibilityFilter } from '../../../store/apps/contacts/ContactSlice';
import ContactAdd from '../../../components/apps/contact/ContactAdd';

const AgentFilter = () => {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.contactsReducer.currentFilter);
  const [modal, setModal] = React.useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const toggle = () => {
    setModal(!modal);
  };
  const toggleDropdown = (state) => {
    setOpenDropdown(openDropdown === state ? null : state);
  };
  return (
    <>
      <div className="p-3 border-bottom">
        <Button color="danger" block onClick={toggle}>
          Add New Contact
        </Button>
      </div>
      <ListGroup flush>
        <h6 className="px-3 pt-3">Filter </h6>
        <ListGroupItem
          href="#"
          tag="a"
          className={active === 'show_all' ? 'bg-light py-3 border-0' : 'py-3 border-0'}
          onClick={() => dispatch(setVisibilityFilter('show_all'))}
        >
          <i className="bi bi-people mx-1" /> All
        </ListGroupItem>
        <ListGroupItem
          href="#"
          tag="a"
          className={active === 'TamilNadu' ? 'bg-light py-3 border-0' : 'py-3 border-0'}
          onClick={() => toggleDropdown('TamilNadu')}
        >
          <i className="bi bi-people mx-1" /> Tamil Nadu
          <i className={`bi ${openDropdown === 'TamilNadu' ? 'bi-chevron-up' : 'bi-chevron-down'} mx-2`} />
        </ListGroupItem>

        {openDropdown === 'TamilNadu' && (
          <ListGroup className="ps-4">
            {['Chengalpattu', 'Coimbatore', 'Dharmapuri', 'Erode', 'Karur', 'Nagapattinam', 'Nilgiris', 'Theni', 'Salem', 'Virudhunagar', 'Tiruvannamalai', 'Thootukudi', 'Ranipet', 'Perambalur', 'Krishnagiri'].map((district) => (
              <ListGroupItem
                key={district}
                href="#"
                tag="a"
                className={active === district ? 'bg-light py-2 border-0' : 'py-2 border-0'}
                onClick={() => toggleDropdown('TamilNadu')}
              >
                <i className="bi bi-geo-alt mx-1" /> {district}
                
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
        <ListGroupItem
          href="#"
          tag="a"
          className={active === 'Kerala' ? 'bg-light py-3 border-0' : 'py-3 border-0'}
          onClick={() => toggleDropdown('Kerala')}
        >
          <i className="bi bi-people mx-1" /> Kerala
          <i className={`bi ${openDropdown === 'Kerala' ? 'bi-chevron-up' : 'bi-chevron-down'} mx-2`} />
        </ListGroupItem>
        {openDropdown === 'Kerala' && (
          <ListGroup className="ps-4">
            {['Thiruvananthapuram', 'Kollam', 'Alappuzha', 'Pathanamthitta', 'Kottayam', 'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode', 'Wayanad', 'Kannur',  'Kasaragod'].map((district) => (
              <ListGroupItem
                key={district}
                href="#"
                tag="a"
                className={active === district ? 'bg-light py-2 border-0' : 'py-2 border-0'}
                onClick={() => toggleDropdown('Kerala')}
              >
                <i className="bi bi-geo-alt mx-1" /> {district}
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
        {/* <ListGroupItem
          href="#"
          tag="a"
          className={active === 'frequent_contact' ? 'bg-light py-3 border-0' : 'py-3 border-0'}
          onClick={() => dispatch(setVisibilityFilter('frequent_contact'))}
        >
          <i className="bi bi-bezier mx-1" /> Frequent
        </ListGroupItem>
        <ListGroupItem
          href="#"
          tag="a"
          className={active === 'starred_contact' ? 'bg-light py-3 border-0' : 'py-3 border-0'}
          onClick={() => dispatch(setVisibilityFilter('starred_contact'))}
        >
          <i className="bi bi-star mx-1" /> Starred
        </ListGroupItem>
        <div className="border-bottom py-2 mb-2" />
        <h6 className="px-3 pt-3">Filter By Categories</h6>
        <ListGroupItem
          href="#"
          tag="a"
          className={
            active === 'engineering_department' ? 'bg-light py-3 border-0' : 'py-3 border-0'
          }
          onClick={() => dispatch(setVisibilityFilter('engineering_department'))}
        >
          <i className="bi bi-bookmark-star mx-1" /> Engineering
        </ListGroupItem>
        <ListGroupItem
          href="#"
          tag="a"
          className={active === 'support_department' ? 'bg-light py-3 border-0' : 'py-3 border-0'}
          onClick={() => dispatch(setVisibilityFilter('support_department'))}
        >
          <i className="bi bi-bookmark-star mx-1" /> Support
        </ListGroupItem>
        <ListGroupItem
          href="#"
          tag="a"
          className={active === 'sales_department' ? 'bg-light py-3 border-0' : 'py-3 border-0'}
          onClick={() => dispatch(setVisibilityFilter('sales_department'))}
        >
          <i className="bi bi-bookmark-star mx-1" /> Sales
        </ListGroupItem> */}
      </ListGroup>
      {/***********Contact Add Box**************/}
      <Modal isOpen={modal} toggle={toggle} size="md">
        <ModalHeader toggle={toggle}>Add Contact</ModalHeader>
        <ContactAdd click={toggle} />
      </Modal>
      {/***********Contact Add Box End**************/}
    </>
  );
};

export default AgentFilter;
