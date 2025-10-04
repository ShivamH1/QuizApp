"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const PORT = process.env.PORT || 8080;
// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});
// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
server_1.app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
