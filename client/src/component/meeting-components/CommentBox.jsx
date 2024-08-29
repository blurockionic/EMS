import React, { useState, useEffect, useRef } from "react"; // Import necessary hooks and modules from React.
import axios, { all } from "axios"; // Import Axios for making HTTP requests.
import { useDispatch, useSelector } from "react-redux"; // Import hooks from Redux for state management.
import { fetchUsers } from "../../Redux/slices/allUserSlice"; // Import the fetchUsers action to get users.
import { fetchProfile } from "../../Redux/slices/profileSlice"; // Import the fetchProfile action to get the current user's profile.
import { BsThreeDots } from "react-icons/bs"; // Import an icon from the react-icons library.

function CommentBox() {
  const dispatch = useDispatch(); // Initialize the dispatch function from Redux.
  const [comments, setComments] = useState([]); // State to store the list of comments.
  const [content, setContent] = useState(""); // State to store the content of the current comment being typed.
  const [showMentionList, setShowMentionList] = useState(false); // State to control the visibility of the mention list dropdown.
  const [filteredUsers, setFilteredUsers] = useState([]); // State to store the filtered list of users based on the current mention.
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 }); // State to store the position of the mention dropdown (dynamic positioning).
  const textareaRef = useRef(null); // Reference to the textarea element for dynamic positioning and other direct DOM manipulations.

  useEffect(() => {
    // Effect hook to fetch users and profile information when the component mounts.
    dispatch(fetchUsers()); // Fetch the list of users.
    dispatch(fetchProfile()); // Fetch the current user's profile.
  }, [dispatch]); // The effect runs only once when the component is mounted because the dependency array contains only `dispatch`.

  const profile = useSelector((state) => state.profile.data); // Get the current user's profile data from the Redux store.
  const { data } = useSelector((state) => state.user); // Get the list of users from the Redux store.


  const users = [{ _id: "all", firstName: "all", lastName: "" }].concat(data)
  
  const handleMention = (e) => {
    // Function to handle the logic when the user types in the textarea, specifically for mentions.
    const mentionTrigger = content.split(" ").pop(); // Get the last word that was typed (could be a mention trigger).
    if (mentionTrigger.startsWith("@")) {
      // Check if the last word starts with the "@" symbol.
  
      
      // Get the cursor's current position within the textarea.
      const cursorPosition = e.target.selectionEnd;
      
      // Get the text before the cursor.
      const textBeforeCursor = e.target.value.slice(0, cursorPosition);
      
      // Split the text before the cursor into lines.
      const linesBeforeCursor = textBeforeCursor.split("\n");
      
      // Get the number of lines before the cursor and the character position in the current line.
      const lineNumber = linesBeforeCursor.length;
      const charPosition = linesBeforeCursor[lineNumber - 1].length;
      
      // Get the top and left offsets of the textarea element.
      const { offsetTop, offsetLeft } = textareaRef.current;
      
      // Calculate the position of the mention dropdown.
      const mentionTop = offsetTop + lineNumber * 24; // 24px is the assumed height of each line.
      const mentionLeft = offsetLeft + charPosition * 8; // 8px is the assumed width of each character.
      
      setMentionPosition({ top: mentionTop, left: mentionLeft }); // Update the state to position the mention dropdown.
      
      // Filter the list of users based on the text after the "@" symbol.
      setShowMentionList(true); // Show the mention dropdown.

      setFilteredUsers(
        
        users.filter(
          (user) =>
            `${user.firstName} ${user.lastName}`
              .toLowerCase()
              .includes(mentionTrigger.substring(1).toLowerCase()) // Compare ignoring the "@" symbol.
        )
      );
    } else {
      setShowMentionList(false); // Hide the mention dropdown if no "@" symbol is detected.
    }
  };

  const handleUserSelect = (user) => {
    console.log("users",user );
    
    // Function to handle what happens when a user is selected from the mention dropdown.
    const mentionTrigger = content.split(" ").pop(); // Get the last word that was typed (mention trigger).
    const newContent = content.replace(
      new RegExp(`${mentionTrigger}$`), // Replace the mention trigger with the selected user's name.
      `@${user.firstName} ${user.lastName} `
    );
    setContent(newContent); // Update the content with the selected mention.
    setShowMentionList(false); // Hide the mention dropdown.
  };

  const handleSubmit = async () => {
    // Function to handle the submission of a comment.
    console.log(content); // For now, just log the content to the console.
    return; // Prevent the submission to demonstrate the functionality.

    // Uncomment the following to actually submit the comment:

    // const authorId = profile._id; // Use the logged-in user's ID from the profile data.
    // const res = await axios.post('http://localhost:5000/api/comments', { content, authorId }); // Post the comment to the backend API.
    // setComments([res.data.comment, ...comments]); // Update the comments state with the new comment at the top.
    // setContent(''); // Clear the textarea after submission.
  };

  return (
    <div className="container mx-auto mt-4">
      {/* Main container with some Tailwind CSS for styling. */}
  
      <div className="mb-4 relative">
        {" "}
        {/* Added relative class for positioning dropdown. */}
        <textarea
          ref={textareaRef} // Reference to the textarea for dynamic positioning and other direct DOM manipulations.
          value={content} // Bind the content state to the textarea.
          onChange={(e) => setContent(e.target.value)} // Update the content state when the user types.
          onKeyUp={handleMention} // Trigger the mention logic when the user types.
          className="w-full h-24 border border-gray-800 dark:border-gray-600 rounded-lg p-3 resize-none focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          placeholder="Write details about the task" // Placeholder text for the textarea.
        ></textarea>
        {showMentionList && ( // Conditionally render the mention dropdown if it's supposed to be shown.
          <ul
            className="bg-white border rounded mt-2 shadow-lg absolute max-h-40 overflow-y-auto z-10"
            style={{
              top: `${mentionPosition.top}px`,
              left: `${mentionPosition.left}px`,
            }}
          >
            {filteredUsers.map((user) => (
              <li
                key={user._id}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                onClick={() => handleUserSelect(user)} // Handle user selection from the dropdown.
              >
                {user.firstName} {user.lastName}{" "}
                {/* Display the user's full name in the dropdown. */}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-col sm:flex-row justify-end mb-4">
        <button
          onClick={handleSubmit} // Trigger comment submission.
          className="px-4 py-1.5 bg-slate-800 text-white rounded-lg focus:outline-none ml-2"
        >
          Comment {/* Button text. */}
        </button>
      </div>
    </div>
  );
}

export default CommentBox;
