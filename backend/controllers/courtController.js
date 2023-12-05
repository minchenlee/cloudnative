import { defaultCourtModel as courtModel } from '../models/courtModel.js';
import { Prisma } from '@prisma/client';


const courtController = {
    createCourt: async (req, res) => {
        const { status, stadiumId } = req.body;

        // Validations
        const statuses = ["OPEN", "CLOSED", "MAINTENANCE"];
        if (!statuses.includes(status)) return res.status(400).json({ msg: "Invalid status." });

        // Create court
        try {
            const court = await courtModel.createCourt(status, stadiumId);
            res.status(200).json({
                msg: "Court created successfully.",
                data: {
                    court
                }
            });
        } catch (error) {
            res.status(500).json({ msg: "Server error occurred." });
        }
    },
    getAllCourts: async (req, res) => {
        try {
            const courts = await courtModel.getAllCourts();
            res.status(200).json({
                msg: "All courts retrieved successfully.",
                data: {
                    courts
                }
            });
        } catch (error) {
            res.status(500).json({ msg: "Server error occurred." });
        }
    },
    getCourtById: async (req, res) => {
        const { id } = req.params;
        try {
            const court = await courtModel.getCourtById(id);
            if (court) {
                res.status(200).json({
                    msg: "Court retrieved successfully.",
                    data: {
                        court
                    }
                });
            } else {
                res.status(404).json({ msg: "Court not found." });
            }
        } catch (error) {
            res.status(500).json({ msg: "Server error occurred." });
        }
    },
    updateCourtById: async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;
    
        // Validations
        const statuses = ["OPEN", "CLOSED", "MAINTENANCE"];
        if (!statuses.includes(status)) return res.status(400).json({ msg: "Invalid status." });
    
        try {
            const court = await courtModel.updateCourtById(id, status);
            res.status(200).json({
                msg: "Court updated successfully.",
                data: {
                    court
                }
            });
        } catch (error) {
            // Check if the error is a Prisma error indicating that the record was not found
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                // Record not found
                res.status(404).json({ msg: "Court not found." });
            } else {
                // Other server errors
                res.status(500).json({ msg: "Server error occurred." });
            }
        }
    },
    deleteCourtById: async (req, res) => {
        const { id } = req.params;
        try {
            const court = await courtModel.deleteCourtById(id);
            if (court) {
                res.status(200).json({
                    msg: "Court deleted successfully.",
                    data: {
                        court
                    }
                });
            } else {
                res.status(404).json({ msg: "Court not found." });
            }
        } catch (error) {
            // Check if the error is a Prisma error indicating that the record was not found
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                // Record not found
                res.status(404).json({ msg: "Court not found." });
            } else {
                // Other server errors
                res.status(500).json({ msg: "Server error occurred." });
            }
        }
    }
}

export default courtController;
