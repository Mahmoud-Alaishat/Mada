"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
var core_1 = require("@angular/core");
var AuthGuard = /** @class */ (function () {
    function AuthGuard(router, jwtHelper) {
        this.router = router;
        this.jwtHelper = jwtHelper;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var token = localStorage.getItem("token");
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            console.log(this.jwtHelper.decodeToken(token));
            return true;
        }
        this.router.navigate(["login"]);
        return false;
    };
    AuthGuard = __decorate([
        (0, core_1.Injectable)({
            providedIn: 'root'
        })
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map