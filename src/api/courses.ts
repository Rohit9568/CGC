export interface Course {
  id: number;
  title: string;
  category: string;
  rating: number;
  instructors: string;
  price: number;
  thumb: string;
  desc: string;
}

export const fetchCourses = async (): Promise<Course[]> => {
  try {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    const response = await fetch('http://localhost:5000/api/modules/mymodules', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Add the token to the Authorization header
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`); // Handle non-OK response
    }

    const data: Course[] = await response.json(); // Parse and ensure data is of type Course[]
    
    return data; // Return the courses data
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error; // Re-throw error after logging it
  }
};
