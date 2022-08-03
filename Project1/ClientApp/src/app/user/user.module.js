"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var feed_component_1 = require("./feed/feed.component");
var router_1 = require("@angular/router");
var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        (0, core_1.NgModule)({
            declarations: [feed_component_1.FeedComponent],
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild([
                    { path: "user/feed", component: feed_component_1.FeedComponent },
                ])
            ],
            exports: [feed_component_1.FeedComponent]
        })
    ], UserModule);
    return UserModule;
}());
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map