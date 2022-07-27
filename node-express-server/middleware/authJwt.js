const jwt = require('jsonwebtoken');

autenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, 'klmtprtus', (err, payload) => {
      if (err) return res.sendStatus(403)
      req.owner = payload
      next()
    })
    
}

const authJwt = {
  autenticateToken: autenticateToken,
};
module.exports = authJwt;