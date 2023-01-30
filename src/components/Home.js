import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import * as types from '../actions/action'; 

export default function Home(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {posts,interact} =useSelector(state=>state);
    const [increaInteract, setIncreaseInteract] = useState({});
    if(posts.length>0){
        posts.sort((a,b)=>
        Date.parse((a.timeUpload).substring(0,19))>
        Date.parse((b.timeUpload).substring(0,19))? -1:1)
    }
    
    // new Date().toLocaleDateString(), // 8/19/2020
    // new Date().toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', weekday:"long", hour: '2-digit', hour12: false, minute:'2-digit', second:'2-digit'}),
    // new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}), // 08/19/2020 (month and day with two digits)
    // new Date().toLocaleDateString('en-ZA'), // 2020/08/19 (year/month/day) notice the different locale
    // new Date().toLocaleDateString('en-CA'), // 2020-08-19 (year-month-day) notice the different locale
    // new Date().toLocaleString("en-US", {timeZone: "America/New_York"}), // 8/19/2020, 9:29:51 AM. (date and time in a specific timezone)
    // new Date().toLocaleString("en-US", {hour: '2-digit', hour12: false, timeZone: "America/New_York"}),  // 09 (just the hour)
 

// console.log(testCases)

    const xuLyTime =(timePost)=>{
        let checkTime = (Date.parse(Date().toLocaleString())-
        Date.parse(timePost.substring(0,19)))/3600000;
        if(checkTime>24){
            return timePost.substring(0,10)
        }
        else if(checkTime>1){
            return (`${parseInt(checkTime)} hours ago`)
        }
        else if(checkTime>0.03) {
            return (`${parseInt(checkTime*100-2)} minute ago`)
        }  
        else  {
            return (`vừa mới`)
        }
    }
    let sortInter=[];
   if(posts.length>0){
    posts.map(post=>{
        interact.map(inter=>{
            if(post.id===inter.id){
                sortInter.push(inter)
            }
            return false
        })
        return false;   
    })
   }
   
   const increaseInteract =({target})=>{
        let index = +target.attributes.inter.value;
        let name = target.attributes.name.value;
        let value = + target.attributes.value.value;
        dispatch({
            type: types.EDIT_INTERACT,
            payload: {...sortInter[index], [name]: value+1}
        })
   }
    return(
        <div className="container mt-3">
           {
            posts.map((post,index)=>(
                <div 
                    key={post.id}
                className="mx-auto 
                w-75 border 
                border-secondary rounded mt-3 p-3">
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <u role='button' 
                    onClick={
                        ()=>navigate(`/Edit/${post.id}`,
                        {state:{...post}})}
                    >Edit Post</u>
                    <small role='button'> 
                        &nbsp;by {post.author}
                        &nbsp;&nbsp;
                        <i>{xuLyTime(post.timeUpload)}</i>
                    </small>
                    
                    <div className='mt-2' >
                        <span 
                            value={sortInter[index].thumbsUp}
                            inter={index}
                            name="thumbsUp" 
                            onClick ={increaseInteract}
                            role='button'>👍</span>   
                        &nbsp;
                        { posts.length>0?
                        sortInter[index].thumbsUp
                        :0}
                        &nbsp;
                        <span 
                            value={sortInter[index].wow}
                            inter={index}
                            name="wow" 
                            onClick ={increaseInteract}
                            role='button'>
                        😮
                        </span>
                        &nbsp;
                        {posts.length>0?sortInter[index].wow:0}
                        &nbsp;
                        <span
                            value={sortInter[index].heart}
                            inter={index}
                            name="heart" 
                            onClick ={increaseInteract}
                            role='button'>❤️</span>
                        &nbsp;{posts.length>0?sortInter[index].heart:0}
                        &nbsp;
                        <span
                            value={sortInter[index].rocket} 
                            inter={index}
                            name="rocket" 
                            onClick ={increaseInteract}
                        role='button'>🚀</span>
                        &nbsp;{posts.length>0?sortInter[index].rocket:0}
                        &nbsp;
                        <span 
                            value={sortInter[index].coffee} 
                            inter={index}
                            name="coffee" 
                            onClick ={increaseInteract}
                            role='button'>☕</span>
                        &nbsp;{posts.length>0?sortInter[index].coffee:0}
                    </div>
                </div>
            ))
           } 
        </div>
    )
}