import * as  types  from '../actions/action';

const initialState = {
    posts: [],
    interact:[]
}

const rootReducer = (state= initialState, action) =>{
    switch(action.type){
        case types.FETCH_POST_SUCCESS:
            return {...state, posts:action.payload}
        case types.FETCH_INTERACT_SUCCESS:
            return {...state, interact:action.payload}
        case types.DELETE_POST_SUCCESS:
            let arr=[...(state.posts)].filter(post=>+post.id!==+action.payload)
            return {...state, 
                posts: arr}
        case types.DELETE_INTERACT_SUCCESS:
            let interArr=[...(state.interact)].filter(inte=>+inte.id!==+action.payload)
            return {...state, 
                interact: interArr}
        case types.ADD_POST_SUCCESS:
           let addPost =[...state.posts];
           addPost.push(action.payload);
            return {...state, posts:addPost}
        case types.ADD_INTERACT_SUCCESS:
            let addInter =[...state.interact];
            addInter.push(action.payload);
                return {...state, interact:addInter}
        case types.EDIT_POST_SUCCESS:
            return {...state, posts: [...state.posts].map(post=>{
                if(+post.id===+action.payload.id){
                    return post=action.payload
                }
                return post
            })};
        case types.EDIT_INTERACT_SUCCESS:
            return {...state, interact: [...state.interact].map(inter=>{
                if(+inter.id===+action.payload.id){
                    return inter=action.payload
                }
                return inter
            })}
        default:
            return state
    }
} 
export default rootReducer;