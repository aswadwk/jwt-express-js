import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(400).json({ msg: "Token tidak ditemukan!" });

        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken
            }
        });
        if (!user) return res.status(400).json({ msg: "Token tidak ditemukan!" });
        jwt.verify(refreshToken, process.env.JWT_REFREST_TOKEN, (err, decoded) => {
            if (err) return res.status(400).json({ msg: "Token tidak ditemukan!" });
            const accessToken = jwt.sign({
                id: user.id,
                name: user.name,
                email: user.email
            }, process.env.JWT_SECRET, { expiresIn: "20s" });
            res.json({ accessToken });
        });
    } catch (e) {
        console.log(e);
    }
}