import React, {useState} from "react";


const Invite = (props) => {
    const [emails, setEmails] = useState([]);
    const [input, setInput] = useState("");
    const handleChange = (e) => {
        setInput(e.target.value);
    }
    const handleInvite = () =>{
        if (input !=="" && input !== null){
            setEmails([...emails, input]);
            setInput("");
        }
    }
    let invitedPeopleToRender = [];
    for (let i = 0; i<emails.length+1; i++){
        invitedPeopleToRender.push(
            <div>
                {emails[i]}
            </div>
        )
    }

    return (<div className="inviteArea">
        Zaproszeni: {invitedPeopleToRender}
        <input type="text" value={input} onChange={(e) => handleChange(e)}/>
        <button onClick={() => handleInvite()}>
            Zaproś
        </button>
    </div>)
}

export default Invite;