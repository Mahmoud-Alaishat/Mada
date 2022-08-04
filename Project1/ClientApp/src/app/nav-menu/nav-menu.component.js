"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavMenuComponent = void 0;
var core_1 = require("@angular/core");
var NavMenuComponent = /** @class */ (function () {
    function NavMenuComponent(router, jwtHelper) {
        var _this = this;
        this.router = router;
        this.jwtHelper = jwtHelper;
        this.isExpanded = false;
        this.IsAdmin = false;
        this.isUserAuthenticated = function () {
            var token = localStorage.getItem("token");
            if (token && !_this.jwtHelper.isTokenExpired(token)) {
                _this.result = _this.jwtHelper.decodeToken(token);
                _this.email = _this.result["email"];
                _this.role = _this.result["role"];
                return true;
            }
            return false;
        };
        this.isAdmin = function () {
            if (_this.role == "Admin") {
                _this.IsAdmin = true;
                return _this.IsAdmin;
            }
            _this.IsAdmin = false;
            return _this.IsAdmin;
        };
        this.logOut = function () {
            localStorage.removeItem("token");
            _this.router.navigate(["/"]);
        };
    }
    NavMenuComponent.prototype.collapse = function () {
        this.isExpanded = false;
    };
    NavMenuComponent.prototype.toggle = function () {
        this.isExpanded = !this.isExpanded;
    };
    NavMenuComponent = __decorate([
        (0, core_1.Component)({
            selector: 'app-nav-menu',
            templateUrl: './nav-menu.component.html',
            styleUrls: ['./nav-menu.component.css']
        })
    ], NavMenuComponent);
    return NavMenuComponent;
}());
exports.NavMenuComponent = NavMenuComponent;
//# sourceMappingURL=nav-menu.component.js.map