import React, {useState} from 'react';
import { useChatContext } from 'stream-chat-react';

import { UserList } from './';
import { CloseCreateChannel } from '../assets';

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
  const handleChange = (e) => {
    e.preventDefault();
    setChannelName(e.target.value);
  };
  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input
        value={channelName}
        onChange={handleChange}
        placeholder="channel-name"
        type="text"
      />
      <p>Add Members</p>
    </div>
  );
};
const CreateChannel = ({ createType, setIsCreating }) => {
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);
  const [channelName, setChannelName] = useState('');

  const createChannel = async (e) => {
    e.preventDefault()
    try {
      console.log("Type below");
      console.log(createType);
      const newChannel = await client.channel(createType, channelName, {
        name: channelName,
        members: selectedUsers,
      });
      console.log(newChannel);
      await newChannel.watch();
      setChannelName('');
      setIsCreating(false);
      setSelectedUsers([client.userID]);
      setActiveChannel(newChannel);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='create-channel-container'>
      <div className='create-channel__header'>
        <p>{createType === 'team' ? 'Create A New Channel' : 'Send a Direct Message'}</p>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>
      {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}
      <UserList setSelectedUsers={setSelectedUsers}/>
      <div className='create-channel__button-wrapper' onClick={createChannel}>
        <p>{createType === 'team' ? 'Channel' : 'Message'}</p>
      </div>
    </div>
  )
}

export default CreateChannel