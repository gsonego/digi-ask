import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import { Aside } from '../components/Aside';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/auth.scss';

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === ''){
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    })

    history.push(`/admin/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth">
      <Aside></Aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Digi Ask" />
          <h2>Create a new room</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text" 
              placeholder="Room name"
              onChange={ event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Create room
            </Button>
          </form>
          <p>
            Do you want to join an existing room ? <Link to="/">click here</Link>
          </p>
        </div>
      </main>
    </div>
  )
}