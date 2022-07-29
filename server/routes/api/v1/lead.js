app.use("/auth", auth);
app.use("/user", passport.authenticate("jwt", { session: false }), user);
