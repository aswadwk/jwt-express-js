import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll(
            {
                attributes: {
                    exclude: ["password"]
                }
            }
        );
        res.json(users);
    } catch (e) {
        console.log(e)
    }
}

export const registerUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) return res.status(400).json({ msg: "Password tidak sama!" });

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name,
            email,
            password: hashPassword
        });

        res.json({ msg: "User berhasil ditambahkan!" });
    } catch (e) {
        res.status(400).json({ msg: "User gagal ditambahkan!" });
    }

}

export const login = async (req, res) => {
    try {

        const user = await Users.findOne({
            where: {
                email: req.body.email
            }
        });
        // res.json({ user });
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) return res.status(400).json({ msg: "Password salah!" });

        const accessToken = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: "20s" });
        // res.json({ accessToken });
        const refreshToken = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email
        }, process.env.JWT_REFREST_TOKEN, { expiresIn: "1d" });
        // res.json({ accessToken, refreshToken });
        await Users.update({ refresh_token: refreshToken }, {
            where: {
                id: user.id
            }
        });
        // res.json({})
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            path: "/"
        });

        res.json({
            accessToken,
            // refreshToken
        });

    } catch (e) {
        res.status(400).json({ msg: e });
    }
}

export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(400).json({ msg: "Token tidak ditemukan!" });

    const user = await Users.findOne({
        where: {
            refresh_token: refreshToken
        }
    });
    if (!user) return res.status(400).json({ msg: "Token tidak ditemukan!" });

    await Users.update({ refresh_token: null }, {
        where: {
            id: user.id
        }
    });

    res.clearCookie('refreshToken');
    res.json({ msg: "User berhasil logout!" });

}