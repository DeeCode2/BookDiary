import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../config/AuthContext';
import { auth } from "../../config/Firebase.jsx";
import { doc, setDoc, getFirestore } from "firebase/firestore";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const { createUser } = UserAuth();
    const navigate = useNavigate()

    //create a new user and a corresponding profile
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      try {
        await createUser(email, password);
        const userUid = auth.currentUser.uid;
        const db = getFirestore();
        //console.log(userUid)

        const docRef = await setDoc(doc(db, userUid, "library"), {
            library: []
        });
        console.log("library doc created ");

        navigate('/library')

        } catch (e) {
        setError(e.message);
        console.log(e.message);
      }
    };

    return (
      <main>
          <form onSubmit={handleSubmit}>
          <h1>Create your account</h1>

            <div className="form-group">
              <label for="email">Email Address</label><br/>
              <input onChange={(e) => setEmail(e.target.value)}type='email' id="email"/>
            </div>

            <div className="form-group">
              <label for="password">Password</label><br/>
              <input onChange={(e) => setPassword(e.target.value)} type='password' id="password"/>
            </div>

            <button className="btn yellow-btn">Sign Up</button>

            <p>Already have an account?{' '}<Link to='/'>Sign in.</Link></p>

          </form>
      </main>
    );
  };

export default SignUp;