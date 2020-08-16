class Utils {
    static requireRole(role) {
        return (req, res, next) => {
            // if (this.authenticate(req, res, next)) {
            if (req.authenticated) {
                switch (role) {
                    case 1:
                        if (req.user.role === role) {
                            return next();
                        }
                        break;
                    case 2:
                        if (req.user.role === role) {
                            return next();
                        }
                        break;
                    case 3:
                        if (req.user.role === role) {
                            return next();
                        }
                        break;
                    default:
                        return res.status(403).send("403 Forbidden");
                }
                return res.status(403).send("403 Forbidden");
            }
            return res.status(403).send("403 Forbidden");
        };
    }
}
module.exports = Utils;
