import responses from "../responses";

export const profile = {
  "/profile": {
    get: {
      tags: ["Profile"],
      summary: "View profile",
      description: "view your profile details",
      operationId: "viewProfile",
      security: [
        {
          JWT: [],
        },
      ],
      responses,
    },
  },
  "/profile/create": {
    post: {
      tags: ["Profile"],
      summary: "Create profile",
      description: "Create your own profile",
      operationId: "createProfile",
      parameters: [
        {
          name: "body",
          in: "body",
          consumes: ["multipart/form-data"],
          description: "Create profile associated with your acccount",
          required: true,
          schema: {
            $ref: "#/definitions/create-profile",
          },
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

export const profileDefinitions = {
  "create-profile": {
    type: "object",
    properties: {
      email: {
        type: "string",
        required: true,
      },
      profilePic: {
        // type: "string",
        format: "binary",
        required: true,
      },
      username: {
        type: "string",
        required: true,
      },
    },
  },
};
