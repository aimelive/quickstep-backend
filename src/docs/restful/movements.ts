import responses from "../responses";

export const movement = {
  //Create new movement
  "/movements/create": {
    post: {
      tags: ["Movement"],
      summary: "Create a new movement",
      description: "Start a new movement and invite members to to join you",
      operationId: "createMovement",
      parameters: [
        {
          name: "body",
          in: "body",
          description: "Create a new movement channel",
          required: true,
          schema: {
            $ref: "#/definitions/create-movement",
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
  //Get one movement
  "/movements/:id": {
    get: {
      tags: ["Movement"],
      summary: "Get one movement",
      description: "Get movement informations",
      operationId: "getMovement",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Movement id",
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
  //Getting all movements
  "/movements": {
    get: {
      tags: ["Movement"],
      summary: "All movements",
      description: "Getting all your created/invited movements",
      operationId: "getMovements",
      security: [
        {
          JWT: [],
        },
      ],
      responses,
    },
  },
  //Delete movement
  "/movements/:deleteId": {
    delete: {
      tags: ["Movement"],
      summary: "Delete movement",
      description: "Delete movement you created",
      operationId: "deleteMovement",
      parameters: [
        {
          name: "deleteId",
          in: "path",
          description: "Movement id to be deleted",
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

export const movementDefinitions = {
  "create-movement": {
    type: "object",
    properties: {
      title: {
        type: "string",
        required: true,
      },
      description: {
        type: "string",
        required: true,
      },
      creator: {
        type: "string",
        required: true,
      },
      actors: {
        type: "array",
        items: {
          type: "string",
        },
        required: true,
      },
    },
  },
};
