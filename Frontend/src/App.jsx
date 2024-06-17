import React, { useState,useEffect } from 'react';
import Form from './components/Form'; 
import DataDisplay from './components/Datadisplay'; 

const App = () => {
  const [responseData, setResponseData] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    countryCode: '',
    phoneNumber: '',
  });
  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("formData"));
    if (storedFormData) {
      setFormData(storedFormData);
    }
    const storedListData = JSON.parse(localStorage.getItem('responseData'));
    if (storedListData) {
      setResponseData(storedListData);
    }
  }, [])
 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);

    try {
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: selectedForm, 
          ...formData, 
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert('Form submitted successfully!');
      
      setFormData({
        name: '',
        countryCode: '',
        phoneNumber: '',
      });
      setSelectedForm(null); 
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form');
    }
  };
  

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setResponseData(data);
      localStorage.setItem('responseData', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md text-center m-6">
        <h1 className="text-3xl font-bold mb-6 text-purple-700">
          MedWander Technology: FullStack Intern Assignment
        </h1>
        
        {!selectedForm ? (
          <div>
            <button 
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md "
              onClick={() => setSelectedForm('Form A')}
            >
              Form A
            </button>
            <h2 className="text-2xl py-4 font-normal">( OR )</h2>
            <button 
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md"
              onClick={() => setSelectedForm('Form B')}
            >
              Form B
            </button>
          </div>
        ) : (
          <>
          <button 
          className="mb-4 px-4 py-2 font-bold text-white bg-blue-500 rounded-md"
          onClick={() => setSelectedForm(null)}
        >
          Back
        </button>
        <Form
            formTitle={selectedForm}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </>
          
        )}
      </div>

      <div className="w-full max-w-4xl p-8 m-6 space-y-6 bg-white rounded-lg shadow-md text-center">
        <button 
          onClick={fetchData} 
          className="mb-4 px-4 py-2 font-bold text-white bg-blue-500 rounded-md"
        >
          Fetch & Update Data
        </button>
        {responseData.length > 0 && <DataDisplay data={responseData} />}
      </div>
    </div>
  );
};

export default App;
