import React, { useState } from 'react'
import axios from 'axios';
const createPost = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [title, setTitle] = useState('');
    const handleOnSubmit =async (event) => {
        event.preventDefault();

        await axios.post('http://localhost:4000/posts', {
            title
        });
        setTitle('');
    }
    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input value={title} onChange={e=>setTitle(e.target.value)} className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default createPost;
