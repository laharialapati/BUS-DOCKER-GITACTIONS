import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import config from './config.js';

const BusServiceManagement = () => {
  const [buses, setBuses] = useState([]);
  const [bus, setBus] = useState({
    busId: '', // will be ignored when adding
    busNumber: '',
    driverName: '',
    route: '',
    capacity: '',
    type: '',
    status: '',
    departureTime: '',
    arrivalTime: '',
    contact: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedBus, setFetchedBus] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${config.url}/busapi`; // keep this as requested

  useEffect(() => {
    fetchAllBuses();
  }, []);

  const fetchAllBuses = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setBuses(res.data);
    } catch (error) {
      setMessage('Failed to fetch buses.');
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setBus({ ...bus, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in bus) {
      // skip busId in validation when adding a new bus
      if (!editMode && key === 'busId') continue;

      if (!bus[key] || bus[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addBus = async () => {
    if (!validateForm()) return;

    // create a copy without busId so backend auto-generates it
    const busData = { ...bus };
    delete busData.busId;

    try {
      await axios.post(`${baseUrl}/add`, busData);
      setMessage('Bus added successfully.');
      fetchAllBuses();
      resetForm();
    } catch (error) {
      setMessage('Error adding bus.');
      console.error(error.response?.data || error.message);
    }
  };

  const updateBus = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, bus);
      setMessage('Bus updated successfully.');
      fetchAllBuses();
      resetForm();
    } catch (error) {
      setMessage('Error updating bus.');
      console.error(error.response?.data || error.message);
    }
  };

  const deleteBus = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllBuses();
    } catch (error) {
      setMessage('Error deleting bus.');
      console.error(error.response?.data || error.message);
    }
  };

  const getBusById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedBus(res.data);
      setMessage('');
    } catch (error) {
      setFetchedBus(null);
      setMessage('Bus not found.');
    }
  };

  const handleEdit = (bus) => {
    setBus(bus);
    setEditMode(true);
    setMessage(`Editing bus with ID ${bus.busId}`);
  };

  const resetForm = () => {
    setBus({
      busId: '',
      busNumber: '',
      driverName: '',
      route: '',
      capacity: '',
      type: '',
      status: '',
      departureTime: '',
      arrivalTime: '',
      contact: ''
    });
    setEditMode(false);
  };

  return (
    <div className="bus-container">
      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <h2>Bus Service Management</h2>

      <div>
        <h3>{editMode ? 'Edit Bus' : 'Add Bus'}</h3>
        <div className="form-grid">
          {/* only show busId when editing */}
          {editMode && <input type="text" name="busId" placeholder="Bus ID" value={bus.busId} onChange={handleChange} readOnly />}
          <input type="text" name="busNumber" placeholder="Bus Number" value={bus.busNumber} onChange={handleChange} />
          <input type="text" name="driverName" placeholder="Driver Name" value={bus.driverName} onChange={handleChange} />
          <input type="text" name="route" placeholder="Route" value={bus.route} onChange={handleChange} />
          <input type="number" name="capacity" placeholder="Capacity" value={bus.capacity} onChange={handleChange} />
          <select name="type" value={bus.type} onChange={handleChange}>
            <option value="">Select Type</option>
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
          </select>
          <select name="status" value={bus.status} onChange={handleChange}>
            <option value="">Select Status</option>
            <option value="Running">Running</option>
            <option value="Maintenance">Maintenance</option>
          </select>
          <input type="time" name="departureTime" placeholder="Departure Time" value={bus.departureTime} onChange={handleChange} />
          <input type="time" name="arrivalTime" placeholder="Arrival Time" value={bus.arrivalTime} onChange={handleChange} />
          <input type="text" name="contact" placeholder="Contact" value={bus.contact} onChange={handleChange} />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addBus}>Add Bus</button>
          ) : (
            <>
              <button className="btn-green" onClick={updateBus}>Update Bus</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      <div>
        <h3>Get Bus By ID</h3>
        <input
          type="text"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter Bus ID"
        />
        <button className="btn-blue" onClick={getBusById}>Fetch</button>

        {fetchedBus && (
          <div>
            <h4>Bus Found:</h4>
            <pre>{JSON.stringify(fetchedBus, null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <h3>All Buses</h3>
        {buses.length === 0 ? (
          <p>No buses found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(bus).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {buses.map((b) => (
                  <tr key={b.busId}>
                    {Object.keys(bus).map((key) => (
                      <td key={key}>{b[key]}</td>
                    ))}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(b)}>Edit</button>
                        <button className="btn-red" onClick={() => deleteBus(b.busId)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusServiceManagement;
