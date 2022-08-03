"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, http, authService, baseUrl, jwtHelper) {
        var _this = this;
        this.router = router;
        this.http = http;
        this.authService = authService;
        this.jwtHelper = jwtHelper;
        this.credentials = { email: '', passwordhash: '' };
        this.IsAdmin = false;
        this.emailFormControl = new forms_1.FormControl('', [forms_1.Validators.email, forms_1.Validators.required]);
        this.passFormControl = new forms_1.FormControl('', forms_1.Validators.minLength(6));
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
    }
    LoginComponent.prototype.submit = function () {
        this.authService.login(this.emailFormControl.value, this.passFormControl.value);
    };
    LoginComponent.prototype.goToRegister = function () {
        this.router.navigate(['register']);
    };
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.credentials.email = this.emailFormControl.value;
        this.credentials.passwordhash = this.passFormControl.value;
        this.http.post("https://localhost:44328/api/Auth/Login", this.credentials, {
            headers: new http_1.HttpHeaders({ "Content-Type": "application/json" })
        })
            .subscribe({
            next: function (response) {
                var token = response.token;
                localStorage.setItem("token", token);
                _this.invalidLogin = false;
                _this.isUserAuthenticated();
                _this.isAdmin();
                if (_this.IsAdmin) {
                    _this.router.navigate(["admin"]);
                }
                else {
                    _this.router.navigate(["user/feed"]);
                }
            },
            error: function (err) { return _this.invalidLogin = true; }
        });
    };
    LoginComponent = __decorate([
        (0, core_1.Component)({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __param(3, (0, core_1.Inject)('BASE_URL'))
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map