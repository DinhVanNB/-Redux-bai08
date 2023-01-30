import {useNavigate, useParams, useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as  types  from '../actions/action';

export default function Add (){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {postId} = useParams();
    const {state} = useLocation();
    const {posts} = useSelector(state=>state);
    const authors=posts.map(post=>post.author);
    const [post, setPost] =useState({}); 

    useEffect(()=>{
        if(postId){
            setPost(state)
        }
    },[])

    const onSubmit=(e)=>{
        e.preventDefault();
        let setTime = new Date();
       post.timeUpload = `${setTime.getUTCFullYear()}-${setTime.getMonth()+1<10? '0'+(setTime.getMonth()+1):setTime.getMonth()+1}-${setTime.getDate()<10? '0' + setTime.getDate():setTime.getDate() }T${setTime.getHours()<10? '0'+setTime.getHours():setTime.getHours()}:${setTime.getMinutes()<10? '0'+setTime.getMinutes():setTime.getMinutes()}:${setTime.getSeconds()<10? '0'+setTime.getSeconds():setTime.getSeconds()}`;
        if(postId){
            let isTrue = post.author!==state.author|| post.title !== state.title || post.content !== state.content; 
            if(isTrue){
                dispatch({type: types.EDIT_POST, payload: post});
                alert('Sửa thành công!!!')
                navigate('/');
            }
            else{
                window.confirm("Bạn chưa chỉnh sửa gì!!!")
            }
        }
        else if(post.author){
            dispatch({type: types.ADD_POST, payload: post})
            alert('Thêm thành công!!!')
            navigate('/');
        }
        else{
            window.confirm("Bạn chưa chọn tác giả!!!")
        }   
    }



    const onChange=({target})=>{
        setPost({...post,[target.name]:target.value})
    }
    


    const onDelete=()=>{
      if(  window.confirm(`Bạn có chắc chắn muốn xóa " ${state.title} "`)){
        dispatch({
            type: types.DELETE_POST,
            payload: postId
        });
        alert('Xóa thành công!!!');
        navigate('/');
      }
    }
   
    return(
        <div className="container mt-3">
            <div 
            className="mx-auto 
            w-75  mt-3 p-3">
                <h3> {postId? 'Edit Post': 'Add New Post'}</h3>
                <form
                    className='mt-3 p-1' 
                    onSubmit={onSubmit}>
                    <label className='fw-semibold'>Post Title:</label>
                    <br />
                    <input 
                        className='w-75 border rounded'
                        defaultValue={postId? post.title:''}
                        onChange={onChange}
                        required
                        name='title'
                        type="text" />
                     <br/>   
                     <br />
                    
                    <label className='fw-semibold'>Author:</label>
                    <br />
                    <select 
                        onChange={onChange}
                        name="author"
                        className='w-75 rounded border'
                        defaultValue={postId? post.author:''} 
                         >
                       {
                        [...authors].map((author, index)=>
        
                        <option 
                                value={author}
                                key={index}
                                >{author}
                        </option>)
                        }
                    </select>
                    <br/>
                    <br/>
                    <label className='fw-semibold'>Content:</label>
                    <br />
                    <textarea 
                        style={{height:'50vh'}}
                        defaultValue={postId? post.content:''}
                        className='w-75 border rounded'
                        onChange={onChange}
                        name="content"
                    />
                    <button 
                        style={{backgroundColor:'#ccc'}}
                        type='submit'
                        className='mt-3 btn w-75'>
                        Save Post
                    </button>
                    {
                        postId?  <button 
                        onClick={onDelete}
                        type='reset'
                        className='mt-3 btn w-75 btn-danger'>
                        Delete Post
                    </button>: <></>
                    }
                   
                  
                </form>
                
                
                
            
            </div>
        
     </div>
    )
}