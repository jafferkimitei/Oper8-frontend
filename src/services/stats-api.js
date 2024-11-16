

export const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/stats');
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  };
  