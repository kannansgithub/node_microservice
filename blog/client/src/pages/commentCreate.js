/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState} from 'react'
import axios from 'axios';
const commendCreate = ({ postId }) => {
    const [content, setContent] = useState('');
    const handleOnSubmit = async (event) => {
        event.preventDefault();

        await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
            content
        });
        setContent('');
    }
    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label className="form-label">New commend</label>
                    <input value={content} onChange={e => setContent(e.target.value)} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default commendCreate
