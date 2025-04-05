import { useState, useEffect } from 'react';

const baseUrl = "https://sugarytestapi.azurewebsites.net/";
const listPath = "TestApi/GetComplains";
const savePath = "TestApi/SaveComplain";

type InputProps = React.ComponentPropsWithoutRef<'input'>;
type TextAreaProps = React.ComponentPropsWithoutRef<'textarea'>;
type ButtonProps = React.ComponentPropsWithoutRef<'button'>;
type CardProps = React.ComponentPropsWithoutRef<'div'>;

const Input = (props: InputProps) => {
  return (
    <div>
      <input {...props} />
    </div>
  );
};

const TextArea = (props: TextAreaProps) => {
  return (
    <div>
      <textarea {...props} />
    </div>
  );
};

const Button = (props: ButtonProps) => {
  return (
    <div>
      <button {...props} />
    </div>
  );
};

const Card = ({children, ...props}: CardProps) => {
  return (
    <div {...props}>
      {children}
    </div>
  );
};


function App() {
  const [complains, setComplains] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch complaints from the API
  const fetchComplains = async () => {
    setIsLoading(true);
    const response = await fetch(`${baseUrl}${listPath}`);
    const data = await response.json();
    setComplains(data);
    setIsLoading(false);
  };

  // Save a new complaint
  const handleSubmit = async () => {
    try {
      setIsSaving(true);
      const response = await fetch(savePath, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Title: "Test Title",
          Body: "Test Body",
        }),
      });
      const data = await response.json();
      if (!data.Success) throw new Error("Failed to save complaint.");
      // Missing: Update complaints list after successful submission
    } catch (e) {
      // Error state not being set
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    fetchComplains();
  }, []); // Missing dependency array cleanup

  return (
    
    <div className="wrapper">
      <h2>Submit a Complaint</h2>

      <Card className="complain-form">
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          placeholder="Enter your complaint"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          
        />

        <Button onClick={handleSubmit}>
          {isSaving ? 'Submitting...' : 'Submit Complaint'}
        </Button>

        {/* Place text loader when saving */}
        {/* Error message not displayed even though state exists */}
      </Card>

      <h2>Complaints List</h2>

      {isLoading ? 
      
      (
        <div>Loading...</div>
      ) : complains.length ? (
        complains.map((complain) => (
          <div key={complain.Id} className="complain-item">
            <h3>{complain.Title}</h3>
            <p>{complain.Body}</p>
          </div>
        ))
      ) : (
        <p>No complaints available.</p>
      )}
    </div>
  );
}

export default App;



