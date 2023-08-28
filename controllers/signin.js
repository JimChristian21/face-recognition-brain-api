const handleSignin = (req, res, db, bcrypt) => {

    const { email, password } = req.body; 
        
    db.select('email', 'hash')
        .from('login')
        .where('email', '=', email)
        .then(data => {
    
            const isValid =  bcrypt.compareSync(password, data[0].hash);
                        
            if (isValid) {
            
                db.select('*')
                    .from('users')
                    .where('email', '=', data[0].email)
                    .then(users => {
            
                        res.json(users[0]);
                    })
                    .catch(err => {
            
                        res.status(400).json('Unable to get user!');
                    });
            } else {
            
                res.status(400).json('Invalid email or password!');
            }
        })
        .catch(err => {
    
            res.status(400).json('Unable to login!');
        });
}

module.exports = {
    handleSignin
};