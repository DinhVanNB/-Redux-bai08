import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import * as types from '../actions/action';

export default function Header (){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{dispatch({
      type: types.FETCH_POST
    })},[]);
    
    return(
        <header 
        style={{backgroundColor:'purple', height:'10vh'}} 
        className=' text-white d-flex justify-content-between' >
        <h1   
            onClick={()=>navigate('/')}
            role='button'
            className='display-4 fw-semibold align-self-center'>
             Redux Blog
           </h1>
        <div className='d-flex mt-3'>
          <h3   
                onClick={()=>navigate('/')}
                className='fw-lighter' 
                role='button'>Home</h3>
          <h3 
            onClick={()=>navigate('/Add')}
              className='mx-5 fw-lighter' 
              role='button'>New Post</h3>
        </div>
         </header>
    )
}