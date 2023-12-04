import express from "express";
import authRoutes from "./AuthRoutes";
import bookRoutes from "./BookRoutes";
// import userRoutes from "./UserRoutes";

const router = express.Router();
router.get("/", (req, res) => {
    res.send(router.stack);
});

router.use("/auth", authRoutes);
// router.use("/users", userRoutes);
router.use("/books", bookRoutes);

export default router;
