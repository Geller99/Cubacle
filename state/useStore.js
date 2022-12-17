import React, {useState} from 'react';

export const useStore = () => {
    const [user, setUser] = useState({});
    const [signer, setSigner] = useState(null);
  
    return { user, setUser, signer, setSigner };
  }