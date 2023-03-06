import responses from "../responses";

export const notification = {
  //Getting all notifications
  "/notifications": {
    get: {
      tags: ["Notification"],
      summary: "All notifications",
      description: "Getting all your created/invited notifications",
      operationId: "getNotifications",
      security: [
        {
          JWT: [],
        },
      ],
      responses,
    },
  },
  //Delete notification
  "/notifications/:id": {
    delete: {
      tags: ["Notification"],
      summary: "Delete notification",
      description: "Delete notification sent to you",
      operationId: "deleteNotification",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Notification id to be deleted",
          require: true,
        },
      ],
      security: [
        {
          JWT: [],
        },
      ],
      responses,
    },
  },
};
