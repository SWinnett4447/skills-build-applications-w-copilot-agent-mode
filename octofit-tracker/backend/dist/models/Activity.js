"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const activitySchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
        type: String,
        required: true,
        enum: ['running', 'walking', 'strength', 'cycling', 'yoga'],
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    intensity: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    points: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});
exports.Activity = mongoose_1.default.model('Activity', activitySchema);
