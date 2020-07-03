import React from 'react';

export const ProfileContext = React.createContext({
    user: null,
    setUser: () => {}
    // user: null,
    // changeProfile: (newName) => {
    //     console.log('original changeProfile', newName);
    //     this.user = newName;
    // },
});