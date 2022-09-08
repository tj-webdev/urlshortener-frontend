import create from 'zustand';
import axios from 'axios';


const userAuthStore = create((set)=>({
  userAuth: {
    name: undefined,
    loggedIn: false
  },
  
  setAuth: (userData) => set({userAuth: userData}),

  fetch: async () => {
    const request = await axios.get('http://localhost:4000/user/isloggedin',
      {withCredentials: true}
    );
    const data = request.data;
    set({ userAuth: data});
  }

}));

export default userAuthStore;