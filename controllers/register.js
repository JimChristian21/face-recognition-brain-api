const handleRegister = (req, res, db, bcrypt) => {

    const { name, email, password} = req.body;

    if (!email || !name || !password) {

        return res.status(400).json('Invalid inputs');
    }

    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        
        trx.insert({
            hash: hash,
            email: email
        }, 'email')
        .into('login')
        .then(userEmail => {
            
            return db.insert([
                {
                    name,
                    email: userEmail[0].email,
                    joined: new Date()
                }
            ], '*').into('users')
            .then(user => {
        
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }).catch(err => {

        res.status(400).json('Unable to register!');
    });
}

module.exports = {
    handleRegister
};