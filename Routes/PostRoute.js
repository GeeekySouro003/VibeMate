import express from 'express';
const router = express.Router();

router.get('/',async (req, res) => {
    res.send("Post router working successfully!");
})
export default router;