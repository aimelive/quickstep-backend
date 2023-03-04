import Notification from "../../database/models/notification";
import { Request, Response } from "express";

//Sending new notification
export async function sendNotification(
  message: string,
  action: string,
  to: string
) {
  try {
    await Notification.create({
      message,
      action,
      to,
    });
  } catch (error: any) {
    console.log(error);
  }
}

//Getting all notifications
export const getNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json({
      message: "Notifications retrieved successfully",
      count: notifications.length,
      notifications,
    });
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

//Delete notification
export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    return res
      .status(200)
      .json({ message: "Notification deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
