import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router';

import { database } from '../services/firebase'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/Button';
import { Aside } from '../components/Aside';
import { Logo } from '../components/Logo';

import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom(){
    if(!user){
      await signInWithGoogle();
    }

    history.push('/rooms/new');  
  }

  async function handleJoinRoom(event: FormEvent){
    event.preventDefault();

    if(roomCode.trim() === ''){
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()){
      alert("Room does not exists.");
      return;
    }

    if (roomRef.val().endedAt){
      alert("Room already closed.");
      return;
    }  

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <Aside></Aside>
      <main>
        <div className="main-content">
          <Logo></Logo>
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Create your room with Google
          </button>
          <div className="separator">or enter an existing room</div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text" 
              placeholder="Type room code"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Enter room
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}