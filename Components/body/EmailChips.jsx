import { useState } from 'react';

 const EmailChips = ()=>{
    const [emails, setEmails] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleChipDelete = (index) => {
    const updatedEmails = [...emails];
    updatedEmails.splice(index, 1);
    setEmails(updatedEmails);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (inputValue.trim() !== '') {
        setEmails([...emails, inputValue]);
        setInputValue('');
      }
    }
  };
    return(
        <div>
            <div className="chip-container">
        {emails.map((email, index) => (
          <div key={index} className="chip">
            {email}
            <button onClick={() => handleChipDelete(index)}>&times;</button>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Email"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
      />
        </div>
    )
}

export default EmailChips
