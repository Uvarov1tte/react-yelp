module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}
// returns a new function that has func executed and then catch any errors, then passes into next