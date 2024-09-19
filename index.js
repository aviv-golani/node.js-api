
const express = require('express');
const app = express();
app.use(express.json());

const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'alice' }

]
app.get('/users', (req, res) => {
    return res.json(users);
});
app.post('/add-user',(req,res)=>{

    const {name} = req.body;
    if(!name){
        return res.status(400).json({error:'name is required'});
    }
    const userExists = users.find(user => user.name.toLowerCase() === name.toLowerCase());
    if (userExists) {
        return res.status(400).json({ error: 'User with this name already exists' });
    }
    const newUser={
        id: users.length+1,
        name,
    }
    users.push(newUser);
    return res.status(201).json(users);
});

app.listen(3000, () => {
    console.log('server is running on http://localhost:3000');
});