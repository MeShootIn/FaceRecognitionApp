import React from "react";
import { Container } from 'react-bootstrap';

class Description extends React.Component {
    render() {
        return (
            <div class="w-50 text-center border rounded shadow p-3 mb-5 bg-white rounded text-info" style={{fontSize: 22}}>
                    <p>Have you ever imagined yourself as a charecter in a popular series? 
                        What star you could easily replace on the set? Find out now!
                        Just upload image of your face and we will show you a character that you looks like.
                    </p>
            </div>  
        );
    }
}

export default Description;