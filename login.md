  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // if (!email || !password) {
      //   alert("Please enter both email and password.");
      //   return;
      // }
  
      // LOGIN
      const response = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        }
      );
  
      const { data } = response;
      const { success, message } = data;
  
      if (success) {
        alert(message);
        // Navigate to the dashboard
        navigate("../dashboard");
      } else {
        // Handle unsuccessful login
        alert(message);
      }
    } catch (error) {
  
      // Handle specific error cases if needed
      if (error.response) {
        // The request was made, but the server responded with a status code outside the 2xx range
        alert( error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error setting up the request:", error.message);
      }
    }
  };
