import { defaultCourtModel as courtModel } from '../models/courtModel.js';
import { Prisma } from '@prisma/client';


const courtController = {
    createCourt: async (req, res) => {
        const { status, stadiumId } = req.body;

        // Validations
        const statuses = ["OPEN", "CLOSED", "MAINTENANCE"];
        if (!statuses.includes(status)) return res.status(400).json({ message: "Invalid status." });

        // Create court
        try {
            const court = await courtModel.createCourt(status, stadiumId);
            res.status(200).json({
                message: "Court created successfully.",
                data: {
                    court
                }
            });
        } catch (error) {
            res.status(500).json({ message: "Server error occurred." });
        }
    },
    getAllCourts: async (req, res) => {
        try {
            const courts = await courtModel.getAllCourts();
            res.status(200).json({
                message: "All courts retrieved successfully.",
                data: {
                    courts
                }
            });
        } catch (error) {
            res.status(500).json({ message: "Server error occurred." });
        }
    },
    getCourtById: async (req, res) => {
        const { id } = req.params;
        try {
            const court = await courtModel.getCourtById(id);
            if (court) {
                res.status(200).json({
                    message: "Court retrieved successfully.",
                    data: {
                        court
                    }
                });
            } else {
                res.status(404).json({ message: "Court not found." });
            }
        } catch (error) {
            res.status(500).json({ message: "Server error occurred." });
        }
    },
    updateCourtById: async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;
    
        // Validations
        const statuses = ["OPEN", "CLOSED", "MAINTENANCE"];
        if (!statuses.includes(status)) return res.status(400).json({ message: "Invalid status." });
    
        try {
            const court = await courtModel.updateCourtById(id, status);
            res.status(200).json({
                message: "Court updated successfully.",
                data: {
                    court
                }
            });
        } catch (error) {
            // Check if the error is a Prisma error indicating that the record was not found
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                // Record not found
                res.status(404).json({ message: "Court not found." });
            } else {
                // Other server errors
                res.status(500).json({ message: "Server error occurred." });
            }
        }
    },
    deleteCourtById: async (req, res) => {
        const { id } = req.params;
        try {
            const court = await courtModel.deleteCourtById(id);
            if (court) {
                res.status(200).json({
                    message: "Court deleted successfully.",
                    data: {
                        court
                    }
                });
            } else {
                res.status(404).json({ message: "Court not found." });
            }
        } catch (error) {
            // Check if the error is a Prisma error indicating that the record was not found
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                // Record not found
                res.status(404).json({ message: "Court not found." });
            } else {
                // Other server errors
                res.status(500).json({ message: "Server error occurred." });
            }
        }
    },
    getCourtsByStadiumId: async (req, res) => {
        try {
            const { id } = req.params;
            const courts = await courtModel.getCourtsByStadiumId(id);
            if (courts.length === 0) {
                return res.status(404).json({ message: "No courts found." });
            }
            res.status(200).json({
                message: "Courts retrieved successfully.",
                data: {
                    courts
                }
            });
        } catch (error) {
            res.status(500).json({ message: "Server error occurred." });
        }
    }
}

export default courtController;
