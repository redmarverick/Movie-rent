const countComments = (container) => {
    const counter = Array.from(container.getElementsByClassName('comment-container'));
    return counter.length;
  };
  export default countComments;