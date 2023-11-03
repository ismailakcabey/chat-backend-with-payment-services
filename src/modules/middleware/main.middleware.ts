import { NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request , Response } from "express";
var jwtSecret = require('jsonwebtoken');
export class MainMiddleware implements NestMiddleware{

    constructor(
        private readonly jwtService: JwtService
    ){}

    async use(req: any, res: any, next: (error?: any) => void) {
        
        const token = this.extractTokenFromHeader(req);
        if(token){
            try {
                var decoded = jwtSecret.verify(token, 'secret');
                let user = decoded?.user
                //user.isPayment = false
                if (user.isPayment) {
                  next()
              }
              else{
                  // Kullanıcı "isPayment" alanı "false" ise ve istek POST isteği değilse 403 Forbidden yanıtı gönderin
                  if (req.method == "POST" && (req?.params?.['0'] == "auth/login" || req?.params?.['0'] == "user" || req?.params?.['0'] == "payment/get")) {
                    next()
                  }
                  else{
                    return res.status(403).json({ message: "not payment" });
                  }
              }
          } catch (error) {
              console.log(error,'ERROR')
              return res.status(401).json({ message: "jwt expired" });
          }
        }
        else{
            next()
        }
        
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
      }

}