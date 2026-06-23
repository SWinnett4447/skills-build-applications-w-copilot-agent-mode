"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const workoutSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true, trim: true },
    category: { type: String, enum: ['cardio', 'strength', 'mobility', 'recovery'], default: 'cardio' },
    durationMinutes: { type: Number, required: true, min: 1 },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    equipment: [{ type: String, trim: true }],
    description: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
});
exports.Workout = mongoose_1.default.model('Workout', workoutSchema);
