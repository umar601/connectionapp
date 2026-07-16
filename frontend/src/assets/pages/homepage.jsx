
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchPost,updatePost,addComment,deleteComment } from "../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";


export default function HomePage(){

    let {message,user,checking} = useAuth();
    let {postId} = useParams();


    // console.log(postId);

    let [post,setPost] = useState([]);
    let [error,setError] = useState("");
    let [comments,setComments] = useState("");
    let [commentFormData,setCommentFormData] = useState({content:""});
    let [index,setIndex] = useState(null);
    let [likeState,setLikeState] = useState(false);
    let [userId,setUserId] = useState("");


    let navigate = useNavigate();


    // console.log(user)
  
    
    useEffect(()=>{

        user._id?setUserId(user._id):setUserId(user.id)

        fetchPost().then((res)=>{
            
            setPost([...res.data.allPost])
        }).catch((err)=>{
            setError(err)
            
        })

    },[postId,user])



    
        function handleLikes(postId,likes,index){


            //handle one like at a time or dislike 

            if(!likeState){
                likes+=1;
                setLikeState(true)
            }else{
                likes-=1;
                setLikeState(false)

            }



        updatePost(postId,{likes:likes}).then((res)=>{
            navigate("/home")
            // console.log("update")
        }).catch((err)=>{
            setError(err);
        })

        
    }

    

    async function handleComments(index){

        setIndex(index);  //used to get post to add comment later

        setComments(post[index].comments);
        // console.log(post[index].comments);

    }




    async function handleCommentSubmit (event){

        event.preventDefault();

        let postId = post[index]._id;

        addComment(postId,commentFormData).then(()=>{

            fetchPost().then((res)=>{      //bacuse on reload it not show proper comment number untill we reload 
            setPost([...res.data.allPost])
            }).catch((err)=>{
            setError(err)
            })

            setComments("") //becuse of relod as we want to go back to home page
            setCommentFormData({content:""})

            console.log("added")
            // navigate("/home");

        }).catch((err)=>{

            console.log(err);

            setError(err);

        })
        


    }


    function  handlCommentChange(event){

        setCommentFormData({...commentFormData,[event.target.name]:event.target.value})

    }


    async function handleDeletComment(commentId){

        // console.log("called")


        await deleteComment(commentId,userId).then((res)=>{


            console.log("deleted success")
            setComments("") //back to main page
            fetchPost().then((res)=>{      //bacuse on reload it not show proper comment number untill we reload 
            setPost([...res.data.allPost])
            }).catch((err)=>{
            setError(err)
            })
            navigate("/home")

            

        }).catch((err)=>{

            console.log(err)

            setError(err);
        })

    }

    // console.log(user)

    



    // console.log(post)
    // for(let i = 0;i<post.length;i++){

    //     console.log(post[i].content)
    // }

    // console.log(post[0]?post[0].content:0)

    return(
        <>


    

        {message?<h1>{message}</h1>:null}

        <h1>homepage</h1>

        <button onClick={()=>{navigate("/home/profile")}}>connection</button>

        {comments?
        <div>

            {comments.length>0?comments.map((comment,index)=>{
                return(
                    <div key={index} style={{background:"red"}}>

                       

                        {userId==comment.owner._id?
                        <button onClick={()=>{handleDeletComment(comment._id)}}>delete</button>
                        :null}


                        <p>owner: {comment.owner.username}</p>
                        <p>comment: {comment.content}</p>
                        <p>posted At: {comment.createdAt.toString().slice(0, 10)}</p>
                    </div>
                )

            }):<h1>no comments yet</h1>}



            <form onSubmit={handleCommentSubmit}>

                <label>add comment </label>
                <input type="add comment ...." name="content" placeholder="add comment..." value={commentFormData.content} onChange={handlCommentChange} required/>
                <button>submit</button>
            </form>


        </div>
        :null}

        
        
        
        
        
        
        {!comments?<div>{post.length>0?
        post.map((pos,index)=>{
            // console.log(pos)
            return(

                <div key={pos._id} style={{backgroundColor:"pink"}}>


                    <p>owner :{pos.owner.username?pos.owner.username:"annonymus"}</p>

                    <p>{pos.content}</p>


                    <button onClick={()=>{handleLikes(pos._id,pos.likes,index)}}>

                        <Link to={`/post/${pos._id}`}>likes {pos.likes}</Link>

                    </button>

                   <button onClick={()=>{handleComments(index)}}><p>commnets :{pos.comments.length}</p></button>


                    <p>reposts :{pos.repots.length}</p>
                </div>
            )
        })

        :<h1>no post yet</h1>}


        <Link to={"/addpost"}>add your first post</Link>

        </div>:null}



        </>
    )
}