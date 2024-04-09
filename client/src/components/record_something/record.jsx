import React, { useState } from 'react';

const Record = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    cin: '',
    comments: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ cin: '', comments: '' }); // Clear form fields after submission
  };

  return (
    <div>
      <h2>Add Comments to Case</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Case Identification Number (CIN):</label>
          <input
            type="text"
            name="cin"
            value={formData.cin}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Comments:</label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Record;
