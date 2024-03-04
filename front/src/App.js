import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Register from './pages/Register';
import SetAvatar from './components/SetAvatar';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import CheckList from './pages/Checklist';
import Lawyer from './pages/Lawyer';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/" element={<Chat />} />
        <Route path="/postlist" element={<PostList />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/checklist" element={<CheckList />} />
        <Route path="/lawyer" element={<Lawyer />} />
      </Routes>
    </BrowserRouter>
  );
}
