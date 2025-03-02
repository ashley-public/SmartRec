import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        passions: '',
        college_major: '',
        adjectives: '',
        activities: '',
        leadership: '',
        helping_community: '',
        special_circumstances: '',
    });

    const [letter, setLetter] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
        ...prevState,
        [name]: value,
    }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Submitting form with', formData);

        // send form data to the backend
        const response = await fetch('http://localhost:8000/api/generate-letter/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(formData)
        });

        const data = await response.json();
        // get the LLM generated letter in data.letter
        setLetter(data.letter);
        console.log('Form submitted', formData);

        /*
        body: JSON.stringify({
                first_name,
                last_name,
                adjectives,
                passions,
                college_major,
                activities,
                special_circumstances,
                helping_community,
        }),
        */
        navigate('/thank-you');
  };

  return (
    <div className="ms-5 me-5">
       <h1> Student Form </h1>
        <h3> Please fill out the responses below to assist your teacher or counselor in writing a recommendation letter for you. </h3>
        <br></br>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label"> First Name: </label>
          <input 
            type="text" 
            className="form-control" 
            id="first_name" 
            name="first_name"
            value={formData.first_name} 
            onChange={handleChange}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="last_name" className="form-label"> Last Name: </label>
            <input 
                type="text" 
                className="form-control" 
                id="last_name" 
                name="last_name" 
                value={formData.last_name} 
                onChange={handleChange}
            />
        </div>
       
        <div className="mb-3">
            <label htmlFor="adjectives" className="form-label"> Please describe yourself in three adjectives. </label>
            <input 
                type="text"
                className="form-control"
                id="adjectives" 
                name="adjectives" 
                value={formData.adjectives} 
                onChange={handleChange}
                />
        </div>
       
        <div className="mb-3">
            <label htmlFor="passions" className="form-label"> What is your favorite subject, or what interests and passions drive your learning (inside or outside the classroom)? </label>
            <input 
                type="text"
                className="form-control"
                id="passions" 
                name="passions" 
                value={formData.passions} 
                onChange={handleChange}
                />
        </div>
        <div className="mb-3">
            <label htmlFor="college_major" className="form-label">  Do you have any ideas about a college major or area of interest you hope to study? </label>
            <input 
                type="text" 
                className="form-control" 
                id="college_major" 
                name="college_major" 
                value={formData.college_major} 
                onChange={handleChange}
                />
        </div>
        <div className="mb-3">
            <label htmlFor="activities" className="form-label"> What extracurricular activities are most meaningful to you, and why? </label>
            <input
                type="text"
                className="form-control"
                id="activities" 
                name="activities" 
                value={formData.activities} 
                onChange={handleChange}
                />
        </div>
        <div className="mb-3">
            <label htmlFor="leadership" className="form-label">  Have you taken on any leadership roles? If so, what impact did you have?  </label>
            <input 
                type="text" 
                className="form-control" 
                id="leadership" 
                name="leadership" 
                value={formData.leadership} 
                onChange={handleChange}
                />
        </div>
        <div className="mb-3">
            <label htmlFor="helping_community" className="form-label">  How do you contribute to your school or community outside of academics?  </label>
            <input 
                type="text"
                className="form-control"
                id="helping_community"
                name="helping_community"
                value={formData.helping_community} 
                onChange={handleChange} 
                />
        </div>
        <div className="mb-3">
            <label htmlFor="special_circumstances" className="form-label"> Are there any special circumstances you would like to share that might be helpful in your recommendation (e.g., schedule conflicts, family responsibilities, personal challenges)? </label>
            <input 
                type="text" 
                className="form-control"
                id="special_circumstances" 
                name="special_circumstances" 
                value={formData.special_circumstances} 
                onChange={handleChange} />
        </div>
        <br />
        <button className="btn btn-primary" type="submit">Generate Letter</button>
      </form>

      {letter && (
        <div>
          <h3>Generated Recommendation Letter:</h3>
          <p>{letter}</p>
        </div>
      )}
    </div>
  );
}

export default Form;
