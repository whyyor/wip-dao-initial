import EthName from './EthName'

const Post = function ({ data }) {
  let desc = {__html: data.description}

  // TODO
  const canComment = false

  return (
    <section>
      <div className="work">
        <img src={data.image} />
      </div>
      
      <div className="info">
        <div className="sticky">
          <div className="author">
            <EthName address={data.author} intro="Posted by " />
          </div>

          <div dangerouslySetInnerHTML={desc}></div> 
        </div>       
      </div>  

      <div className="comments">
        <span>{data.comments} comments</span>
        <a href="#">{canComment ? "Add comment" : "You need to own 50 $WIP to view and post comments" }</a>
      </div>        
    </section>
  )
}

export default Post;