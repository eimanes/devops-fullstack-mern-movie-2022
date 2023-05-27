import userModel from "../../src/models/user.model.js";
import controller from "../../src/controllers/user.controller.js";
import responseHandler from "../../src/handlers/response.handler.js";

jest.mock("../../src/models/user.model.js");

describe("User Controller - signup", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user and return user data", async () => {
    const req = {
      body: {
        username: "testuser",
        password: "testpassword",
        displayName: "Test User",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockedUser = {
      id: "mockUserId",
      displayName: "Test User",
      username: "testuser",
      setPassword: jest.fn(),
      save: jest.fn().mockResolvedValue(mockedUser),
    };

    userModel.findOne.mockResolvedValue(null);
    userModel.mockReturnValue(mockedUser);

    await controller.signup(req, res);

    expect(userModel.findOne).toHaveBeenCalledWith({ username: "testuser" });
    expect(userModel).toHaveBeenCalledWith({
      displayName: "Test User",
      username: "testuser",
    });
    expect(mockedUser.setPassword).toHaveBeenCalledWith("testpassword");
    expect(mockedUser.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: "mockUserId",
      displayName: "Test User",
      username: "testuser",
    });
  });

  // Add similar test cases for other functions in the user controller

});
