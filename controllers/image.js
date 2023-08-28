const incrementEntries = (req, res, db) => {

    const { id } = req.body;
    
    db.select('entries')
        .from('users')
        .where({id})
        .then(user => {

            if (user.length) {

                db('users')
                    .where('id', '=', id)
                    .increment('entries', 1)
                    .then(entries => {
                        
                        res.json(entries);
                    })
                    .catch(err => {
                        res.status(400).json('Error getting entries');
                    });
            } else {

                res.json('User doesn\'t exist');
            }

        }).catch(err => {

            res.status(400).json('Error getting user');
        });
}

module.exports = {
    incrementEntries
};