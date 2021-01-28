/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
const CommentList = ({ comments}) => {
    const renderedComments = Object.values(comments).map(comment => {
        let content;
        if (comment.status === 'Approved') {
            content = comment.content;
        }

        if (comment.status === 'Pending') {
            content = 'This comment is waiting ro moderation';
        }

        if (comment.status === 'Rejected') {
            content = 'This comment has been rejected';
        }
        return (
            <li key={comment.id}>{content}</li>
        );
    });
    return (
        <ul>
            {renderedComments}
        </ul>
    )
}

export default CommentList
