import { cronJobs } from "convex/server";
import { api, internal } from "./_generated/api";

const crons = cronJobs();

crons.daily("resets coin", { hourUTC: 10, minuteUTC: 0 }, api.user.resetCoin);

export default crons;
