export const goHome = (req, res) => {
    res.redirect('/home');
}

export const getHome = (req, res) => {
    res.render(process.cwd() + '/src/views/home', { nombre: req.session.email });
}