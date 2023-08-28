const getProfile = (req, res, db) => {

    const { id } = req.params;

    db.select('*')
        .from('users')
        .where({
            id: id
        }).then(user => {

            if (user.length) {

                res.json(user[0]);
            } else {

                res.json('User doesn\'t exist');
            }
        }).catch(err => {

            res.json('Error getting user');
        });
}

module.exports = {
    getProfile
};