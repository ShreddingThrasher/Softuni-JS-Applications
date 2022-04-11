"use strict";
/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installBrowsers = exports.runServer = exports.printProtocol = exports.printApiJson = void 0;
/* eslint-disable no-console */
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dispatcher_1 = require("../dispatchers/dispatcher");
const playwrightDispatcher_1 = require("../dispatchers/playwrightDispatcher");
const installer_1 = require("../install/installer");
const transport_1 = require("../protocol/transport");
const playwright_1 = require("../server/playwright");
const processLauncher_1 = require("../server/processLauncher");
function printApiJson() {
    console.log(JSON.stringify(require('../../api.json')));
}
exports.printApiJson = printApiJson;
function printProtocol() {
    console.log(fs_1.default.readFileSync(path_1.default.join(__dirname, '..', '..', 'protocol.yml'), 'utf8'));
}
exports.printProtocol = printProtocol;
function runServer() {
    const dispatcherConnection = new dispatcher_1.DispatcherConnection();
    const transport = new transport_1.Transport(process.stdout, process.stdin);
    transport.onmessage = message => dispatcherConnection.dispatch(JSON.parse(message));
    dispatcherConnection.onmessage = message => transport.send(JSON.stringify(message));
    transport.onclose = async () => {
        // Drop any messages during shutdown on the floor.
        dispatcherConnection.onmessage = () => { };
        // Force exit after 30 seconds.
        setTimeout(() => process.exit(0), 30000);
        // Meanwhile, try to gracefully close all browsers.
        await processLauncher_1.gracefullyCloseAll();
        process.exit(0);
    };
    const playwright = playwright_1.createPlaywright();
    new playwrightDispatcher_1.PlaywrightDispatcher(dispatcherConnection.rootDispatcher(), playwright);
}
exports.runServer = runServer;
async function installBrowsers(browserNames) {
    await installer_1.installBrowsersWithProgressBar(browserNames);
}
exports.installBrowsers = installBrowsers;
//# sourceMappingURL=driver.js.map