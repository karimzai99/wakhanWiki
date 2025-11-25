// user is logged in
const require_login = (req, res, next) => {
  if (!req.session.logged_in_user) {
    // if not logged in return 'log in is requires'
    return res.redirect("/user/log_in?msg=login_required");
  }
  // if logged in continou
  next();
};

// user is logged in and is writer to do the changes
const require_writer = (req, res, next) => {
  if (!req.session.logged_in_user) {
    // if user is not logged in return 'log in requred'
    return res.redirect("/user/log_in?msg=login_required");
  }

  if (req.session.logged_in_role !== "writer") {
    // if role is not writer return access denied
    return res.status(403).send("Access denied: writers only");
  }

  next();
};

module.exports = {
  require_login,
  require_writer,
};
