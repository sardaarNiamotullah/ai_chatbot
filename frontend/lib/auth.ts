export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

export const fetchUser = async (): Promise<User | null> => {
  try {
    const response = await fetch('http://localhost:8000/auth/me', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};