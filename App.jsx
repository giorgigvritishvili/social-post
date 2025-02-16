import { useEffect, useState } from 'react'
import './App.css'


export default function App() {
 const [user, setuser] = useState(null);
 const [users , setusers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const [post, setpost] = useState(JSON.parse(localStorage.getItem('post')) || []);
  const [title, settitle] = useState('')
  const [body, setbody] = useState('');
  const [isPubilc , setispubilc] = useState(true);
  const [filter, setfilter] = useState('All');

  useEffect(() => {
    
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('post', JSON.stringify(post));
  }, [users, post]);

  const register = (username, password) => {
    if (users.some((u) => u.username === username)) {
      alert("usename already taken")
      return;
    }
    const newuser = { username, password};
    setusers([...users, newuser]);
    setuser(newuser);
  }

  const login = (username, password) => {
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      setuser(user);
    } else {
      alert("invalid username or password");
    }
  }

  const logout = () => {
    setuser(null);
  }


  const addpost = () =>{
    if (!title || !body) return ;
    const newPost = {title, body, isPubilc, author: user.username}
    setpost([...post, newPost]);
    settitle('');
    setbody("");
  }
  const deletepost = post.filter((post) => {
    if (filter === 'public') return post.isPubilc;
    if (filter === 'private') return !post.isPubilc && post.author === user?.username;
    return post.isPubilc || post.author === user?.username;
  })
  return (
    <div className='container'>
      {user ? (
      <div>
        <h1>Welcome, {user.username}</h1>
        <button className='btn' onClick={logout}>Logout</button>
        <h2>Your Posts</h2>
        <input className='q' type="text" placeholder="Title" value={title} onChange={(e) => settitle(e.target.value)} />
        <textarea placeholder='Body' value={body} onChange={(e) => setbody(e.target.value)} />
        <label>
          <input className='q' type="checkbox" checked={isPubilc} onChange={() => setispubilc(!isPubilc)} /> 
          
        </label>
        <button className='btn' onClick={addpost}>Add Post</button>

        <select onChange={(e) => setfilter(e.target.value)}>
          <option value="All">All</option>
          <option value="public">Public</option>
          <option value="privite">Privite</option>
        </select>
        <h3>post</h3>
        {deletepost.map((post, index) => (
        <div key={index}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <p>Posted by {post.author}</p>
          <p>Public: {post.isPubilc ? 'Yes' : 'No'}</p>
           </div>
        
        ))}
         </div>

        ) :(
        <div>
          <h1>Welcome to the blog</h1>
          <input className='q'  id="username" placeholder="username" />
          <input className='q' id="password" placeholder="password" />
          <button className='btn'  onClick={() => login(document.getElementById("username").value, document.getElementById("password").value)}>Login</button>
          <button className='btn'  onClick={() => register(document.getElementById("username").value, document.getElementById("password").value)}>Register</button>
        </div>
        
       )}

    </div>
   
  
  );

};

