
async function userSignIn( req, res, next ) {
    res.locals = {
        view: 'signin',
        title: "Sign In",
        header: false
    }

    next();
}

module.exports = userSignIn;
