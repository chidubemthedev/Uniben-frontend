import React, { useState } from 'react';
import 'stream-chat-react/dist/css/index.css'
import './App.css';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelContainer, ChannelListContainer, Auth } from './components';

const cookies = new Cookies();

const apiKey = 'w87tbht572rw';

const authToken = cookies.get('token');

const client = StreamChat.getInstance(apiKey);

if (authToken) {
  client.connectUser(
    {
      id: cookies.get('userId'),
      name: cookies.get('username'),
      fullName: cookies.get('fullName'),
      image: cookies.get('avatarURL'),
      hashedPassword: cookies.get('hashedPassword'),
      phoneNumber: cookies.get('phoneNumber'),
    },
    authToken
  );
}

const customStyles = {
  '--primary-color': 'purple',
  '--md-font': '0.7rem',
  '--xs-m': '0.7rem',
  '--xs-p': '0.7rem',
};

function App() {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!authToken) {
    return <Auth />;
  }

  return (
    <>
      <div className="app__wrapper">
        <Chat client={client} customStyles={customStyles}>
          <ChannelListContainer
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setIsEditing={setIsEditing}
            setCreateType={setCreateType}
          />
          <ChannelContainer
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
            createType={createType}
          />
        </Chat>
      </div>
    </>
  );
}

export default App;
